// server.js
import jsonServer from 'json-server';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import { tryParseInt, tryParseIntOrUndefined } from './functions.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const server = jsonServer.create();
const router = jsonServer.router(path.join(__dirname, 'db-test-2.json'));
const middlewares = jsonServer.defaults();

server.use(middlewares);

server.get('/videos', (req, res) => {
  const { fromDate, toDate, lat, lon, radius, tags, status, eventId, page = 1, limit = 10 } = req.query;
  console.log(req.query);
  const db = router.db; // lowdb instance
  let videos = db.get('videos').value();

  if (fromDate && toDate) {
    const from = new Date(fromDate);
    const to = new Date(toDate);
    videos = videos.filter(video => {
      const videoDate = new Date(video.date);
      return videoDate >= from && videoDate <= to;
    });
  }

  if (lat && lon && radius) {
    videos = videos.filter(video => {
      const distance = Math.sqrt(Math.pow(video.coordinates[0] - lat, 2) + Math.pow(video.coordinates[1] - lon, 2));
      return distance <= radius;
    });
  }

  if (tags) {
    const tagsArray = tags.split(',');
    videos = videos.filter(video => tagsArray.every(tag => video.tags.includes(tag)));
  }

  if (status) {
    videos = videos.filter(video => video.status === Number(status));
  }

  if (eventId) {
    videos = videos.filter(video => video.eventId !== null);
  }

  // Pagination
  const start = (page - 1) * limit;
  const end = start + limit;
  videos = videos.slice(start, end);

  res.json(videos);
});

server.get('/events/:id', (req, res) => {
  const db = router.db; // lowdb instance
  const { id } = req.params;

  let event = db.get('events').find({ id: Number(id) }).value();

  if (event) {
    const videos = db.get('videos').filter({ eventId: Number(id) }).value();
    event = { ...event, videos };
    res.json(event);
  } else {
    res.status(404).send('Event not found');
  }
});

server.get('/events', (req, res) => {
  const { fromDate, toDate, lat, lon, radius, /*tags,*/ status, page = 1, limit = 3 } = req.query;
  // console.log(req.query);
  const db = router.db; // lowdb instance
  let events = db.get('events').value();

  if (fromDate && toDate) {
    const from = new Date(fromDate);
    const to = new Date(toDate);
    events = events.filter(event => {
      const eventStartTime = new Date(event.startTime);
      return eventStartTime >= from && eventStartTime <= to;
    });
  }

  if (lat && lon && radius) {
    const parsedRadius = tryParseInt(radius, 0);
    events = events.filter(event => {
      const distance = Math.sqrt(
        Math.pow(event.startLocation.coordinates[0] - lat, 2) +
        Math.pow(event.startLocation.coordinates[1] - lon, 2)
      );
      return distance <= parsedRadius;
    });
  }

  // if (tags) {
  //   const tagsArray = tags.split(',');
  //   events = events.filter(event => tagsArray.every(tag => event.tags.includes(tag)));
  // }

  if (status) {
    events = events.filter(event => event.status === Number(status));
  }

  // Add property count of event videos with status 1
  events = events.map(event => {
    const eventVideos = db.get('videos').filter({ eventId: event.id }).value();
    const eventVideosUnprocessed = db.get('videos').filter({ eventId: event.id, status: 1 }).value();
    const eventWithVideosCount = { ...event, videosUnprocessedCount: eventVideosUnprocessed.length, videosCount: eventVideos.length };
    return eventWithVideosCount;
  });

  const eventsCount = events.length;
  // Pagination
  const pageParsed = tryParseIntOrUndefined(page);
  const limitParsed = tryParseIntOrUndefined(limit);

  // TODO - fix this error handling. Responds with cors error instead  of json error
  if (pageParsed === undefined || limitParsed === undefined) {
    res.status(400).jsonp({
      error: "Invalid pagination values"
    })
    return;
  }

  const start = (pageParsed - 1) * limitParsed;
  const end = start + limitParsed;
  events = events.slice(start, end);

  res.json({ events, eventsCount });
});

server.use(router)
server.listen(3002, () => {
  console.log('JSON Server is running')
})
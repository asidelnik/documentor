// server.js
import jsonServer from 'json-server';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import { tryParseInt, tryParseIntOrUndefined } from './functions.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const server = jsonServer.create();
const router = jsonServer.router(path.join(__dirname, 'db-test.json'));
const middlewares = jsonServer.defaults();

server.use(middlewares);

///////// Videos
server.put('/video-set-status/:id', (req, res) => {
  const db = router.db; // lowdb instance
  const { id } = req.params;
  const { status } = req.query;

  const videoExists = db.get('videos').find({ id }).value() !== undefined;
  // console.log({ id, status, videoExists })

  if (videoExists) {
    db.get('videos').find({ id }).assign({ status: Number(status) }).write();
    res.json({ message: 'Video status updated successfully' });
  } else {
    res.status(404).send('Video not found');
  }
});


server.put('/video-set-event/:id', (req, res) => {
  const db = router.db; // lowdb instance
  const { id } = req.params;
  const { newEventId, oldEventId } = req.query;

  const videoExists = db.get('videos').find({ id }).value() !== undefined;
  const newEventExists = db.get('events').find({ id: newEventId }).value() !== undefined;
  // TODO - if the new video startime is less than other event's videos, set event startTime to that of video & set video first in array
  // Or let the admin user edit the order by himself.

  if (videoExists && newEventExists) {
    // Set Video's eventId
    db.get('videos').find({ id }).assign({ eventId: newEventId }).write();

    // Update newly selected Event with videoId if doesn't exist yet
    db.get('events')
      .find({ id: newEventId })
      .update('videoIds', videoIds => {
        if (!videoIds.includes(id)) {
          return [...videoIds, id];
        }
        return videoIds;
      })
      .write();

    // Remove videoId from old Event if exists
    if (oldEventId !== null) {
      db.get('events')
        .find({ id: oldEventId })
        .update('videoIds', videoIds => videoIds.filter(videoId => videoId !== id))
        .write();
    }

    res.json({ message: 'Video & event updated successfully' });
  } else {
    res.status(404).send('Video or event not found');
  }
});

server.get('/videos', (req, res) => {
  const { fromDate, toDate, lat, lng, radius, statuses, eventId, page = 1, limit = 10 } = req.query;
  console.log(req.query);
  const db = router.db; // lowdb instance
  let videos = db.get('videos').value();

  if (fromDate && toDate) {
    const from = new Date(fromDate);
    const to = new Date(toDate);
    videos = videos.filter(video => {
      const videoDate = new Date(video.startTime);
      return videoDate >= from && videoDate <= to;
    });
  }

  if (lat && lng && radius) {
    const parsedRadius = tryParseInt(radius, 0);
    videos = videos.filter(video => {
      const distance = Math.sqrt(
        Math.pow(video.startLocation.coordinates[0] - lat, 2) +
        Math.pow(video.startLocation.coordinates[1] - lng, 2)
      );
      return distance <= parsedRadius;
    });
  }

  // if (tags) {
  //   const tagsArray = tags.split(',');
  //   videos = videos.filter(video => tagsArray.every(tag => video.tags.includes(tag)));
  // }

  if (!statuses || statuses === '') {
    videos = [];
  } else {
    const statusesArray = statuses.split(',').map(Number);
    videos = videos.filter(video => statusesArray.includes(video.status));
  }

  if (eventId) {
    videos = videos.filter(video => video.eventId !== null);
  }

  const videosCount = videos.length;

  // Pagination
  const start = (page - 1) * limit;
  const end = start + limit;
  videos = videos.slice(start, end);

  res.json({ videos, videosCount });
});





///////// Events
server.get('/events/:id', (req, res) => {
  const db = router.db; // lowdb instance
  const { id } = req.params;

  let event = db.get('events').find({ id }).value();

  if (event) {
    const videos = db.get('videos').filter({ eventId: id }).value();
    event = { ...event, videos };
    res.json(event);
  } else {
    res.status(404).send('Event not found');
  }
});

server.get('/events-autocomplete', (req, res) => {
  const { page = 1, limit = 100 } = req.query;
  // console.log(req.query);
  const db = router.db; // lowdb instance
  let events = db.get('events').filter({ isDisabled: false })
    .sortBy('startTime').reverse()
    .value()
    .map(event => ({ id: event.id, title: event.title }));

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

  res.json(events);
});

// GET Events by filters, sort & pagination (default sort latest)
server.get('/events', (req, res) => {
  const { fromDate, toDate, lat, lng, radius, /*tags,*/ status, page = 1, limit = 3 } = req.query;
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

  if (lat && lng && radius) {
    const parsedRadius = tryParseInt(radius, 0);
    events = events.filter(event => {
      const distance = Math.sqrt(
        Math.pow(event.startLocation.coordinates[0] - lat, 2) +
        Math.pow(event.startLocation.coordinates[1] - lng, 2)
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
server.listen(3004, () => {
  console.log('JSON Server is running')
})
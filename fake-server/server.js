// server.js
import jsonServer from 'json-server';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

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
  const { fromDate, toDate, lat, lon, radius, tags, status, page = 1, limit = 10 } = req.query;
  console.log(req.query);
  const db = router.db; // lowdb instance
  let events = db.get('events').value();

  if (fromDate && toDate) {
    const from = new Date(fromDate);
    const to = new Date(toDate);
    events = events.filter(event => {
      const eventDate = new Date(event.date);
      return eventDate >= from && eventDate <= to;
    });
  }

  if (lat && lon && radius) {
    events = events.filter(event => {
      const distance = Math.sqrt(Math.pow(event.coordinates[0] - lat, 2) + Math.pow(event.coordinates[1] - lon, 2));
      return distance <= radius;
    });
  }

  if (tags) {
    const tagsArray = tags.split(',');
    events = events.filter(event => tagsArray.every(tag => event.tags.includes(tag)));
  }

  if (status) {
    events = events.filter(event => event.status === Number(status));
  }

  // Add property count of event videos with status 1
  events = events.map(event => {
    const videos = db.get('videos').filter({ eventId: event.id, status: 1 }).value();
    const x = { ...event, videosUnprocessedCount: videos.length };
    // console.log(x.videosUnprocessedCount);
    return x;
  });


  // Pagination
  const start = (page - 1) * limit;
  const end = start + limit;
  events = events.slice(start, end);

  res.json(events);
});

server.use(router)
server.listen(3000, () => {
  console.log('JSON Server is running')
})
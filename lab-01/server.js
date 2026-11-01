// Lab 1: Express Server
// Tasks 4, 5, 6: Express rewrite, GET routes (/, /about, /time), 404 fallback, and status code logging.

const express = require('express');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware: Request and Status Code Logging
app.use((req, res, next) => {
  const startTime = Date.now();
  res.on('finish', () => {
    const elapsed = Date.now() - startTime;
    console.log(`[Express Log] ${req.method} ${req.originalUrl} -> Status: ${res.statusCode} (${elapsed}ms)`);
  });
  next();
});

// Route 1: GET / (Welcome text)
app.get('/', (req, res) => {
  res.status(200).type('text/plain').send('Welcome to Lab 1: Node.js and Express Server!');
});

// Route 2: GET /about (JSON with name, section, and course details)
app.get('/about', (req, res) => {
  res.status(200).json({
    name: "Student Name",
    registrationNumber: "23B01A0000",
    section: "Section A",
    course: "Backend Development Fundamentals",
    faculty: "Joel Prashanth D"
  });
});

// Route 3: GET /time (Current date and time using new Date())
app.get('/time', (req, res) => {
  const now = new Date();
  res.status(200).json({
    iso: now.toISOString(),
    date: now.toLocaleDateString(),
    time: now.toLocaleTimeString(),
    timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
    timestamp: now.getTime()
  });
});

// Catch-all: 404 handler for any unknown path
app.use((req, res) => {
  res.status(404).json({
    error: "404 Not Found",
    message: `Cannot ${req.method} ${req.originalUrl}. This endpoint does not exist on this server.`,
    statusCode: 404
  });
});

// Start Express server
app.listen(PORT, () => {
  console.log(`====================================================`);
  console.log(`Express Server running at http://localhost:${PORT}`);
  console.log(`Available Endpoints:`);
  console.log(`  - GET http://localhost:${PORT}/        (Welcome text)`);
  console.log(`  - GET http://localhost:${PORT}/about   (JSON with name & section)`);
  console.log(`  - GET http://localhost:${PORT}/time    (Current date and time)`);
  console.log(`  - GET http://localhost:${PORT}/*       (404 Not Found fallback)`);
  console.log(`====================================================`);
});

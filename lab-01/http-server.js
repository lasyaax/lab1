// Plain HTTP server using Node.js core 'http' module
// Task 3: Write a plain server with http.createServer that replies "Hello" and listens on port 3000.

const http = require('http');

const PORT = 3000;

const server = http.createServer((req, res) => {
  console.log(`[HTTP Server] ${new Date().toISOString()} | ${req.method} ${req.url} -> Status: 200`);
  res.writeHead(200, { 'Content-Type': 'text/plain; charset=utf-8' });
  res.end('Hello');
});

server.listen(PORT, () => {
  console.log(`Plain Node.js HTTP Server is listening on port ${PORT}`);
  console.log(`Visit: http://localhost:${PORT}`);
});

import { createServer } from 'http';

const HOST = process.env.APP_HOST || 'localhost';
const PORT = parseInt(process.env.APP_PORT || '8080');

/**
 * @description Simple `http` server to handel only `GET` request at `/` route.
 */
const server = createServer((req, res) => {
  if (req.method === 'GET' && req.url === '/') {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(
      JSON.stringify({
        success: true,
        message: 'Hello from AWS EC2 instance.',
      })
    );
  } else {
    res.writeHead(405, { 'Content-Type': 'application/json' });
    res.end(
      JSON.stringify({
        success: false,
        message: 'Method not allowed.',
      })
    );
  }
});

server.listen(PORT, HOST, () => {
  console.log(`Server is running at port "${PORT}".`);
});


import http from 'http';


const { readFile } = await import('fs/promises');

const server = http.createServer(async (req, res) => {
 try {
  if (req.url === '/' || req.url === '/index') {
  
   const data = await readFile('./index7.html', 'utf8');
   res.writeHead(200, { 'Content-Type': 'text/html' });
   res.end(data);
  } else if (req.url === '/about') {
  
   const { getAboutInfo } = await import('./modules/about7.js');
   res.writeHead(200, { 'Content-Type': 'application/json' });
   res.end(JSON.stringify({ message: getAboutInfo() }));
  } else {
   res.writeHead(404, { 'Content-Type': 'text/plain' });
   res.end('404 Not Found');
  }
 } catch (err) {
  res.writeHead(500, { 'Content-Type': 'text/plain' });
  res.end('Server Error: ' + err.message);
 }
});

server.listen(3000, () => {
 console.log('Server running at http://localhost:3000');
});

=> index7.html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Dynamic Import Server</title>
</head>
<body>
 <h1>Hello from Top-Level Await + Dynamic Import!</h1>
</body>
</html>

=>package.json
"scripts": {
  "start": "node code5.js",
  "dev": "nodemon code5.js"
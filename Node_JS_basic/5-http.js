const http = require('node:http');
const countStudents = require('./3-read_file_async');

const hostname = '127.0.0.1';
const port = 1245;

const app = http.createServer(async (req, res) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');
  if (req.url === '/') {
    res.end('Hello Holberton School!');
  } else if (req.url === '/students') {
    try {
      let consoleOutput = '';
      const originalConsoleLog = console.log;
      console.log = (message) => {
        consoleOutput += `${message}\n`;
      };
      await countStudents(process.argv[2]);
      console.log = originalConsoleLog;

      res.end(`This is the list of our students\n${consoleOutput.trim()}`);
    } catch (error) {
      res.statusCode = 400;
      res.end(`This is the list of our students\n${error.message}`);
    }
  } else {
    res.statusCode = 404;
    res.end();
  }
});

app.listen(port, hostname);

module.exports = app;

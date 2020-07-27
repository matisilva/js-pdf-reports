/*const http = require('http');

const hostname = '127.0.0.1';
const port = 3000;

const server = http.createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');
  res.end('Hello World');
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
*/

const http = require('http');
const jsreport = require('jsreport');

http.createServer((req, res) => {
  jsreport.render({
    template: {
      content: '<h1>Hello world</h1>',
      engine: 'handlebars',
      recipe: 'chrone-pdf'
    }
  }).then((out)  => {
    out.stream.pipe(res);
  }).catch((e) => {
    res.end(e.message);
  });

}).listen(1337, '127.0.0.1');

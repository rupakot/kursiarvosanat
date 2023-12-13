const http = require('http');
const fs = require('fs');

const server = http.createServer((req, res) => {
  fs.readFile('tervehdys.html', 'utf8', (err, template) => {
    if (err) {
      res.writeHead(500, { 'Content-Type': 'text/plain' });
      res.end('Internal Server Error');
      return;
    }

    const daysOfWeek = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];
    const today = new Date().getDay();
    const currentDay = daysOfWeek[today];

    const modifiedTemplate = template.replace('##viikonpaiva##', currentDay);

    res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
    res.end(modifiedTemplate);
  });
});

const PORT = 3000;
server.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}/`);
});

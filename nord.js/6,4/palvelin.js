const http = require('http');

const htmlAlku = `
  <!DOCTYPE html>
  <html lang="fi">
  <head>
    <meta charset="UTF-8">
    <title>Esimerkkisivu</title>
  </head>
  <body>
`;

const htmlLoppu = `
  </body>
  </html>
`;

const palvelin = http.createServer(function (req, res) {
  // selvitetään, mitä sivua pyydetään
  const kokoUrl = new URL(`http://${req.hostname}${req.url}`);
  // dekoodataan, jotta mahdolliset ääkköset tulevat "oikein"
  const reitti = decodeURIComponent(kokoUrl.pathname);

  if (reitti == '/') {
    // jos osoiteriville kirjoitettiin localhost:3000
    res.writeHead(200, {
      'Content-Type': 'text/html;charset=utf-8',
    });
    res.end(
      htmlAlku +
        '<p>Tervetuloa Node.js-palvelimelle. <a href="/javascript">JavaScript</a> <a href="/nodejs">Node.js</a> <a href="/express">Express</a></p>' +
        htmlLoppu
    );
  } else if (reitti == '/javascript') {
    // jos osoiteriville kirjoitettiin localhost:3000/javascript
    res.writeHead(200, {
      'Content-Type': 'text/html;charset=utf-8',
    });
    res.end(
      htmlAlku +
        '<p>JavaScript is a programming language commonly used in web development.</p>' +
        htmlLoppu 
    );
  } else if (reitti == '/nodejs') {
    // jos osoiteriville kirjoitettiin localhost:3000/nodejs
    res.writeHead(200, {
      'Content-Type': 'text/html;charset=utf-8',
    });
    res.end(
      htmlAlku +
        '<p>Node.js is a JavaScript runtime built on Chrome\'s V8 JavaScript engine.</p>' +
        htmlLoppu
    );
  } else if (reitti == '/express') {
    // jos osoiteriville kirjoitettiin localhost:3000/express
    res.writeHead(200, {
      'Content-Type': 'text/html;charset=utf-8',
    });
    res.end(
      htmlAlku +
        '<p>Express is a minimal and flexible Node.js web application framework.</p>' +
        htmlLoppu
    );
  } else {
    res.writeHead(404, {
      'Content-Type': 'text/html;charset=utf-8',
    });
    res.end(htmlAlku + 'Sivua ei löytynyt' + htmlLoppu);
  }
});

palvelin.listen(3000, 'localhost');

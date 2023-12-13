const fs = require('fs');
const path = require('path');
const http = require('http');

const server = http.createServer(async (req, res) => {
    const fullUrl = new URL(`http://${req.headers.host}${req.url}`);
    const route = decodeURIComponent(fullUrl.pathname).slice(1);

    try {
        const fileData = await fs.promises.readFile(path.join(process.cwd(), 'ruokalista.json'), 'utf8');
        const fileJSON = JSON.parse(fileData);

        let data = {};

        fileJSON.forEach(entry => {
            if (entry.paiva === route) data = entry;
        });

        if (Object.keys(data).length < 1) {
            res.writeHead(404);
            return res.end();
        }

        res.writeHead(200, {
            'Content-Type': 'application/json',
        });

        const jsonString = JSON.stringify(data);

        res.write(jsonString);

        res.end();
    } catch (error) {
        console.error('Error:', error.message);
        res.writeHead(500);
        res.end();
    }
});

server.listen(3000, 'localhost', () => {
    console.log('Listening on port 3000');
});

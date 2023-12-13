const fs = require('fs');
const path = require('path');
const http = require('http');

const server = http.createServer((req,res)=>{
    const {
        pathname,
        searchParams
    } = new URL(`http://localhost:3000/${req.url}`);

    const fileData = fs.readFileSync(path.join(process.cwd(), "ruokalista.json"), 'utf8');
    const fileJSON = JSON.parse(fileData);

    let info = {};

    if (!searchParams.has("paiva")) {
        res.writeHead(404);
        res.end();
        
        return;
    }

    fileJSON.forEach(entry => {
        if (entry.paiva === searchParams.get("paiva")) info = entry;
    });

    if (Object.keys(info).length < 1) {
        res.writeHead(404)
        return res.end();
    }

    res.writeHead(200, {
        'Content-Type': 'application/json',
    });
    
    const jsonString = JSON.stringify(info);

    res.write(jsonString);

    
    res.end();  

});

server.listen(3000, "localhost", () => {
    console.log("Listening the port on 3000");
});

fetch("http://localhost:3000/?paiva=tiistai").then(async (response) => {
    if (response.status === 404) return console.log(" thing not found");

    const resJSON = await response.json();
    console.log(resJSON);
});
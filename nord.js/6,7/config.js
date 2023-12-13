const fs = require('fs');
const path = require('path');
const http = require('http');

const server = http.createServer((req,res)=>{
    const {
        pathname,
        searchParams
    } = new URL(`http://localhost:3000/${req.url}`);

    if (searchParams.has("kuva")) {
        const pathName = pathname.slice(2);

        if (pathName !== "mallipohja1" && pathName !== "mallipohja2") {
            res.writeHead(404);
            res.end();
    
            return;
        }
    
        let file = fs.readFileSync(path.join(process.cwd(), `${pathName}.html`), "utf-8");
        file = file.replace("##kuva##", searchParams.get("kuva"));
    
        res.writeHead(200, {'Content-Type':'text/html'});
    
        res.write(file);
    
        res.end();
    }

    if (req.url === "/tyyli.css") {
        res.writeHead(200, { 'Content-Type': 'text/css' });

        const cssFilePath = path.join(process.cwd(), 'tyyli.css');
        const cssContent = fs.readFileSync(cssFilePath, 'utf-8');

        res.write(cssContent);
        res.end();
    }
});

server.listen(3000, "localhost", () => {
    console.log("Listening on port 3000");
});
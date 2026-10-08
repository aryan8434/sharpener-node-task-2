const fs = require('fs');

const requestHandler = (req, res) => {
    const url = req.url;
    const method = req.method;

    if (url === '/') {
        res.setHeader('Content-Type', 'text/html');
        res.write('<html>');
        res.write('<head><title>Enter Message</title></head>');
        res.write('<body><form action="/message" method="POST"><input type="text" name="message"><button type="submit">Send</button></form></body>');
        res.write('</html>');
        return res.end();
    }

    if (url === '/message' && method === 'POST') {
        const body = [];
        req.on('data', (chunk) => {
            body.push(chunk);
        });

        return req.on('end', () => {
            const parsedBody = Buffer.concat(body).toString();
            const message = parsedBody.split('=')[1];
            fs.writeFile('message.txt', message, (err) => {
                res.statusCode = 302;
                res.setHeader('Location', '/');
                return res.end();
            });
        });
    }

    if (url === '/home') {
        res.setHeader('Content-Type', 'text/html');
        res.write('<html><body><h1>Welcome Home</h1></body></html>');
        return res.end();
    }

    if (url === '/about') {
        res.setHeader('Content-Type', 'text/html');
        res.write('<html><body><h1>About Us</h1></body></html>');
        return res.end();
    }

    res.statusCode = 404;
    res.setHeader('Content-Type', 'text/html');
    res.write('<html><body><h1>Page Not Found</h1></body></html>');
    res.end();
};

module.exports = {
    handler: requestHandler,
    someText: 'Some hard coded text'
};

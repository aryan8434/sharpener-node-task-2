const fs = require('fs');

const requestHandler = (req, res) => {
    const url = req.url;
    const method = req.method;

    if (url === '/') {
        fs.readFile('message.txt', 'utf8', (err, data) => {
            const existingMessages = err || !data ? '' : data;

            res.setHeader('Content-Type', 'text/html');
            res.write('<html>');
            res.write('<head><title>Enter Message</title></head>');
            res.write('<body>');

            if (existingMessages) {
                res.write(`<div>${existingMessages}</div>`);
            }

            res.write(`
                <form action="/message" method="POST">
                    <input type="text" name="message" />
                    <button type="submit">Send</button>
                </form>
            `);

            res.write('</body>');
            res.write('</html>');
            return res.end();
        });
        return;
    }

    if (url === '/message' && method === 'POST') {
        const body = [];

        req.on('data', (chunk) => {
            body.push(chunk);
        });

        return req.on('end', () => {
            const parsedBody = Buffer.concat(body).toString();
            const rawMessage = parsedBody.split('=')[1] || '';
            const formattedMessage = decodeURIComponent(rawMessage.replace(/\+/g, ' '));

            fs.writeFile('message.txt', formattedMessage, (err) => {
                res.statusCode = 302;
                res.setHeader('Location', '/');
                return res.end();
            });
        });
    }

    res.statusCode = 404;
    res.setHeader('Content-Type', 'text/html');
    res.end('<h1>Page Not Found</h1>');
};

module.exports = requestHandler;
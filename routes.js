const fs = require('fs');
const path = require('path');

const MESSAGE_FILE = path.join(__dirname, 'message.txt');

const requestHandler = (req, res) => {
    const { url, method } = req;

    if (url === '/') {
        let existingMessage = '';
        if (fs.existsSync(MESSAGE_FILE)) {
            try {
                existingMessage = fs.readFileSync(MESSAGE_FILE, 'utf8');
            } catch (err) {
                console.error('Error reading message file:', err);
            }
        }

        res.setHeader('Content-Type', 'text/html');
        return res.end(`
            <!DOCTYPE html>
            <html lang="en">
            <head>
                <meta charset="UTF-8">
                <title>Enter Message</title>
                <style>
                    body { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif; max-width: 600px; margin: 40px auto; padding: 20px; line-height: 1.5; color: #333; }
                    .card { background: #f0f4f8; padding: 16px; border-radius: 8px; margin-bottom: 24px; border-left: 4px solid #0066cc; }
                    input[type="text"] { width: 70%; padding: 10px; border: 1px solid #ccc; border-radius: 6px; font-size: 14px; }
                    button { padding: 10px 20px; background: #0066cc; color: #fff; border: none; border-radius: 6px; font-weight: 600; cursor: pointer; }
                    button:hover { background: #0052a3; }
                </style>
            </head>
            <body>
                <h2>Sharpener Node.js Message Board</h2>
                ${existingMessage ? `<div class="card"><strong>Latest Message:</strong> ${existingMessage}</div>` : ''}
                <form action="/message" method="POST">
                    <input type="text" name="message" placeholder="Type a message..." required />
                    <button type="submit">Send</button>
                </form>
            </body>
            </html>
        `);
    }

    if (url === '/message' && method === 'POST') {
        const bodyChunks = [];

        req.on('data', (chunk) => {
            bodyChunks.push(chunk);
        });

        return req.on('end', () => {
            const parsedBody = Buffer.concat(bodyChunks).toString();
            const messageValue = parsedBody.split('=')[1] || '';

            fs.writeFile(MESSAGE_FILE, messageValue, (err) => {
                if (err) {
                    console.error('Failed to write message:', err);
                    res.statusCode = 500;
                    return res.end('Internal Server Error');
                }
                res.statusCode = 302;
                res.setHeader('Location', '/');
                return res.end();
            });
        });
    }

    res.statusCode = 404;
    res.setHeader('Content-Type', 'text/html');
    res.end('<h1>404 - Page Not Found</h1>');
};

module.exports = {
    handler: requestHandler,
    someText: 'Modular Routing in Node.js'
};

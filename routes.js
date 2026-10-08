const fs = require('fs');

const requestHandler = (req, res) => {
    const url = req.url;
    const method = req.method;

    if (url === '/') {
        // Read existing messages from the file
        fs.readFile('message.txt', 'utf8', (err, data) => {
            const existingMessages = err || !data ? '' : data;

            res.setHeader('Content-Type', 'text/html');
            res.write('<html>');
            res.write('<head><title>Message App</title></head>');
            res.write('<body>');
            
            if (existingMessages) {
                res.write(`<div><strong>Latest Message:</strong> ${existingMessages}</div><br>`);
            }

            res.write(`
                <form action="/message" method="POST">
                    <input type="text" name="message" placeholder="Type a message..." required />
                    <button type="submit">Send</button>
                </form>
                <br>
                <nav>
                    <a href="/home">Home</a> | 
                    <a href="/about">About</a>
                </nav>
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

    if (url === '/home') {
        res.setHeader('Content-Type', 'text/html');
        res.write('<html>');
        res.write('<head><title>Home</title></head>');
        res.write('<body>');
        res.write('<h1>Welcome to the Home Page!</h1>');
        res.write('<p>This is a custom route added to demonstrate Node.js routing.</p>');
        res.write('<a href="/">Go to Form</a> | <a href="/about">About Us</a>');
        res.write('</body>');
        res.write('</html>');
        return res.end();
    }

    if (url === '/about') {
        res.setHeader('Content-Type', 'text/html');
        res.write('<html>');
        res.write('<head><title>About</title></head>');
        res.write('<body>');
        res.write('<h1>About Us</h1>');
        res.write('<p>Welcome to our Node.js server built for Sharpener Task 2.</p>');
        res.write('<a href="/">Go to Form</a> | <a href="/home">Home</a>');
        res.write('</body>');
        res.write('</html>');
        return res.end();
    }

    // Fallback 404
    res.statusCode = 404;
    res.setHeader('Content-Type', 'text/html');
    res.write('<html>');
    res.write('<head><title>Page Not Found</title></head>');
    res.write('<body><h1>404 - Page Not Found</h1><p><a href="/">Return to Home</a></p></body>');
    res.write('</html>');
    res.end();
};

// ==========================================
// 3 WAYS TO EXPORT IN NODE.JS:
// ==========================================

// --- WAY 1: Single function export ---
// module.exports = requestHandler;

// --- WAY 2: Export an object with multiple properties ---
module.exports = {
    handler: requestHandler,
    someText: 'Exported from routes.js using Way 2 (Object export)'
};

// --- WAY 3: Export individual properties via module.exports or shortcut exports ---
// module.exports.handler = requestHandler;
// module.exports.someText = 'Exported from routes.js using Way 3';
// OR:
// exports.handler = requestHandler;
// exports.someText = 'Exported from routes.js using exports shortcut';

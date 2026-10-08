const http = require('http');
const routes = require('./routes');

// Support both direct function export (Way 1) and object exports (Way 2 & 3)
const handler = typeof routes === 'function' ? routes : routes.handler;

if (routes.someText) {
    console.log(routes.someText);
}

const server = http.createServer(handler);

const PORT = 3000;
server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
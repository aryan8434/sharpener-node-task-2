const requestHandler = (req, res) => {
    res.setHeader('Content-Type', 'text/html');
    res.statusCode = 200;
    res.end('<h1>Welcome to Sharpener Node.js Task 2</h1>');
};

module.exports = {
    handler: requestHandler,
    someText: 'Modular Routing in Node.js'
};

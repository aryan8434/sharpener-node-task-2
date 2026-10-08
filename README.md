# Sharpener Node.js - Task 2: Modular Routing & Module Exports

## Overview
This project demonstrates modular code organization in Node.js by separating request routing logic from server initialization. It also demonstrates all three ways of exporting and importing modules in Node.js.

---

## Project Structure
```
├── index.js       # Server creation and entry point
├── routes.js      # Request routing logic & exports
├── message.txt    # Stored message data from POST requests
└── README.md      # Documentation
```

---

## Routes Implemented
- `GET /` : Renders the message form and displays any previously stored message.
- `POST /message` : Collects incoming request chunks, parses the data, writes it to `message.txt`, and redirects (HTTP 302) back to `/`.
- `GET /home` : Displays a custom Welcome / Home page.
- `GET /about` : Displays an About Us page.
- `Fallback / 404` : Returns a 404 Page Not Found for any unregistered route.

---

## 3 Ways of Exporting in Node.js

### 1. Direct Function Export
Export a single request handler function directly:
```javascript
// routes.js
module.exports = requestHandler;

// index.js
const routes = require('./routes');
const server = http.createServer(routes);
```

### 2. Exporting an Object with Multiple Properties
Export an object containing handlers, constants, or helper functions:
```javascript
// routes.js
module.exports = {
    handler: requestHandler,
    someText: 'Some hard-coded text'
};

// index.js
const routes = require('./routes');
const server = http.createServer(routes.handler);
console.log(routes.someText);
```

### 3. Property Assignment (or `exports` shortcut)
Attach properties directly to `module.exports` or using the `exports` shorthand:
```javascript
// routes.js
module.exports.handler = requestHandler;
module.exports.someText = 'Some hard-coded text';
// OR:
exports.handler = requestHandler;
exports.someText = 'Some hard-coded text';

// index.js
const routes = require('./routes');
const server = http.createServer(routes.handler);
console.log(routes.someText);
```

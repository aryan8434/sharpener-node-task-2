# Sharpener Node.js - Task 2: Modular Routing and Module Exports

A complete Node.js project demonstrating HTTP server architecture, custom request routing, stream-based POST data parsing, file persistence, and the **3 ways of exporting modules in Node.js**.

---

## 🚀 Features

- **Core HTTP Server**: Built using Node.js native `http` module.
- **Modular Routing**: Clean separation of concerns between server lifecycle (`index.js`) and route handling (`routes.js`).
- **Stream Processing**: Asynchronous stream chunk buffering and UTF-8 body decoding for `POST` requests.
- **Persistent Message Storage**: Reads and writes messages to `message.txt`.
- **Clean HTML UI**: Form for submitting messages and displaying the latest stored text.
- **Unit and Route Testing**: Built-in test script (`test.js`) without external dependencies.
- **Task MCQ Reference**: Complete Sharpener Task 2 quiz questions and verified answers in `mcq-answers.md`.

---

## 📦 Project Structure

```
.
├── index.js          # HTTP server creation and port listener
├── routes.js         # Modular routing and request handling logic
├── message.txt       # Local file storage for posted messages
├── test.js           # Automated test suite
├── mcq-answers.md    # Sharpener Task 2 MCQ questions and answers
├── package.json      # NPM scripts and project metadata
└── .gitignore        # Git ignore rules for node_modules and logs
```

---

## 💡 The 3 Ways of Exporting Modules in Node.js

Node.js allows different patterns for exporting functions, objects, and values across files:

### 1. Single Function / Object Export
Exports the handler directly as the whole module.
```javascript
module.exports = requestHandler;
```
*Importing:*
```javascript
const routes = require('./routes');
const server = http.createServer(routes);
```

### 2. Object with Multiple Properties
Exports an object bundle containing multiple functions or values.
```javascript
module.exports = {
    handler: requestHandler,
    someText: 'Some hard coded text'
};
```
*Importing:*
```javascript
const routes = require('./routes');
const server = http.createServer(routes.handler);
```

### 3. Property-by-Property Assignment
Directly assigns properties to `module.exports` or the shorthand `exports`.
```javascript
module.exports.handler = requestHandler;
module.exports.someText = 'Some hard coded text';

// Or shorthand:
exports.handler = requestHandler;
exports.someText = 'Some hard coded text';
```

---

## 🛠️ Getting Started

### 1. Run the Server
```bash
npm start
```
Open your browser at [http://localhost:3000](http://localhost:3000).

### 2. Run with Auto-Reload (Development)
```bash
npm run dev
```

### 3. Run Automated Tests
```bash
npm test
```

---

## 📝 License
ISC

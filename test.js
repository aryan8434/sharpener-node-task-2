const assert = require('assert');
const routes = require('./routes');

console.log('Running Sharpener Node Task 2 unit and routing tests...\n');

// Test 1: Verify module exports structure
assert.strictEqual(typeof routes.handler, 'function', 'routes.handler should be a function');
assert.strictEqual(typeof routes.someText, 'string', 'routes.someText should be a string');
assert.strictEqual(typeof routes.parseMessageBody, 'function', 'routes.parseMessageBody should be a function');
console.log('✔ Test 1: Module export structure verified');

// Test 2: Verify body parser URL decoding and sanitization
const sampleBody = 'message=Hello+World%21';
const parsed = routes.parseMessageBody(sampleBody);
assert.strictEqual(parsed, 'Hello World!', 'Should properly decode URL encoded message');
console.log('✔ Test 2: Form body decoding verified');

// Test 3: Verify simulated HTTP request handling for 404 route
const mockReq = { url: '/unknown-route', method: 'GET' };
let mockStatusCode = null;
let mockHeaders = {};
let mockResponseContent = '';

const mockRes = {
    setHeader(key, value) {
        mockHeaders[key] = value;
    },
    set statusCode(val) {
        mockStatusCode = val;
    },
    get statusCode() {
        return mockStatusCode;
    },
    end(content) {
        mockResponseContent = content;
    }
};

routes.handler(mockReq, mockRes);
assert.strictEqual(mockStatusCode, 404, 'Unknown routes should return 404');
assert.strictEqual(mockHeaders['Content-Type'], 'text/html', 'Content-Type should be text/html');
console.log('✔ Test 3: 404 Not Found handling verified');

console.log('\nAll tests passed successfully!');

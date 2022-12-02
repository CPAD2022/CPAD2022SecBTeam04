const http = require('http');
const endpoint = require('./app'); 
const port = process.env.PORT || 3000;
const server = http.createServer(endpoint);
server.listen(port);
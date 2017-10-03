// warmUp.js

const net = require('net');
const PORT = 8080;
const HOST = '127.0.0.1';


const server = net.createServer((sock) => {
  console.log('client connected:', sock.remoteAddress, sock.remotePort);
  //sock.on('data', applyingData.bind(null, sock));
  sock.on('data', (receivedData) => { applyingData(sock, receivedData); });
});


function applyingData(sock, receivedData) {
  console.log("server is handling call");
  sock.write(`HTTP/1.1 200 OK\r\nContent-Type: text/html\r\n\r\n<em>hello</em> <strong>world</strong>`);
  sock.end();
}

server.listen(PORT, HOST);
console.log("server is listening");

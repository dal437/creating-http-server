//evenWarmer.js

const net = require('net');


class Request {
  constructor(httpRequest){
    this.httpRequest = httpRequest;
    const news = httpRequest.split('\r\n');
    this.method = news[0].split(" ")[0];
    this.path = news[0].split(" ")[1];

    const headers = {};
    const hostIndex = 1;

    let refererIndex = 2;
    if (news[2] === '') {
       refererIndex = -1;
    }

    let bodyIndex = 4;
    if (refererIndex === -1) {
       bodyIndex = 3;
    }

    const x = news[hostIndex].split(" ")[0];
    const newx = x.substring(0, x.length - 1);
    const y = news[hostIndex].split(" ")[1];
    headers[newx] = y;

    if (refererIndex > 0) {
      const a = news[refererIndex].split(' ')[0];
      const newa = a.substring(0, a.length - 1);
      const b = news[refererIndex].split(' ')[1];

      headers[newa] = b;
    }
    this.headers = headers;
    this.body = news[bodyIndex];
  }

  toString(){
    let httpRequest = this.httpRequest;
    return httpRequest;
  }
}


const PORT = 8080;
const HOST = '127.0.0.1';


const server = net.createServer((sock) => {
  console.log('client connected:', sock.remoteAddress, sock.remotePort);
  sock.on('data', (receivedData) => { applyingData(sock, receivedData); });
});


function applyingData(sock, receivedData) {
  console.log("server is handling call");
  sock.write(`HTTP/1.1 200 OK\r\nContent-Type: text/html\r\n\r\n<em>hello</em> <strong>world</strong>`);
  sock.end();
}

server.listen(PORT, HOST);
console.log("server is listening");

module.exports = {Request};

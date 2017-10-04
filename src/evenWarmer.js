//evenWarmer.js

const net = require('net');


class Request {
  constructor(httpRequest){
    const news = httpRequest.split('\r\n');
    this.method = news[0].split(" ")[0];
    this.path = news[0].split(" ")[1];

    const x = news[1].split(" ")[0];
    const y = news[1].split(" ")[1];
    const a = news[2].split(" ")[0];
    const b = news[2].split(" ")[1];

    this.headers = {};

    /*const Obj = {};
    const i = 0;

    const repeat = function (i) {
      if (i < news.length) {
        if (newx[s].includes("=")){
          const newarr = newx[i].split("=");
          Obj[newarr[0]] = newarr[1].trim();
        }
        repeat(i+1);
      }
    };*/

    console.log(this.method);
    console.log(this.path);
    console.log(x);
    console.log(y);
    console.log(a);
    console.log(b);
    console.log(this.headers);
  }
}


const PORT = 8080;
const HOST = '127.0.0.1';


const server = net.createServer((sock) => {
  console.log('client connected:', sock.remoteAddress, sock.remotePort);
  //sock.on('data', applyingData.bind(null, sock));
  sock.on('data', (receivedData) => { applyingData(sock, receivedData); });
});


function applyingData(sock, receivedData) {
  const req = new Request(s);
  console.log("server is handling call");
  sock.write(`HTTP/1.1 200 OK\r\nContent-Type: text/html\r\n\r\n<em>hello</em> <strong>world</strong>`);
  sock.end();
}

server.listen(PORT, HOST);
console.log("server is listening");

module.exports = {Request};

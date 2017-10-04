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

class Response {
  constructor(socket){
    this.sock = socket;
    this.headers = {};
    this.body = '';
    this.statusCode = 0
  }

  setHeader(name, value) {
    this.headers[name] = value;
  }

  write(data) {
    this.sock.write(data);
  }

  end(s) {
    this.sock.end(s);
  }

  /*send(statusCode, body){

  }

  writeHead(statusCode){

  }

  redirect(statusCode, url){

  }

  toString(){

  }

  sendFile(fileName){

  }*/
}

module.exports = {Request, Response};

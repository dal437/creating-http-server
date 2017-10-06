//evenWarmer.js

const net = require('net');
const fs = require('fs');
const path = require('path');

function createResponse(status, body) {
  return `HTTP/1.1 ${status} OK
  Content-Type: text/html
  ${body}`;
}

class Request {
  constructor(httpRequest){
    this.httpRequest = httpRequest;
    this.headers = {};
    if (!httpRequest){
      return;
    }
    const news = httpRequest.toString().split('\r\n');
    this.method = news[0].split(" ")[0];
    this.path = news[0].split(" ")[1];


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
    this.headers[newx] = y;

    if (refererIndex > 0) {
      const a = news[refererIndex].split(' ')[0];
      const newa = a.substring(0, a.length - 1);
      const b = news[refererIndex].split(' ')[1];

      this.headers[newa] = b;
    }
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
    this.body = socket.body;
    this.statusCode = socket.statusCode;
  }

  setHeader(name, value) {
    this.headers[name] = value;
  }

  write(data) {
    this.sock.write(data);
  }

  end(s) {
    console.log(this.sock);
    console.log('this', this);
    this.sock.end(s);
  }

  send(statusCode, body){
    this.body = body;
    this.statusCode = statusCode;
    this.sock.end(this.toString());
  }

  writeHead(statusCode){
    this.statusCode = statusCode;
    this.sock.write(statusCode.toString());
  }

  redirect(statusCode, url){
    if(typeof statusCode === "number"){
      this.statusCode = statusCode;
      this.setHeader('Location', url);
    }
    else {
      this.statusCode = "301";
      this.headers['Location'] = url;
    }
    this.end(createResponse(this.statusCode, this.body));
  }

  toString(){
    const validobj = {
      "200": "OK",
      "404": "Not Found",
      "500": "Internal Server Error",
      "400": "Bad Request",
      "301": "Moved Permanently",
      "302": "Found",
      "303": "See Other",
    }

    let availableStr = '';

    availableStr = availableStr + "HTTP/1.1" + ' ' + this.statusCode + ' ' + validobj[this.statusCode] + '\r\n';

    for (let x in this.headers){
      availableStr = availableStr + x + ": " + this.headers[x] + '\r\n';
    }

    availableStr = availableStr + '\r\n';

    if (this.body !== undefined){
      availableStr = availableStr + this.body.toString();
    }

    return availableStr;
  }

  sendFile(fileName){

    const objects = {
      jpeg: 'image/jpeg',
      jpg: 'image/jpeg',
      png: 'image/png',
      gif: 'image/gif',
      html: 'text/html',
      css: 'text/css',
      txt: 'text/plain',
    };

    const readOptions = {};
    const p = path.join(__dirname, 'public', fileName);

    const [file, extension] = fileName.split('.');
    if (extension === "txt" || extension === "html" || extension === "css"){
      readOptions.encoding = "utf8";
    }

    fs.readFile(fileName, readOptions, (err, data) => {
      if (err){
        this.writeHead(500);
        return this.end();
      }

      this.setHeader({
        'Content-Type': objects[extension],
      });
      return this.send(200, data);
    });
  }
}


module.exports = {Request, Response};

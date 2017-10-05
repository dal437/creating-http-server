// miniWeb.js
// define your Request, Response and App objects here
const BringBackReq = require('./evenWarmer').Request;
const BringBackRes = require('./evenWarmer').Response;

const net = require('net');

class App {
  constructor(){
    this.server = net.createServer(this.handleConnection.bind(this));
    this.routes = {}
  }
  get(path, cb){
    this.routes[path] = cb;
  }
  handleConnection(sock){
    sock.on('data', this.handleRequestData.bind(this, sock));
    sock.on('close', this.logResponse.bind(this));
  }
  handleRequestData(sock, binaryData){
    console.log(binaryData);
    const request = new BringBackReq(binaryData);
    const response = new BringBackRes(sock);
    if (!request.headers['Host']){
      response.writeHead(400);
      return response.end();
      //skipped #4 - easy one
    }
    if (!this.routes[request.path]){
      //Look at #6, make sure to take into account extra slash; another if statement
      response.writeHead(404);
      return response.end();
    }
    return this.routes[request.path](request, response);
  }
  logResponse(req, res){

  }
  listen(port, host){
    this.server.listen(port, host);
  }
}


const app = new App();
app.get("/giwah", (req, res) => {
  res.send(200, "Hi :)")
});
app.listen(80, '127.0.0.1');

// fansite.js
// create your own fansite using your miniWeb framework
const App = require('./miniWeb.js').App;
const app = new App();

const net = require('net');
const PORT = 8080;
const HOST = '127.0.0.1';

app.get("/", (req, res) => {
  res.setHeader('Content-Type', 'text/html');
  res.send(200, '<h1 style="background-color:DodgerBlue;">Welcome to the Homepage</h1>');
});
app.get("/about", (req, res) => {
  res.send(200, "YOU'RE ALMOST THERE");
});
app.get("/css/base.css", (req, res) => {
  res.send(200, "Hey");
});
app.get("/rando", (req, res) => {
  res.send(200, "Random image");
});
app.get("/image1.jpg", (req, res) => {
  res.send(200, "Image1");
});
app.get("/image2.png", (req, res) => {
  res.send(200, "Image2");
});
app.get("/image3.gif", (req, res) => {
  res.send(200, 'univisionnoticias-peru-copa-america.gif');
});
app.get("/home", (req, res) => {
  res.redirect(301, "/");
});
app.listen(PORT, HOST);

// fansite.js
// create your own fansite using your miniWeb framework
const App = require('./miniWeb.js').App;
const app = new App();

const net = require('net');
const PORT = 8080;
const HOST = '127.0.0.1';

app.get("/", (req, res) => {
  res.setHeader('Content-Type', 'text/html');
  res.send(200, '<h1 style="background-color:yellow;">  <center>Welcome to the Homepage of Speedy Gonzales<center>  </h1> <b> <center><p style="font-size: 300%;">HOME<center> <b> <b> <center><p style="font-size: 300%;">ABOUT<center> <b>  <b> <center><p style="font-size: 300%;">RANDO<center> <b><!DOCTYPE html><html><head><title>Page Title</title><style>body {background-image: url("https://vignette.wikia.nocookie.net/looneytunes/images/4/47/Speedy_Gonzales.jpg/revision/latest?cb=20060220031648");} </style></head><body></body></html>' );
});
app.get("/about", (req, res) => {
  res.setHeader('Content-Type', 'text/html');
  res.send(200, '<h1 style="background-color:red;">  <center>About Speedy Gonzales<center>  </h1> <!DOCTYPE html><html><body><h2><center>Speedy Gonzales speaks Spanish. Any Questions?<center></h2><center><img src="https://vignette.wikia.nocookie.net/wikiality/images/f/fe/Speedy-gonzales.jpg/revision/latest?cb=20080402105411" style="width:304px;height:228px;"><center></body>');
});
app.get("/css/base.css", (req, res) => {
  res.send(200, "Hey");
});
app.get("/rando", (req, res) => {
  res.send(200, "Random");
});
app.get("/image1.jpg", (req, res) => {
  res.setHeader('Content-Type', 'text/html');
  res.send(200, '<!DOCTYPE html><html><head><title>Page Title</title><style>body {background-image: url("https://vignette.wikia.nocookie.net/looneytunes/images/4/47/Speedy_Gonzales.jpg/revision/latest?cb=20060220031648");} </style></head><body></body></html>');
});
app.get("/image2.png", (req, res) => {
  res.send(200, "Image2");
});
app.get("/image3.gif", (req, res) => {
  res.send(200, '<!DOCTYPE html><html><body><h2><center>Speedy looks tired and sad.<center></h2><center><img src="https://giphy.com/gifs/celtics-speedy-gonzales-jasonterry-7BOLxZ8ZgcLrW" style="width:304px;height:228px;"><center></body>');
});
app.get("/home", (req, res) => {
  res.redirect(301, "/");
});
app.listen(PORT, HOST);

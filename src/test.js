const net = require('net');

const server = net.createServer(function(sock) {
	console.log('connected');
	sock.write('HTTP/1.1 200 OK\r\n\r\nTest!');
	sock.end();
});

server.listen(8080);

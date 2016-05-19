var express = require('express');
var server = express();
var http = require('http').Server(server);
var io = require('socket.io')(http);

server.use(express.static('public'));

server.get('/', function(req, res) {
	res.sendFile(__dirname + "/public/index.html");
});

server.get('/control', function(req, res) {
	res.sendFile(__dirname + "/public/control.html");
});

io.on('connection', function(socket) {
	console.log('a user connnected');
	
	socket.on('disconnect', function() {
		console.log('a user disconnnected');
	});
	
	socket.on('set-slide', function(msg) {
		console.log('next ' + msg);
		socket.broadcast.emit('set-slide', msg);
	});
	
})

http.listen(3000, function() {
	console.log('listening on *:3000');
});

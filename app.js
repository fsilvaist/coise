var express = require("express");
var http = require("http");
var app = express();
var server = http.createServer(app).listen(3000);
var io = require("socket.io")(server);
app.use(express.static("./client"));
console.log("Starting Socket App - http://localhost:3000");

var HEIGHT = 500;
var WIDTH = 500;

var clients = {};


io.on("connection", function(socket) {
	console.log("NEW CLIENT: " + socket.id);
	socket.emit("idmsg", socket.id);

	var x = Math.floor(Math.random() * HEIGHT);
    var y = Math.floor(Math.random() * WIDTH);

	var pos = {
            posX: x,
            posY: y,
            };

          
    
    for(var c in clients){
        socket.emit("enemy", c, clients[c]["posX"], clients[c]["posY"]);
    }
    clients[socket.id] = pos;  
    socket.emit("init", x, y);
    socket.on("newPos", function(x, y){
    	clients[socket.id].posX = x;
    	clients[socket.id].posY = y;
    	for(var c in clients){
    			io.sockets.emit("refreshPlayers", c, clients[c].posX, clients[c].posY);
    		}
    });

    socket.broadcast.emit("enemy", socket.id, x, y);

    socket.on("disconnect", function(){
        socket.broadcast.emit("playerexit", socket.id);
        delete clients[socket.id];

    });

    
	//socket.broadcast.emit
});

/*
setInterval(
    	function(){
    		for(var c in clients){
    			io.sockets.emit("refreshPlayers", c, clients[c].posX, clients[c].posY);
    		}	
    	}
    , 50);
*/

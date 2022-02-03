var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);
var fs = require("fs");

Grass = require("./Grass")
GrassEater = require("./GrassEater")
GrassPredator = require("./GrassPredator")
Fire = require("./Fire")

app.use(express.static("."));

app.get('/', function (req, res) {
    res.redirect('index.html');
});
server.listen(3000),

grassArr = [];
grassEaterArr = [];
grassPredator = [];
fireArr = [];
matrix = [];

io.sockets.emit("send matrix", matrix)


function CreateMatrix(m, n) {
    for (let i = 0; i < m; i++) {
      matrix.push([]);
      for (let j = 0; j < n; j++) {
        matrix[i].push(0);
      }
    }

    function AddCharacter(char, count) {
        for (let i = 0; i < count; i++) {
          let x = Math.floor(Math.random() * matrix[0].length);
          let y = Math.floor(Math.random() * matrix.length);
          matrix[y][x] = char;
        }
      }
    
      AddCharacter(1, 40);
      AddCharacter(2, 20);
      AddCharacter(3, 20);
      AddCharacter(4, 20);
}

CreateMatrix(80, 64);

io.sockets.emit('send matrix', matrix)

function createObject() {
    for (var y = 0; y < matrix.length; ++y) {
        for (var x = 0; x < matrix[y].length; ++x) {
            if (matrix[y][x] == 1) {
                var gr = new Grass(x, y);
                grassArr.push(gr);
            }
            else if (matrix[y][x] == 2) {
                var fr = new GrassEater(x, y);
                grassEaterArr.push(fr)
            }
            else if (matrix[y][x] == 3) {
                var pr = new GrassPredator(x, y);
                grassPredator.push(pr)
            }
            else if (matrix[y][x] == 4) {
                var fi = new Fire(x, y);
                fireArr.push(fi)
            }
        }
    }
}
io.sockets.emit('send matrix', matrix)

function game() {

    for(var i in grassArr){
        grassArr[i].mul();
    }
    for(var i in grassEaterArr){
        grassEaterArr[i].eat();
    }
    for(var i in grassPredator){
        grassPredator[i].eat();
    }
    for(var i in fireArr){
        fireArr[i].eat();
    }
    io.sockets.emit("send matrix", matrix);
}

setInterval(game, 10)

function kill() {
    grassArr = [];
    grassEaterArr = [];
    grassPredator = [];
    fireArr = [];
    for (var y = 0; y < matrix.length; y++) {
        for (var x = 0; x < matrix[y].length; x++) {
            matrix[y][x] = 0;
        }
    }
    io.sockets.emit("send matrix", matrix);
}
io.on('connection', function () {
    createObject(matrix)
})
io.on('connection', function (socket) {
    createObject();
    socket.on("kill", kill);
});

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

var n = 100;

weath = "winter";
Grass = require("./Grass")
GrassEater = require("./GrassEater")
GrassPredator = require("./GrassPredator")
Fire = require("./Fire")

function rand(min, max) {
    return Math.random() * (max - min) + min;
  }

for (let i = 0; i < n; i++) {
    matrix[i] = [];
    for (let j = 0; j < n; j++) {
        matrix[i][j] = Math.floor(rand(0, 3))
        
    }  
}

io.sockets.emit("send matrix", matrix)


function CreateMatrix(m, n) {
    for (let i = 0; i < m; i++) {
      matrix.push([]);
      for (let j = 0; j < n; j++) {
        matrix[i].push(0);
      }
    }


}
CreateMatrix(80, 64);
function AddCharacter(character, count) {
    for (let i = 0; i < count; i++) {
      let x = Math.floor(Math.random() * matrix[0].length);
      let y = Math.floor(Math.random() * matrix.length);
      matrix[y][x] = character;
    }
}  

  AddCharacter(1, 100);
  AddCharacter(2, 35);
  AddCharacter(3, 150);
  AddCharacter(4, 100);



io.sockets.emit('send matrix', matrix)

function createObject() {
    for (var y = 0; y < matrix.length; ++y) {
        for (var x = 0; x < matrix[y].length; ++x) {
            if (matrix[y][x] == 1) {
                var gr = new Grass(x, y);
                grassArr.push(gr);
            }
            else if (matrix[y][x] == 3) {
                var pr = new GrassPredator(x, y);
                grassPredator.push(pr)
            }
            else if (matrix[y][x] == 2) {
                var fr = new GrassEater(x, y);
                grassEaterArr.push(fr)
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

setInterval(game, 500)

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
function addGrass() {
    for (var i = 0; i < 5; i++) {
    var x = Math.floor(Math.random() * matrix[0].length)
    var y = Math.floor(Math.random() * matrix.length)
        if (matrix[y][x] == 0) {
            matrix[y][x] = 1
            var gr = new Grass(x, y, 1)
            grassArr.push(gr)
        }
    }
    io.sockets.emit("send matrix", matrix);
}
function addGrassEater() {
    for (var i = 0; i < 5; i++) {   
    var x = Math.floor(Math.random() * matrix[0].length)
    var y = Math.floor(Math.random() * matrix.length)
        if (matrix[y][x] == 0) {
            matrix[y][x] = 2
            grassEaterArr.push(new GrassEater(x, y, 2))
        }
    }
    io.sockets.emit("send matrix", matrix);
}

function addGrassPredator() {
    for (var i = 0; i < 5; i++) {
    var x = Math.floor(Math.random() * matrix[0].length)
    var y = Math.floor(Math.random() * matrix.length)
        if (matrix[y][x] == 0) {
            matrix[y][x] = 3
            var pr = new GrassPredator(x, y, 3)
            grassPredator.push(pr)
        }
    }
    io.sockets.emit("send matrix", matrix);
}
    function addFire() {
        for (var i = 0; i < 5; i++) {
        var x = Math.floor(Math.random() * matrix[0].length)
        var y = Math.floor(Math.random() * matrix.length)
            if (matrix[y][x] == 0) {
                matrix[y][x] = 4
                var fi = new Fire(x, y, 4)
                fireArr.push(fi)
            }
        }
        io.sockets.emit("send matrix", matrix);
}
function weather() {
    if (weath == "winter") {
        weath = "spring"
    }
    else if (weath == "spring") {
        weath = "summer"
    }
    else if (weath == "summer") {
        weath = "autumn"
    }
    else if (weath == "autumn") {
        weath = "winter"
    }
    io.sockets.emit('weather', weath)
}
setInterval(weather, 5000);

io.on('connection', function (socket) {
    createObject();
    socket.on("kill", kill);
    socket.on("add grass", addGrass);
    socket.on("add grassEater", addGrassEater);
    socket.on("add grassPredator", addGrassPredator);
    socket.on("add fire", addFire);
});

var statistics = {}; 

setInterval(function() {
    statistics.Fire = fireArr.length;
    statistics.Grass = grassArr.length;
    statistics.GrassEater = grassEaterArr.length;
    statistics.GrassPredator = grassPredator.length;
    statistics.Fire = fireArr.length;
    fs.writeFile("statistics.json", JSON.stringify(statistics), function(){
        console.log("send")
    })
},1000)


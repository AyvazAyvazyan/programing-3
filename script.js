var socket = io();

var side = 12;
function setup() {
    createCanvas(80 * side, 64 * side);
   }
   
socket.on("weather", function (data) {
    weath = data;
})

function nkarel(matrix) {
    for (var y = 0; y < matrix.length; y++) {
        for (var x = 0; x < matrix[0].length; x++) {
            var obj = matrix[y][x];
            if (obj == 1){
                if(weath == "summer") {
                fill("green");
            }else if (weath == "autumn") {
                fill("#333300");
            }else if (weath == "winter") {
                fill("white");
            }else if (weath == "spring") {
                fill("#4dffa6");
            }
        }else if (obj == 2) {
                fill("yellow");
            }else if (obj == 0){
                fill("#856520")
            }
        else if (obj == 3) {
                fill("#000000");
            }else if (obj == 0){
                fill("#856520")
            }
        else if (obj == 4) {
                fill("#e22822");
        }else if (obj == 0){
                fill("#856520")
        }    

            rect(x * side, y * side, side, side);
        }
    }
}

    socket.on('send matrix', nkarel)

    function kill() {
        socket.emit("kill")
    }
    function addGrass() {
        socket.emit("add grass")
    }
    function addGrassEater() {
        socket.emit("add grassEater")
    }
    function addGrassPredator() {
        socket.emit("add grass predator")
    }
    function addFire() {
        socket.emit("add fire")
    }
    
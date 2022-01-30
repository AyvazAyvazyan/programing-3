let LivingCreator = require('./LivingCreator')
module.exports = class water extends LivingCreator {
        constructor(x, y, index){
        super(x, y, index);
        this.energy = 10;
    }
// getNewCoordinates method ----------------------------------------------------------------
    getNewCoordinates(){
        this.directions = [
            [this.x - 1, this.y - 1],
            [this.x    , this.y - 1],
            [this.x + 1, this.y - 1],
            [this.x - 1, this.y],
            [this.x + 1, this.y],
            [this.x - 1, this.y + 1],
            [this.x    , this.y + 1],
            [this.x + 1, this.y + 1]
        ];
     }
// chooseCell method ----------------------------------------------------------------
    chooseCell(character1,character2,character3) {
        this.getNewCoordinates()
        var found = [];
        for (var i in this.directions) {
            var x = this.directions[i][0];
            var y = this.directions[i][1];
            if (x >= 0 && x < matrix[0].length && y >= 0 && y < matrix.length){
            if (matrix[y][x] == character3 || matrix[y][x] == character1 || matrix[y][x] == character2) {
                found.push(this.directions[i]);
            }
        }
    }
        return found;
     }   
// Mul method ----------------------------------------------------------------
mul() {
let found = super.chooseCell(0);
let exact = found[Math.floor(Math.random() * found.length)]

if (exact && this.energy > 14) {
    let x = exact[0];
    let y = exact[1];

    let eater = new ater(x, y);
    matrix[y][x] = 5;
    waterArr.push(eater);

    this.energy = 10;
}
}

// Eat method ----------------------------------------------------------------
eat(){
    let found = super.chooseCell(4,2,3,1);
    let exact = found[Math.floor(Math.random() * found.length)]

if (exact){
    this.energy +=2;
    let x = exact[0];
    let y = exact[1];

    for (let i = 0; i < grassEaterArr.length; i++) {
        if( grassEaterArr[i].x == x && grassEaterArr[i].y == y ){
            grassEaterArr.splice(i, 1)
        }
    }
    for (let i = 0; i < grassPredator.length; i++) {
        if( grassPredator[i].x == x && grassPredator[i].y == y ){
            grassPredator.splice(i, 1)
        }
    }
    for (let i = 0; i < fireArr.length; i++) {
        if( fireArr[i].x == x && fireArr[i].y == y ){
            fireArr.splice(i, 1)
        }
    }

    matrix[y][x] = 5
    matrix[this.y][this.x] = 0
    
    this.x = x;
    this.y = y

    if(this.energy > 16){
        this.mul()
    }
}
else {
    this.move()
}
}
// Move method --------------------------------------------------------------------
move(){
    let found = super.chooseCell(0);
    let exact = found[Math.floor(Math.random() * found.length)]

if (exact){
    let x = exact[0];
    let y = exact[1];

    matrix[y][x] = 5
    matrix[this.y][this.x] = 0

    this.x = x;
    this.y = y;

    this.energy--

    if(this.energy < 0){
        this.die()
    }
}else {
    this.energy--
    if(this.energy < 0){
        this.die()
    }
}
}
// Die method --------------------------------------------------------------------
die(){
for (let i = 0; i < waterArr.length; i++) {
    if( waterArr[i].x == this.x && waterArr[i].y == this.y ){
        waterArr.splice(i, 1)
    }
}
matrix[this.y][this.x] = 0
}
} 
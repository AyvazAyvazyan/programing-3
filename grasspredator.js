let LivingCreator = require('./LivingCreator')
module.exports = class GrassPredator extends LivingCreator {
        constructor(x, y, index){
        super(x, y, index);
        this.energy = 9;
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
    chooseCell(character,character1) {
        this.getNewCoordinates()
        var found = [];
        for (var i in this.directions) {
            var x = this.directions[i][0];
            var y = this.directions[i][1];
            if (x >= 0 && x < matrix[0].length && y >= 0 && y < matrix.length){
            if (matrix[y][x] == character || matrix[y][x] == character1) {
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

    let eater = new GrassPredator(x, y);
    matrix[y][x] = 3;
    grassPredator.push(eater);

    this.energy = 9;
} else {
    console.error('there is no way to multiply');   
}
}

// Eat method ----------------------------------------------------------------
eat(){
let found = super.chooseCell(1,2);
let exact = found[Math.floor(Math.random() * found.length)]
if (exact){
    this.energy +=2;
    let x = exact[0];
    let y = exact[1];

    for (let i = 0; i < grassArr.length; i++) {
        if( grassArr[i].x == x && grassArr[i].y == y ){
            grassArr.splice(i, 1)
        }
    }
    for (let i = 0; i < grassEaterArr.length; i++) {
        if( grassEaterArr[i].x == x && grassEaterArr[i].y == y ){
            grassEaterArr.splice(i, 1)
        }
    }

    matrix[y][x] = 3
    matrix[this.y][this.x] = 0
    
    this.x = x;
    this.y = y

    if(this.energy > 14){
        this.mul()
    }
}else {
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

    matrix[y][x] = 3
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
for (let i = 0; i < grassPredator.length; i++) {
    if( grassPredator[i].x == this.x && grassPredator[i].y == this.y ){
        grassPredator.splice(i, 1)
    }
}
matrix[this.y][this.x] = 0
}
}
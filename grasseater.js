let LivingCreator = require('./LivingCreator')
module.export = class GrassEater extends LivingCreator {
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

// Mul method ----------------------------------------------------------------
mul() {
let found = this.chooseCell(0);
let exact = random(found)

if (exact && this.energy > 12) {
    let x = exact[0];
    let y = exact[1];

    let eater = new GrassEater(x, y);
    matrix[y][x] = 2;
    grassEaterArr.push(eater);

    this.energy = 10;
}
}

// Eat method ----------------------------------------------------------------
eat(){
let found = this.chooseCell(1);
let exact = random(found)

if (exact){
    this.energy +=2;
    let x = exact[0];
    let y = exact[1];

    for (let i = 0; i < grassArr.length; i++) {
        if( grassArr[i].x == x && grassArr[i].y == y ){
            grassArr.splice(i, 1)
        }
    }
    for (let i = 0; i < waterArr.length; i++) {
        if( waterArr[i].x == x && waterArr[i].y == y ){
            waterArr.splice(i, 1)
        }
    }
    for (let i = 0; i < fireArr.length; i++) {
        if( fireArr[i].x == x && fireArr[i].y == y ){
            fireArr.splice(i, 1)
        }
    }

    matrix[y][x] = 2
    matrix[this.y][this.x] = 0
    
    this.x = x;
    this.y = y

    if(this.energy > 12){
        this.mul()
    }
}
else {
    this.move()
}
}
// Move method --------------------------------------------------------------------
move(){
let found = this.chooseCell(0);
let exact = random(found)

if (exact){
    let x = exact[0];
    let y = exact[1];

    matrix[y][x] = 2
    matrix[this.y][this.x] = 0

    this.x = x;
    this.y = y;

    this.energy--

    if(this.energy < 0){
        this.die()
    }
}else {
    this.energy--

    }
}
// Die method --------------------------------------------------------------------
die(){
for (let i = 0; i < grassEaterArr.length; i++) {
    if( grassEaterArr[i].x == this.x && grassEaterArr[i].y == this.y ){
        grassEaterArr.splice(i, 1)}
}
matrix[this.y][this.x] = 0
}
}
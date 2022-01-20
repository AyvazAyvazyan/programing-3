class fire extends LivingCreator {
        constructor(x, y, index){
        super(x, y, index);
        this.energy = 8;
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
    chooseCell(character1,character2) {
        this.getNewCoordinates()
        var found = [];
        for (var i in this.directions) {
            var x = this.directions[i][0];
            var y = this.directions[i][1];
            if (x >= 0 && x < matrix[0].length && y >= 0 && y < matrix.length){
            if (matrix[y][x] == character1 || matrix[y][x] == character2) {
                found.push(this.directions[i]);
            }
        }
    }
        return found;
     }   
// Mul method ----------------------------------------------------------------
mul() {
let found = this.chooseCell(0);
let exact = random(found)

if (exact && this.energy > 16) {
    let x = exact[0];
    let y = exact[1];

    let eater = new fire(x, y);
    matrix[y][x] = 4;
    fireArr.push(eater);

    this.energy = 14;
}
}

// Eat method ----------------------------------------------------------------
eat(){
let found = this.chooseCell(1,3);
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
    for (let i = 0; i < grassPredator.length; i++) {
        if( grassPredator[i].x == x && grassPredator[i].y == y ){
            grassPredator.splice(i, 1)
        }
    }

    matrix[y][x] = 4
    matrix[this.y][this.x] = 0
    
    this.x = x;
    this.y = y

    if(this.energy > 16){
        this.mul()
    }
}else {
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

    matrix[y][x] = 4
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
for (let i = 0; i < fireArr.length; i++) {
    if( fireArr[i].x == this.x && fireArr[i].y == this.y ){
        fireArr.splice(i, 1)
    }
}
matrix[this.y][this.x] = 0
}
}
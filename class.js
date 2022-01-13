// class Grass
class Grass {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.energy = 15;
        this.directions = [
            [this.x - 1, this.y - 1],
            [this.x, this.y - 1],
            [this.x + 1, this.y - 1],
            [this.x - 1, this.y],
            [this.x + 1, this.y],
            [this.x - 1, this.y + 1],
            [this.x, this.y + 1],
            [this.x + 1, this.y + 1]
        ];
    }
    chooseCell(char) {
        let result = [];

        for (let i = 0; i < this.directions.length; i++) {
            let x = this.directions[i][0];
            let y = this.directions[i][1];

            if ( y < matrix.length && y >= 0 && x < matrix[0].length && x >= 0 ){
                if (matrix[y][x] == char) {
                    result.push(this.directions[i]);
                }
            }

        }

        return result;
    }
    mul() {
        this.energy++;
        let found = this.chooseCell(0);
        let exact = random(found)

        if (exact && this.energy > 15) {
            let x = exact[0];
            let y = exact[1];

            let grass = new Grass(x, y);
            matrix[y][x] = 1;
            grassArr.push(grass);

            this.energy = 15;
        }
    }
}
// class GrassEater -------------------------------------------------------------------------------------
    class GrassEater {
        constructor(x,y) {
            this.x = x;
            this.y = y;
            this.energy = 10;
            this.directions = [
                [this.x - 1, this.y - 1],
                [this.x, this.y - 1],
                [this.x + 1, this.y - 1],
                [this.x - 1, this.y],
                [this.x + 1, this.y],
                [this.x - 1, this.y + 1],
                [this.x, this.y + 1], 
                [this.x + 1, this.y + 1]
                ];
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
        chooseCell(character,character3) {
            this.getNewCoordinates()
            var found = [];
            for (var i in this.directions) {
                var x = this.directions[i][0];
                var y = this.directions[i][1];
                if (x >= 0 && x < matrix[0].length && y >= 0 && y < matrix.length){
                if (matrix[y][x] == character || matrix[y][x] == character3) {
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
// class GrassPredator
class GrassPredator {
    constructor(x,y) {
        this.x = x;
        this.y = y;
        this.energy = 9;
        this.directions = [
            [this.x - 1, this.y - 1],
            [this.x, this.y - 1],
            [this.x + 1, this.y - 1],
            [this.x - 1, this.y],
            [this.x + 1, this.y],
            [this.x - 1, this.y + 1],
            [this.x, this.y + 1], 
            [this.x + 1, this.y + 1]
            ];
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
let found = this.chooseCell(0);
let exact = random(found)

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
let found = this.chooseCell(1,2);
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
let found = this.chooseCell(0);
let exact = random(found)

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
// class Fire
class fire {
    constructor(x,y) {
        this.x = x;
        this.y = y;
        this.energy = 14;
        this.directions = [
            [this.x - 1, this.y - 1],
            [this.x, this.y - 1],
            [this.x + 1, this.y - 1],
            [this.x - 1, this.y],
            [this.x + 1, this.y],
            [this.x - 1, this.y + 1],
            [this.x, this.y + 1], 
            [this.x + 1, this.y + 1]
            ];
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
//class water 
class water {
    constructor(x,y) {
        this.x = x;
        this.y = y;
        this.energy = 10;
        this.directions = [
            [this.x - 1, this.y - 1],
            [this.x, this.y - 1],
            [this.x + 1, this.y - 1],
            [this.x - 1, this.y],
            [this.x + 1, this.y],
            [this.x - 1, this.y + 1],
            [this.x, this.y + 1], 
            [this.x + 1, this.y + 1]
            ];
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
let found = this.chooseCell(0);
let exact = random(found)

if (exact && this.energy > 14) {
    let x = exact[0];
    let y = exact[1];

    let eater = new water(x, y);
    matrix[y][x] = 5;
    waterArr.push(eater);

    this.energy = 10;
}
}

// Eat method ----------------------------------------------------------------
eat(){
let found = this.chooseCell(4,2,3);
let exact = random(found)

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
let found = this.chooseCell(0);
let exact = random(found)

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


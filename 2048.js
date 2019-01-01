var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');
var Input = document.getElementById('size');
var changeSize = document.getElementById('change-size');
var score = document.getElementById('score');
var score2 = 0;
var size = 4;
var width = canvas.width / size - 6;
var tab = [];
var fontSize;
var verifie = false;
demarre();

changeSize.onclick = function () {
    if (Input.value >= 2 && Input.value <= 20) {
        size = Input.value;
        width = canvas.width / size - 6;
        console.log(Input.value);
        canvasefface();
        demarre();
    }
};

function Case(row, coll) {
    this.value = 0;
    this.x = coll * width + 5 * (coll + 1);
    this.y = row * width + 5 * (row + 1);
}

function createCase() {
    var i, j;
    for(i = 0; i < size; i++) {
        tab[i] = [];
        for(j = 0; j < size; j++) {
            tab[i][j] = new Case(i, j);
        }
    }
}

function colorCase(cell) {
    ctx.beginPath();
    ctx.rect(cell.x, cell.y, width, width);
    switch (cell.value){
        case 0 : ctx.fillStyle = '#A9A9A9'; break;
        case 2 : ctx.fillStyle = '#D2691E'; break;
        case 4 : ctx.fillStyle = '#FF7F50'; break;
        case 8 : ctx.fillStyle = '#ffbf00'; break;
        case 16 : ctx.fillStyle = '#bfff00'; break;
        case 32 : ctx.fillStyle = '#40ff00'; break;
        case 64 : ctx.fillStyle = '#00bfff'; break;
        case 128 : ctx.fillStyle = '#FF7F50'; break;
        case 256 : ctx.fillStyle = '#0040ff'; break;
        case 512 : ctx.fillStyle = '#ff0080'; break;
        case 1024 : ctx.fillStyle = '#D2691E'; break;
        case 2048 : ctx.fillStyle = '#FF7F50'; break;
        case 4096 : ctx.fillStyle = '#ffbf00'; break;
        default : ctx.fillStyle = '#ff0080';
    }
    ctx.fill();
    if (cell.value) {
        fontSize = width / 2;
        ctx.font = fontSize + 'px Arial';
        ctx.fillStyle = 'white';
        ctx.textAlign = 'center';
        ctx.fillText(cell.value, cell.x + width / 2, cell.y + width / 2 + width/7);
    }
}

function canvasefface() {
    ctx.clearRect(0, 0, 500, 500);
}

document.onkeydown = function (event) {
    if (!verifie) {
        if (event.keyCode === 38 || event.keyCode === 87) {
            moveUp();
        } else if (event.keyCode === 39 || event.keyCode === 68) {
            moveRight();
        } else if (event.keyCode === 40 || event.keyCode === 83) {
            moveDown();
        } else if (event.keyCode === 37 || event.keyCode === 65) {
            moveLeft();
        }
        score.innerHTML = 'Score : ' + score2;
    }
};

function demarre() {
    createCase();
    dessineCase();
    newCase();
    newCase();
}

function finishGame() {
    canvas.style.opacity = '0.5';
    verifie = true;
}

function dessineCase() {
    var i, j;
    for(i = 0; i < size; i++) {
        for(j = 0; j < size; j++) {
            colorCase(tab[i][j]);
        }
    }
}

function newCase() {
    var countFree = 0;
    var i, j;
    for(i = 0; i < size; i++) {
        for(j = 0; j < size; j++) {
            if(!tab[i][j].value) {
                countFree++;
            }
        }
    }
    if(!countFree) {
        finishGame();
        return;
    }
    while(true) {
        var row = Math.floor(Math.random() * size);
        var coll = Math.floor(Math.random() * size);
        if(!tab[row][coll].value) {
            tab[row][coll].value = 2 * Math.ceil(Math.random() * 2);
            dessineCase();
            return;
        }
    }
}

function moveRight () {
    var i, j;
    var coll;
    for(i = 0; i < size; i++) {
        for(j = size - 2; j >= 0; j--) {
            if(tab[i][j].value) {
                coll = j;
                while (coll + 1 < size) {
                    if (!tab[i][coll + 1].value) {
                        tab[i][coll + 1].value = tab[i][coll].value;
                        tab[i][coll].value = 0;
                        coll++;
                    } else if (tab[i][coll].value == tab[i][coll + 1].value) {
                        tab[i][coll + 1].value *= 2;
                        score2 +=  tab[i][coll + 1].value;
                        tab[i][coll].value = 0;
                        break;
                    } else {
                        break;
                    }
                }
            }
        }
    }
    newCase();
}

function moveLeft() {
    var i, j;
    var coll;
    for(i = 0; i < size; i++) {
        for(j = 1; j < size; j++) {
            if(tab[i][j].value) {
                coll = j;
                while (coll - 1 >= 0) {
                    if (!tab[i][coll - 1].value) {
                        tab[i][coll - 1].value = tab[i][coll].value;
                        tab[i][coll].value = 0;
                        coll--;
                    } else if (tab[i][coll].value == tab[i][coll - 1].value) {
                        tab[i][coll - 1].value *= 2;
                        score2 +=   tab[i][coll - 1].value;
                        tab[i][coll].value = 0;
                        break;
                    } else {
                        break;
                    }
                }
            }
        }
    }
    newCase();
}

function moveUp() {
    var i, j, row;
    for(j = 0; j < size; j++) {
        for(i = 1; i < size; i++) {
            if(tab[i][j].value) {
                row = i;
                while (row > 0) {
                    if(!tab[row - 1][j].value) {
                        tab[row - 1][j].value = tab[row][j].value;
                        tab[row][j].value = 0;
                        row--;
                    } else if (tab[row][j].value == tab[row - 1][j].value) {
                        tab[row - 1][j].value *= 2;
                        score2 +=  tab[row - 1][j].value;
                        tab[row][j].value = 0;
                        break;
                    } else {
                        break;
                    }
                }
            }
        }
    }
    newCase();
}

function moveDown() {
    var i, j, row;
    for(j = 0; j < size; j++) {
        for(i = size - 2; i >= 0; i--) {
            if(tab[i][j].value) {
                row = i;
                while (row + 1 < size) {
                    if (!tab[row + 1][j].value) {
                        tab[row + 1][j].value = tab[row][j].value;
                        tab[row][j].value = 0;
                        row++;
                    } else if (tab[row][j].value == tab[row + 1][j].value) {
                        tab[row + 1][j].value *= 2;
                        score2 +=  tab[row + 1][j].value;
                        tab[row][j].value = 0;
                        break;
                    } else {
                        break;
                    }
                }
            }
        }
    }
    newCase();
}



var animFrame = window.requestAnimationFrame ||
            window.webkitRequestAnimationFrame ||
            window.mozRequestAnimationFrame    ||
            window.oRequestAnimationFrame      ||
            window.msRequestAnimationFrame     ||
            null;

//Canvas
var divArena;
var canArena;
var conArena;
var ArenaWidth = 500;
var ArenaHeight = 300;

//Background
var imgBackground;
var xBackgroundOffset = 0;
var xBackgroundSpeed = 1;
var backgroundWidth = 1782;
var backgroundHeight = 600;

///////////////////////////////////
//Keys
var keys = {
    UP: 38,
    DOWN: 40,
    SPACE: 32,
    ENTER: 13
};

var keyStatus = {};

function keyDownHandler(event) {
    "use strict"; 
    var keycode = event.keyCode, 
        key; 
    for (key in keys) {
        if (keys[key] === keycode) {
            keyStatus[keycode] = true;
            event.preventDefault();
        }
    }
}
function keyUpHandler(event) {
   var keycode = event.keyCode,
            key;
    for (key in keys) 
        if (keys[key] == keycode) {
            keyStatus[keycode] = false;
        }
        
    }
///////////////////////////////////

let tir = new Image;
tir.src = './assets/Boss/Hatch Sequence/f4.png';
let fires = [];

let enemyImage = new Image;
enemyImage.src = './assets/Enemy/Example/e_f5.png';
let enemies = [];
let cooldownEnemies = 0;
let probability = 0.5;

let cooldown = 0;


/////////////////////////////////
// Hero Player
var imgPlayer = new Image();
imgPlayer.src = "./assets/Ship/Spritesheet_64x29.png";
var xPlayer = 20;
var yPlayerSpeed = 10;
var yPlayer = 100;
var PlayerHeight = 15;
var PlayerWidth = 32;
var PlayerImgHeight = 29;
var PlayerImgWidth = 64;
let rowSpritePlayer = 0;
/////////////////////////////////



function updateScene() {
    "use strict"; 
    xBackgroundOffset = (xBackgroundOffset - xBackgroundSpeed) % backgroundWidth;
}
function updateItems() {
    "use strict"; 
    clearItems();
    
    var keycode;
    for (keycode in keyStatus) {
            if(keyStatus[keycode] == true){
                if(keycode == keys.UP) { 
                    yPlayer -= yPlayerSpeed;   
                }
                if(keycode == keys.DOWN) { 
                    yPlayer += yPlayerSpeed;   
                } 
                if(keycode == keys.SPACE) { 
                    if (cooldown > 0) {
                        fires.push({x:xPlayer+20, y:yPlayer});
                        cooldown = -20;
                    }
                }             
            }
        keyStatus[keycode] = false;
    }
    fires.forEach(fire => fire.x++);
    fires = fires.filter(fire => fire.x + 200 < ArenaWidth);
    cooldown++;

    enemies.forEach(enemy => enemy.x--);
    if (cooldownEnemies > 0){
        enemies.push({x:ArenaWidth, y:Math.floor(Math.random()*ArenaHeight)});
        cooldownEnemies = -10;
    }
    cooldownEnemies++;

    fires.forEach((fire, indexFire) => {
        enemies.forEach((enemy, index) => {
            if (Math.abs(enemy.x - fire.x) < 10 && Math.abs(enemy.y - fire.y) < 10){
                enemies.splice(index, 1);
                fires.splice(indexFire, 1);
            }
        })
    });

    enemies.forEach((enemy, index) => {
        if (Math.abs(enemy.x - xPlayer) < 10 && Math.abs(enemy.y - yPlayer) < 10){
            alert("Perdu !");
            window.location.reload();
        }
    });
}
function drawScene() {
    "use strict"; 
    canArena.style.backgroundPosition = xBackgroundOffset + "px 0px" ;
}
function drawItems() {
    "use strict";
    rowSpritePlayer++;
    if (rowSpritePlayer == 13)
        rowSpritePlayer = 0;
    conArena.drawImage(imgPlayer,0,Math.round(rowSpritePlayer/4)*29,PlayerImgWidth,PlayerImgHeight, xPlayer,yPlayer,PlayerWidth,PlayerHeight);
    fires.forEach(fire => {
        conArena.drawImage(tir, 0,0,16,16, fire.x, fire.y,16, 16);
    });
    enemies.forEach(enemy => {
        conArena.drawImage(enemyImage, 0,0,40,40,enemy.x, enemy.y, 20, 20);
    });
}
function clearItems() {
    "use strict"; 
    conArena.clearRect(xPlayer,yPlayer,PlayerWidth,PlayerHeight);
    fires.forEach(fire => {
        conArena.clearRect(fire.x, fire.y, 16, 16);
    });
    enemies.forEach(enemy => {
        conArena.clearRect(enemy.x, enemy.y, 20, 20);
    });
}

function updateGame() {
    "use strict"; 
    updateScene();
    updateItems();
}

function drawGame() {
    "use strict"; 
    drawScene();
    drawItems();    
}


function mainloop () {
    "use strict"; 
    updateGame();
    drawGame();
}

function recursiveAnim () {
    "use strict"; 
    mainloop();
    animFrame( recursiveAnim );
}
 
function init() {
    "use strict";
    divArena = document.getElementById("arena");
    canArena = document.createElement("canvas");
    canArena.setAttribute("id", "canArena");
    conArena = canArena.getContext("2d");
    divArena.appendChild(canArena);
 
    
window.addEventListener("keydown", keyDownHandler, false);
window.addEventListener("keyup", keyUpHandler, false);
    
    animFrame( recursiveAnim );
    
}

window.addEventListener("load", init, false);

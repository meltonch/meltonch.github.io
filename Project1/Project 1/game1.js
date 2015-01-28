/**
 * Created by Chase Melton on 1/27/2015.
 */

canvas = document.getElementById("canvas");
ctx = canvas.getContext("2d");

STAGE_WIDTH = 400;
STAGE_HEIGHT = 500;

FPS = 1000/30;

//declare variables for player and alien elements
var player;
var cpuList = [];
var laserList = [];

//Initialize arrow key states
var rightDown = false;
var leftDown = false;
var upDown = false;
var downDown = false;
var spaceDown = false;

//initialize images
var ship = new Image();
var laser = new Image();
var alien = new Image();

ship.ready = false;
laser.ready = false;
alien.ready = false;

ship.onload = setAssetReady;
laser.onload = setAssetReady;
alien.onload = setAssetReady;

ship.src = "img/ship1.png";
laser.src = "img/laser.png";
alien.src = "img/alien.png";

ctx.fillStyle = "black";
ctx.fillRect(0,0,STAGE_WIDTH,STAGE_HEIGHT);

player = new Player(ship, ctx);
alien = new Alien(alien, ctx);

window.addEventListener("keydown", onKeyDown, true);
window.addEventListener("keyup", onKeyUp, true);

var gameloop;
var preloader = setInterval(preloading, FPS);


function setAssetReady() {

    this.ready = true;

}

function preloading() {

    if(ship.ready && laser.ready) {

        clearInterval(preloader);
        gameloop = setInterval(update, FPS);

    }

}

function update() {

    ctx.fillStyle = "black";
    ctx.fillRect(0,0,STAGE_WIDTH,STAGE_HEIGHT);

    if(leftDown) player.moveLeft();
    if(rightDown) player.moveRight();
    if(upDown) player.moveUp();
    if(downDown) player.moveDown();
    if(spaceDown) laserList.push(new Laser(150, 400, laser, ctx));

    drawAll();

    checkCollision();

}

function drawAll() {

    player.draw();

    //check to see if all lasers in list are in bounds.
    //if not, then splice it out.
    for(i = 0; i < laserList.length; i++){

        if(laserList[i].isInBounds())
            laserList[i].move();
        else
            laserList.splice(i, 1);

    }

    //draw lasers
    for(j = 0; j < laserList.length; j++) {
        laserList[j].draw();
    }

    alien.draw();

}

function onKeyDown(evt) {

    if(evt.keyCode == 39) rightDown = true;
    else if(evt.keyCode == 40) upDown = true;
    else if(evt.keyCode == 37) leftDown = true;
    else if(evt.keyCode == 38) downDown = true;
    else if(evt.keyCode == 32) spaceDown = true;

}

function onKeyUp(evt) {

    if(evt.keyCode == 39) rightDown = false;
    else if(evt.keyCode == 40) upDown = false;
    else if(evt.keyCode == 37) leftDown = false;
    else if(evt.keyCode == 38) downDown = false;
    else if(evt.keyCode == 32) spaceDown = false;

}

function checkCollision() {

    if (player.getX() < alien.getX() + alien.getWidth() && player.getX() + player.getWidth() > alien.getX()
        && player.getY() < alien.getY() + alien.getHeight() && player.getY() + player.getHeight() > alien.getY()) clearInterval(gameloop);

}


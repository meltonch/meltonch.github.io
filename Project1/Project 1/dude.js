/**
 * This file represents the pac man object.
 *
 * @param ctx the graphics context taken from the canvas in <code>game1.js</code>
 * @constructor
 */

function Player(img, ctx) {

    var sprite = img;

    var sprite_x = 0;
    var sprite_y = 0;

    var START_X = 150;
    var START_Y = 400;
    DX = 5;
    DY = 5;
    var SPRITE_WIDTH = 100;
    var SPRITE_HEIGHT = 100;
    var WIDTH = 100;
    var HEIGHT = 100;
    var x = START_X;
    var y = START_Y;

    //Specifies how ship is drawn
    this.draw = function() {

        ctx.drawImage(sprite, sprite_x, sprite_y, WIDTH, HEIGHT, x, y, WIDTH, HEIGHT);

        sprite_x += WIDTH;
        if (sprite_x >= 200)
            sprite_x = 0;
    };

    //Specifies how ship moves
    this.moveLeft = function() {

        x -= DX;

    };

    this.moveRight = function() {

        x += DX;

    };

    this.moveUp = function() {

        y += DY;

    };

    this.moveDown = function() {

        y -= DY;

    };

    this.getX = function() { return x; };
    this.getY = function() { return y; };
    this.getWidth = function() { return WIDTH; };
    this.getHeight = function() { return HEIGHT; };

}
/**
 * This file represents an Alien object.
 *
 * @param type
 * @constructor
 */
function Alien(img, ctx) {

    var alien = img;

    var sprite_x = 0;
    var sprite_y = 0;
    var START_X = 100;
    var START_Y = 250;
    DX = 5;
    DY = 5;
    var WIDTH = 100;
    var HEIGHT = 100;

    var x = START_X;
    var y = START_Y;

    //Specifies how alien is drawn
    this.draw = function() {

        ctx.drawImage(alien, sprite_x, sprite_y, WIDTH, HEIGHT, x, y, WIDTH, HEIGHT);

        sprite_x += WIDTH;
        if (sprite_x >= 200)
            sprite_x = 0;
    };

    this.move = function() {




    };

    this.getX = function() { return x; };
    this.getY = function() { return y; };
    this.getWidth = function() { return WIDTH; };
    this.getHeight = function() { return HEIGHT; };

}
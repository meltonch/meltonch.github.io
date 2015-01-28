/**
 * Created by Chase Melton on 1/28/2015.
 */

function Laser(shipX, shipY, img, ctx) {

    var laser = img;

    var LASER_WIDTH = 32;
    var LASER_HEIGHT = 32;

    var x = shipX;
    var y = shipY;

    var DY = 10; //laser only moves forward

    this.draw = function () {

        ctx.drawImage(laser, 0, 0, LASER_WIDTH, LASER_HEIGHT, x, y, LASER_WIDTH, LASER_HEIGHT);

    };

    this.move = function () {

        y -= DY;

    };

    this.isInBounds = function() {

        return (y < 0);

    };

}
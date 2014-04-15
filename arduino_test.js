/*
 * arduino_test.js -- lights up pin 13 on an arduino using johnny-five library
 */

var five = require("johnny-five"),
    board = new five.Board();

board.on("ready", function() {
  (new five.Led(13)).strobe();
});

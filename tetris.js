var COLS = 10, ROWS=20;
var board=[]; //board information
var lose; //Is it the top?
var interval;
var current;
var currentX, currentY;

// bloack pattern
var shapes = [
  [ 1, 1, 1, 1 ],
  [ 1, 1, 1, 0,
    1 ],
  [ 1, 1, 1, 0,
    0, 0, 1 ],
  [ 1, 1, 0, 0,
    1, 1 ],
  [ 1, 1, 0, 0,
    0, 1, 1 ],
  [ 0, 1, 1, 0,
    1, 1 ],
  [ 0, 1, 0, 0,
    1, 1, 1 ]
];

// block color
var colors = [
  'cyan', 'orange', 'blue', 'yellow', 'red', 'green', 'purple'
];

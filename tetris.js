var COLS = 10, ROWS = 20;
var board = []; //board information
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

// init borad
function init() {
  for (var y = 0; y < ROWS; ++y) {
    board[y] = [];
    for (var x = 0; x < COLS; ++x) {
      board[y][x] = 0;
    }
  }
}

// function which push keyborad
function keyPress(key) {
  switch(key) {
    case 'left':
      if (valid(-1)) {
        --currentX;
      }
      break;
    case 'right':
      if (valid(1)) {
        ++currentX;
      }
      break;
    case 'down':
      if (valid(0, 1)) {
        ++currentY;
      }
      break;
    case 'rotate':
      var rotated = rotate(current);
      if (valid(0, 0, rotated)) {
        current = rotated;
      }
      break;
  }
}

// rotate bloack
function rotate(current) {
  var newCurrent = [];
  for (var y = 0; y < 4; ++y;) {
    newCurrent[y] = [];
    for (var x = 0; x < 4; ++x) {
      newCurrent[y][x] = current[3 - x][y];
    }
  }
  return newCurrent;
}

// set the top of borad and random output block pattern from shapes
function newShape() {
  var id = Math.floor(Math.random() * shapes.length);
  var shape = shapes[id];

  //set pattern to bloack
  current = [];
  for (var y = 0; y < 4; ++y) {
    current[y] = [];
    for (var x = 0; x < 4; ++x) {
      var i = 4 * y + x;
      if (typeof shape[i] != 'underfined' && shape[i]) {
        current[y][x] = id + 1;
      } else {
        current[y][x] = 0;
      }
    }
  }
  currentX = 5;
  currentY = 0;
}

function valid(offsetX, offsetY, newCurrent) {
  offsetX = offsetX || 0;
  offsetY = offsetY || 0;
  offsetX = currentX + offsetX;
  offsetY = currentY + offsetY;
  newCurrent = newCurrent || current;
  for (var y = 0; y < 4; ++y) {
    for (var x = 0; x < 4; ++x) {
      if (newCurrent[y][x]) {
        if (typeof borad[y + offsetY] == 'undefined'
            || board[y + offsetY][x + offsetX]
            || x + offsetX < 0
            || y + offsetY >= ROWS
            || x + offsetX >= COLS) {
              if (offsetY == 1 && offsetX - currentX == 0 && offsetY - currentY == 1) {
                console.log('game over');
                lose = true;  
              }
              return false;
            }
      }
    }
  }
  return true;
}

// block set board
function freeze() {
  for (var y = 0; y < 4; ++y) {
    for (var x = 0; x < 4; ++x) {
      if (current[y][x]) {
        board[y + currentY][x + currentX] = current[y][x];
      }
    }
  }
}

// clearLines
function clearLines() {
  for (var y = ROWS - 1; y >= 0; --y) {
    var rowFilled = true;
    for (var x = 0; x < COLS; ++x) {
      if (borad[y][x] == 0) {
        rowFilled = false;
        break;
      }
    }

    if (rowFilled) {
      document.getElementById('clearsound').play();
      for (var yy = y; yy > 0; --yy) {
        for (var x = 0; x < COLS; ++x) {
          board[yy][x] = board[yy - 1][x];
        }
      }
      ++y;
    }
  }
}

function tick() {
  // one down
  if (valid(0, 1)) {
    ++currentY;
  } else {
    freeze(); // lock the block
    clearLines(); // remove line
    if (lose) {
      // if game over
      newGame();
      return false;
    }
    newShape();
  }
}

function newGame() {
  clearInterval(interval); //clear gameTimer
  init(); //init borad
  newShape(); //set block
  lose = false; //flag lose
  interval = setInterval(tick, 250); // call function which do tick 250millseconds
}

newGame();

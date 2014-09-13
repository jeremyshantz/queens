'use strict';

var Queen = function(n) {

    this.n = n;
    this.value_invalid = '';
    this.value_valid = 'Queen';
    this.boards = [];

    this.startX = 0;

    this.except = [];
    for(var i = 0; i < n; i++) {
        this.except[i] = [];
    }
};

Queen.prototype.tryNext = function () {

    var i = 0;

    for(i = 0; i < 2; i++) {

        var n = this.n;
        var board = this.buildBlankBoard(n);

        var x, y,
            startX = this.startX,
            matches = 0,
            self = this;

        for (x = startX; x < n; x += 1) {

            y = this.findValidY(board[x], self.except[x]);
            if (y === -1) {

            }
            else {
                self.except[x].push(y);
                var cell = board[x][y];
                matches++;
                this.cellSelected(board, x, y);
            }
        }

        var b = {
            win: matches === board.length,
            matches: matches,
            board: board
        };

        this.boards.push(b);

    }
    return b;
};

Queen.prototype.findValidY = function(row, except) {

    var i;
    for(i = 0; i < this.n; i++) {

        if (except.some(function (j) { return j === i; })) {
            continue;
        }

        if (row[i] === this.value_valid){
            return i;
        }
    }

    return -1;
};

Queen.prototype.cellSelected = function(board, x, y) {

    this.invalidateRow(board[x], y);
    this.invalidateColumn(board, y, x);
    this.invalidateDiagonalRightDown(board, x, y);
    this.invalidateDiagonalRightUp(board, x, y);
    this.invalidateDiagonalLeftDown(board, x, y);
    this.invalidateDiagonalLeftUp(board, x, y);

};

Queen.prototype.invalidateRow = function(row, y) {
    var x;
    for(x = 0; x < row.length; x+=1) {
        if (x !== y) {
            row[x] = this.value_invalid;
        }
    }
};

Queen.prototype.invalidateColumn = function(board, y, x){
    var i;
    for(i = 0; i < board.length; i+=1) {

        if (i > x) {
            board[i][y] = this.value_invalid;
        }
    }
};

Queen.prototype.invalidateDiagonalRightDown = function(board, x, y){

    x += 1;
    y += 1;

    if (x >= this.n || y >= this.n) {
        return;
    }

    board[x][y] = this.value_invalid;

    this.invalidateDiagonalRightDown(board, x, y);
};

Queen.prototype.invalidateDiagonalRightUp = function(board, x, y){

    x -= 1;
    y += 1;

    if (x < 0 || y >= this.n) {
        return;
    }

    board[x][y] = this.value_invalid;

    this.invalidateDiagonalRightDown(board, x, y);
};

Queen.prototype.invalidateDiagonalLeftDown = function(board, x, y){

    x += 1;
    y -= 1;

    if (x >= this.n || y < 0) {
        return;
    }

    board[x][y] = this.value_invalid;

    this.invalidateDiagonalLeftDown(board, x, y);
};


Queen.prototype.invalidateDiagonalLeftUp = function(board, x, y){

    x -= 1;
    y -= 1;

    if (x < 0 || y < 0) {
        return;
    }

    board[x][y] = this.value_invalid;

    this.invalidateDiagonalLeftUp(board, x, y);
};


Queen.prototype.buildBlankBoard = function(n) {
    var board = [],
        x, y;

    for(x = 0; x < n; x+=1) {
        var a =[];
        for(y = 0; y < n; y+=1) {
            a.push(this.value_valid);
        }
        board.push(a);
    }

    return board;
};

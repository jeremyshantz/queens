'use strict';

var Queen = function(n) {

    this.n = n;
    this.value_valid = 'Queen';
    this.boards = [];
    this.currentSolution = [this.n];

    this.addCurrent = function () {

        var board = this.buildBlankBoard(this.n),
            i;

        for(i = 0; i < this.n; i++) {

            board[i][this.currentSolution[i]] = this.value_valid;
        }

        var matches = this.currentSolution.filter(function(i) { return !isNaN(i) || i; }).length;

        this.boards.push({

            win: matches == this.n,
            matches: matches,
            board: board
        });
    };

    this.validLocation = function(current, row) {

        var i;

        for (i = 0; i < current; i++) {

            var prevQueen = this.currentSolution[i];

            if (prevQueen == row ||  prevQueen == row - (current - i) ||  prevQueen == row + (current - i)) {
                return false;
            }
        }

        return true;
    };
};

Queen.prototype.solve = function (x) {
    var y;

    if (x === this.n)
    {
        this.addCurrent();
    }
    else
    {
        for (y = 0; y < this.n; y++)
        {
            if (this.validLocation(x, y))
            {
                this.currentSolution[x] = y;
                this.solve(x + 1);
            }
        }
    }
}

Queen.prototype.buildBlankBoard = function(n) {
    var board = [],
        x, y;

    for(x = 0; x < n; x+=1) {
        var a =[];
        for(y = 0; y < n; y+=1) {
            a.push('');
        }
        board.push(a);
    }

    return board;
};

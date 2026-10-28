import { Ship } from './ship.js';

class Gameboard {
    constructor(board) {
        this.board = Array.from({length: 10}, () => new Array(10).fill(null));
        this.missedAttacks = [];
        this.hitAttacks = [];
    };

    placeShip(ship, [x, y]) {

        if (y + ship.length > 10) return false;
        for (let i = 0; i < ship.length; i++) {
            if(this.board[x][y + i] !== null) return false;
        };

        for (let i = 0; i < ship.length; i++) {
            this.board[x][y + i] = ship;
        };

        return true;
    };

    receiveAttack([x, y]) {

        if (this.board[x][y] !== null) {
            this.board[x][y].hit();
            this.hitAttacks.push([x, y])
        } else {
            this.missedAttacks.push([x, y]);
        }; 

    };

    isAllSunk() {
        const currentBoard = this.board;
        for (const row of currentBoard) {
            for (const cell of row) {
                if (cell !== null && !cell.isSunk()) return false;
            };
        };

        return true;
    };

};

export { Gameboard };
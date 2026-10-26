import { Gameboard } from '../dir/gameboard.js';
// import { Ship } from './ship.js';

class Player {
    constructor() {
        this.gameboard = new Gameboard;
        this.attackedCells = [];
    };

    attack(enemyBoard) {
        const x = Math.floor(Math.random() * 10);
        const y = Math.floor(Math.random() * 10);

        

        if (this.attackedCells.some(cell => 
            cell[0] === x &&
            cell[1] === y
        )) {
            return this.attack(enemyBoard);
        } else {
            this.attackedCells.push([x, y]);
            enemyBoard.receiveAttack([x, y]);
        };

    };

};


export { Player };
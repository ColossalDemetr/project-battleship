import { Gameboard } from './gameboard.js';
// import { Ship } from './ship.js';

class Player {
    constructor() {
        this.gameboard = new Gameboard;
        this.attackedCells = [];
        this.lastHit = null;
    };

    attack(enemyBoard) {
        // Randomization
        const x = Math.floor(Math.random() * 10);
        const y = Math.floor(Math.random() * 10);

        

        if (this.lastHit !== null) {
            const neighbours = [
                [this.lastHit[0]+1, this.lastHit[1]],
                [this.lastHit[0]-1, this.lastHit[1]],
                [this.lastHit[0], this.lastHit[1]+1],
                [this.lastHit[0], this.lastHit[1]-1],
            ];

            const validNeighbours = neighbours.filter(
                cell => cell[0] >= 0 &&
                cell[0] <= 9 &&
                cell[1] >= 0 &&
                cell[1] <= 9
            );

            const unattackedNeighbours = validNeighbours.filter(cell => 
                !this.attackedCells.some(attacked => 
                    attacked[0] === cell[0] &&
                    attacked[1] === cell[1])
            );

            if  (unattackedNeighbours.length > 0) {
                const random = Math.floor(Math.random() * unattackedNeighbours.length);
                const prevCount = enemyBoard.hitAttacks.length;

                enemyBoard.receiveAttack(unattackedNeighbours[random]);
                if (enemyBoard.hitAttacks.length > prevCount) {
                    this.lastHit = unattackedNeighbours[random];
                };
                this.attackedCells.push(unattackedNeighbours[random]);
            } else {
                this.lastHit = null;
                this.attack(enemyBoard);
            };

            return;
        };

        if (this.attackedCells.some(cell => 
            cell[0] === x &&
            cell[1] === y
        )) {
            return this.attack(enemyBoard);
        } else {
            this.attackedCells.push([x, y]);

            // Smart AI
            const previousHitCount = enemyBoard.hitAttacks.length;
            enemyBoard.receiveAttack([x, y]);
            if (enemyBoard.hitAttacks.length > previousHitCount) {
                this.lastHit = [x, y];
            };

            
            
        };

    };

};


export { Player };
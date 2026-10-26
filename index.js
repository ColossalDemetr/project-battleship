import { Player } from './dir/player.js';
import { Ship } from './dir/ship.js';
import { Gameboard } from './dir/gameboard.js';

const player1 = new Player;
const player2 = new Player;



const renderBoard = (board, element) => {
    
    element.innerHTML = '';

    for (const row of board) {
        for (const cell of row) {

            const newDiv = document.createElement("div");
            newDiv.classList.add('gameboard-cell');
            
            if(cell !== null) newDiv.classList.add('ship-cell');
            element.appendChild(newDiv);
        };    
    };
};

player1.gameboard.placeShip(new Ship(4), [0, 0]);
player1.gameboard.placeShip(new Ship(3), [2, 0]);


renderBoard(player1.gameboard.board, document.getElementById('player-board'));
renderBoard(player2.gameboard.board, document.getElementById('cpu-board'));


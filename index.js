import { Player } from './dir/player.js';
import { Ship } from './dir/ship.js';
import { Gameboard } from './dir/gameboard.js';

const player1 = new Player;
const player2 = new Player;



const renderBoard = (board, element) => {
    
    element.innerHTML = '';

    for (let i = 0; i < 100; i++) {
        const newDiv = document.createElement('div')
        newDiv.classList.add("gameboard-cell");
        element.appendChild(newDiv);
    };

    
};

renderBoard(player1.gameboard.board, document.getElementById('player-board'));
renderBoard(player2.gameboard.board, document.getElementById('cpu-board'));
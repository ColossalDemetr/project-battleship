import { Player } from './dir/player.js';
import { Ship } from './dir/ship.js';
import { Gameboard } from './dir/gameboard.js';

const player1 = new Player;
const player2 = new Player;



const renderBoard = (board, missedAttacks, element) => {
    
    element.innerHTML = '';

    for (let x = 0; x < 10; x++) {
        for (let y = 0; y < 10; y++) {
            const newDiv = document.createElement("div");
            newDiv.classList.add('gameboard-cell');
            newDiv.dataset.rowIndex = x;
            newDiv.dataset.cellIndex = y;
            
            if(board[x][y] !== null) newDiv.classList.add('ship-cell');

            const isMissed = missedAttacks.some(cell => cell[0] === x && cell[1] === y);
            if (isMissed) newDiv.classList.add('missed-cell');
            element.appendChild(newDiv);
        };
    };

            
  
};

player1.gameboard.placeShip(new Ship(4), [0, 0]);
player1.gameboard.placeShip(new Ship(3), [2, 0]);


renderBoard(player1.gameboard.board, player1.gameboard.missedAttacks, document.getElementById('player-board'));
renderBoard(player2.gameboard.board, player2.gameboard.missedAttacks, document.getElementById('cpu-board'));

document.getElementById('cpu-board').addEventListener('click', (e) => {
    if (!e.target.classList.contains('gameboard-cell')) return;

    const x = parseInt(e.target.dataset.rowIndex);
    const y = parseInt(e.target.dataset.cellIndex);
    // console.log(x,y)
    player2.gameboard.receiveAttack([x, y]);
    renderBoard(player2.gameboard.board, player2.gameboard.missedAttacks, document.getElementById('cpu-board'));
    player2.attack(player1.gameboard);
    renderBoard(player1.gameboard.board, player1.gameboard.missedAttacks, document.getElementById('player-board'));
});



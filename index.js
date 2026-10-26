import { Player } from './dir/player.js';
import { Ship } from './dir/ship.js';
import { Gameboard } from './dir/gameboard.js';

const player1 = new Player;
const player2 = new Player;
let gameOver = false;


const randomPlacement = (gameboard) => {
    gameboard.board = Array.from({length: 10}, () => new Array(10).fill(null));

    const ships = [5, 4, 3, 3, 2];

    for (const length of ships) {
        const newShip = new Ship(length);
        const x = Math.floor(Math.random() * 10);
        const y = Math.floor(Math.random() * 10);

        gameboard.placeShip(newShip, [x, y]);
    };
};

document.getElementById('random-btn').addEventListener('click', () => {
    randomPlacement(player1.gameboard);
    renderBoard(
        player1.gameboard.board, 
        player1.gameboard.missedAttacks, 
        player1.gameboard.hitAttacks, 
        document.getElementById('player-board')
    );

});

randomPlacement(player2.gameboard);

const renderBoard = (board, missedAttacks, attacksOnTarget, element) => {
    
    element.innerHTML = '';

    for (let x = 0; x < 10; x++) {
        for (let y = 0; y < 10; y++) {
            const newDiv = document.createElement("div");
            newDiv.classList.add('gameboard-cell');
            newDiv.dataset.rowIndex = x;
            newDiv.dataset.cellIndex = y;
            
            if(board[x][y] !== null) newDiv.classList.add('ship-cell');

            const isMissed = missedAttacks.some(cell => cell[0] === x && cell[1] === y);
            const isHit = attacksOnTarget.some(cell => cell[0] === x && cell[1] === y);

            if (isMissed) newDiv.classList.add('missed-cell');
            if (isHit) newDiv.classList.add('hit-cell');
            element.appendChild(newDiv);
        };
    };

            
  
};

// player1.gameboard.placeShip(new Ship(4), [0, 0]);
// player1.gameboard.placeShip(new Ship(3), [2, 0]);

// player2.gameboard.placeShip(new Ship(5), [8, 5]);
// player2.gameboard.placeShip(new Ship(3), [2, 5]);

document.getElementById('cpu-board').addEventListener('click', (e) => {

    if (gameOver) return;

    if (e.target.classList.contains('missed-cell') ||
        e.target.classList.contains('hit-cell')
        ) return;

    if (!e.target.classList.contains('gameboard-cell')) return;

    const x = parseInt(e.target.dataset.rowIndex);
    const y = parseInt(e.target.dataset.cellIndex);
    // console.log(x,y)
    player2.gameboard.receiveAttack([x, y]);
    renderBoard(player2.gameboard.board, player2.gameboard.missedAttacks, player2.gameboard.hitAttacks, document.getElementById('cpu-board'));
    player2.attack(player1.gameboard);
    renderBoard(player1.gameboard.board, player1.gameboard.missedAttacks, player1.gameboard.hitAttacks, document.getElementById('player-board'));


    setTimeout(() => {
        if (player1.gameboard.isAllSunk() || player2.gameboard.isAllSunk()) {
            gameOver = true;
            alert(player1.gameboard.isAllSunk() ? 'Computer wins!' : 'Player wins!');
        };
    }, 100)

});

renderBoard(player1.gameboard.board, player1.gameboard.missedAttacks, player1.gameboard.hitAttacks, document.getElementById('player-board'));
renderBoard(player2.gameboard.board, player2.gameboard.missedAttacks, player2.gameboard.hitAttacks, document.getElementById('cpu-board'));



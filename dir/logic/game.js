import { Ship } from '../classes/ship.js';
import { clearPlacement, initPlacement } from './placement.js';



export const initGame = (player1, player2, renderBoard) => {

    let gameOver = false;
    let activePlayer = player1;
    let currentPlayer = 1;
    let gameMode;


    // Game mode screen - 'One player' selection
    document.querySelector('.one-player').addEventListener('click', () => {
        gameMode = 'one-player';
        document.getElementById('modalForTwoPlayer').style.display = 'none';
        document.querySelector('.after').style.display = 'block';
    });

    // Game mode screen - 'Two players' selection
    document.querySelector('.two-players').addEventListener('click', () => {
        currentPlayer = 1;
        gameMode = 'two-players';
        document.getElementById('modalForTwoPlayer').style.display = 'none';
        document.querySelector('.after').style.display = 'block';
        document.getElementById('placeYourShipsText').textContent = 'Player 1! Place your ships 🚢🛳️';
        document.getElementById('start-btn').textContent = 'Pass to player 2';

        
    });

    // Start game after player 2 placed the ships

    // Random placement button
    const randomPlacement = (gameboard) => {
        gameboard.board = Array.from({length: 10}, () => new Array(10).fill(null));

        const ships = [5, 4, 3, 3, 2];

        for (const length of ships) {
            const newShip = new Ship(length);
            let placed = false;
            while (!placed) {
                const x = Math.floor(Math.random() * 10);
                const y = Math.floor(Math.random() * 10);
                placed = gameboard.placeShip(newShip, [x, y]);
            };


            
        };
    };

    // User attacks!!!
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
        renderBoard(player2.gameboard.board, player2.gameboard.missedAttacks, player2.gameboard.hitAttacks, document.getElementById('cpu-board'), true);
        player2.attack(player1.gameboard);
        renderBoard(player1.gameboard.board, player1.gameboard.missedAttacks, player1.gameboard.hitAttacks, document.getElementById('player-board'), false);


        setTimeout(() => {
            if (player1.gameboard.isAllSunk() || player2.gameboard.isAllSunk()) {
                gameOver = true;
                alert(player1.gameboard.isAllSunk() ? 'Computer wins!' : 'Player wins!');
            };
        }, 20);

    });


    // Random button for random placement on modal
    document.getElementById('random-btn').addEventListener('click', () => {
        randomPlacement(player1.gameboard);
        renderBoard(
            player1.gameboard.board, 
            player1.gameboard.missedAttacks, 
            player1.gameboard.hitAttacks, 
            document.getElementById('modal-board')
        );
    
    });

    // Game start function
    const startGame = (gameMode) => {
        document.querySelector('.wrapper').style.display = 'flex';
        document.getElementById('modal').style.display = 'none';
        document.getElementById('modal-overlay').style.display = 'none';
        document.getElementById('gameName').style.display = 'flex';

        if (gameMode === 'one-player') {
            renderBoard(player1.gameboard.board, player1.gameboard.missedAttacks, player1.gameboard.hitAttacks, document.getElementById('player-board'), false);
            renderBoard(player2.gameboard.board, player2.gameboard.missedAttacks, player2.gameboard.hitAttacks, document.getElementById('cpu-board'), true);
        } else {
            renderBoard(player1.gameboard.board, player1.gameboard.missedAttacks, player1.gameboard.hitAttacks, document.getElementById('player-board'), true);
            renderBoard(player2.gameboard.board, player2.gameboard.missedAttacks, player2.gameboard.hitAttacks, document.getElementById('cpu-board'), true);
        };

        
    };

    // Start button
    document.getElementById('start-btn').addEventListener('click', () => {
        // Empty ship placement
        if(player1.gameboard.board.every(row => row.every(cell => cell === null))) {
            alert('Place your ships first!');
            return;
        };
        // Pass to player 2 button
        if (currentPlayer === 1 && gameMode === 'two-players') {
            initPlacement(player2, renderBoard)
            currentPlayer = 2;
            activePlayer = player2;
            clearPlacement();
            document.getElementById('placeYourShipsText').textContent = 'Now you, Player 2! Place your ships 🚢🛳️';
            document.getElementById('start-btn').textContent = 'START TS OFF💨';
            renderBoard(player2.gameboard.board, player2.gameboard.missedAttacks, player2.gameboard.hitAttacks, document.getElementById('modal-board'), false);
            return;
        };
        // START TS OFF
        if (currentPlayer === 2 && gameMode === 'two-players') {
          startGame(gameMode);  
        };
    });

    // Clear button
    document.getElementById('clear-btn').addEventListener('click', () => {
        player1.gameboard.board = Array.from({length: 10}, () => new Array(10).fill(null));
        clearPlacement();
        renderBoard(player1.gameboard.board, player1.gameboard.missedAttacks, player1.gameboard.hitAttacks, document.getElementById('modal-board'), false);
    });


};
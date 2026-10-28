import { Ship } from '../classes/ship.js';


export const initGame = (player1, player2, renderBoard) => {

    let gameOver = false;

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

    randomPlacement(player2.gameboard);

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

    // Game start button
    document.getElementById('start-btn').addEventListener('click', () => {
        if(player1.gameboard.board.every(row => row.every(cell => cell === null))) {
            alert('Place your ships first!');
            return;
        };


        document.querySelector('.wrapper').style.display = 'flex';
        document.getElementById('modal').style.display = 'none';
        document.getElementById('modal-overlay').style.display = 'none';
        document.getElementById('gameName').style.display = 'flex';


        renderBoard(player1.gameboard.board, player1.gameboard.missedAttacks, player1.gameboard.hitAttacks, document.getElementById('player-board'), false);
        renderBoard(player2.gameboard.board, player2.gameboard.missedAttacks, player2.gameboard.hitAttacks, document.getElementById('cpu-board'), true);

    });


};
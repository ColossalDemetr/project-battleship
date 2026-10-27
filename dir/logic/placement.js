import { Ship } from "../ship.js";
import { Gameboard } from "../gameboard.js";

export const initPlacement = (player1, renderBoard) => {
    let selectedShip = null;
    const placedShip = [];

    const destroyer = document.getElementById('destroyer-btn');
    const submarine = document.getElementById('submarine-btn');
    const cruiser = document.getElementById('cruiser-btn');
    const battleship = document.getElementById('battleship-btn');
    const carrier = document.getElementById('carrier-btn');

    // 

    destroyer.addEventListener('click', () => {
        if(placedShip.some(ship => ship.name === 'destroyer')) return;
        selectedShip = { name: 'destroyer', length: 2 };
    });
    submarine.addEventListener('click', () => {
        if(placedShip.some(ship => ship.name === 'submarine')) return;
        selectedShip = { name: 'submarine', length: 3 };
    });
    cruiser.addEventListener('click', () => {
        if(placedShip.some(ship => ship.name === 'cruiser')) return;
        selectedShip = { name: 'cruiser', length: 3 };
    });
    battleship.addEventListener('click', () => {
        if(placedShip.some(ship => ship.name === 'battleship')) return;
        selectedShip = { name: 'battleship', length: 4 };
    });
    carrier.addEventListener('click', () => {
        if(placedShip.some(ship => ship.name === 'carrier')) return;
        selectedShip = { name: 'carrier', length: 5 };
    });

    // 

    document.getElementById('modal-board').addEventListener('click', (e) => {
        if (!e.target.classList.contains('gameboard-cell')) return;
        if (selectedShip === null) return;

        const x = parseInt(e.target.dataset.rowIndex);
        const y = parseInt(e.target.dataset.cellIndex);

        
        const placed = player1.gameboard.placeShip(new Ship(selectedShip.length), [x, y]);
        
        if(placed) {
            placedShip.push(selectedShip);
            console.log(placedShip);
            selectedShip = null;
            renderBoard(player1.gameboard.board, player1.gameboard.missedAttacks, player1.gameboard.hitAttacks, document.getElementById('modal-board'), false);
        };

        

        
    });
};
    
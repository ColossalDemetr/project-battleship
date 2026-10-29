import { Ship } from "../classes/ship.js";
import { Gameboard } from "../classes/gameboard.js";


const placedShip = [];

// Method for clear button
export const clearPlacement = () => {
    while (placedShip.length > 0) {
        placedShip.pop();
    };
};

export const initPlacement = (player1, renderBoard) => {

    const shipLengths = {
        carrier: 5,
        battleship: 4,
        cruiser: 3,
        submarine: 3,
        destroyer: 2
    };

    let selectedShip = null;

    const destroyer = document.getElementById('destroyer-btn');
    const submarine = document.getElementById('submarine-btn');
    const cruiser = document.getElementById('cruiser-btn');
    const battleship = document.getElementById('battleship-btn');
    const carrier = document.getElementById('carrier-btn');

    



    // Manual placement
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
            // console.log(placedShip);
            selectedShip = null;
            renderBoard(player1.gameboard.board, player1.gameboard.missedAttacks, player1.gameboard.hitAttacks, document.getElementById('modal-board'), false);
        };
        
    });

    //
    document.getElementById('modal-board').addEventListener('dragover', (e) => {
        e.preventDefault();
    });

    document.getElementById('modal-board').addEventListener('drop', (e) => {
        const shipName = e.dataTransfer.getData('text');
        const length = shipLengths[shipName];

        const x = parseInt(e.target.dataset.rowIndex);
        const y = parseInt(e.target.dataset.cellIndex);


        if (placedShip.some(ship => ship.name === shipName)) return;
        const placed = player1.gameboard.placeShip(new Ship(length), [x, y]);

        if(placed) {
            placedShip.push({ name: shipName, length });
            renderBoard(player1.gameboard.board, player1.gameboard.missedAttacks, player1.gameboard.hitAttacks, document.getElementById('modal-board'), false);
            document.getElementById(`${shipName}-btn`).classList.add('placed');
        };
    });

    // Drag&drop feature
    destroyer.addEventListener('dragstart', (e) => {
        e.dataTransfer.setData('text', 'destroyer');
    });
    submarine.addEventListener('dragstart', (e) => {
        e.dataTransfer.setData('text', 'submarine');
    });
    cruiser.addEventListener('dragstart', (e) => {
        e.dataTransfer.setData('text', 'cruiser');
    });
    battleship.addEventListener('dragstart', (e) => {
        e.dataTransfer.setData('text', 'battleship');
    });
    carrier.addEventListener('dragstart', (e) => {
        e.dataTransfer.setData('text', 'carrier');
    });





};
    
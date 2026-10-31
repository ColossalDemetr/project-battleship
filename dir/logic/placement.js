import { Ship } from "../classes/ship.js";
import { Gameboard } from "../classes/gameboard.js";
import { renderBoard } from "../ui/ui.js";


const placedShip = [];

// Method for clear button
export const clearPlacement = () => {
    while (placedShip.length > 0) {
        placedShip.pop();
        document.querySelectorAll('.ship-btn').forEach(btn => btn.classList.remove('placed'));
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
        document.querySelectorAll('.preview-redCell').forEach(cell => cell.classList.remove('preview-redCell'));
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


    // Highlight DOM when dragging the ship !!!
    let currentDragLength = 0;

    // Drag&drop feature
    destroyer.addEventListener('dragstart', (e) => {
        e.dataTransfer.setData('text', 'destroyer');
        currentDragLength = shipLengths['destroyer'];
    });
    submarine.addEventListener('dragstart', (e) => {
        e.dataTransfer.setData('text', 'submarine');
        currentDragLength = shipLengths['submarine'];
    });
    cruiser.addEventListener('dragstart', (e) => {
        e.dataTransfer.setData('text', 'cruiser');
        currentDragLength = shipLengths['cruiser'];
    });
    battleship.addEventListener('dragstart', (e) => {
        e.dataTransfer.setData('text', 'battleship');
        currentDragLength = shipLengths['battleship'];
    });
    carrier.addEventListener('dragstart', (e) => {
        e.dataTransfer.setData('text', 'carrier');
        currentDragLength = shipLengths['carrier'];
    });

    // Highlight DOM when dragging the ship !!!

    document.getElementById('modal-board').addEventListener('dragenter', (e) => {
        document.querySelectorAll('.preview-cell').forEach(cell => cell.classList.remove('preview-cell'));
        document.querySelectorAll('.preview-redCell').forEach(cell => cell.classList.remove('preview-redCell'));

        const x = parseInt(e.target.dataset.rowIndex);
        const y = parseInt(e.target.dataset.cellIndex);

        for (let i = 0; i < currentDragLength; i++) {
            if (y + i > 9) continue;
            if (y + currentDragLength - 1 > 9) {
                const cell = document.querySelector(`[data-row-index="${x}"][data-cell-index="${y + i}"]`);
                if (cell) cell.classList.add('preview-redCell');
                
                
            } else {
                const cell = document.querySelector(`[data-row-index="${x}"][data-cell-index="${y + i}"]`);
                if (cell) {
                    cell.classList.remove('preview-redCell')
                    cell.classList.add('preview-cell');
                }
            };
        };
    });

    // Remove the highlighting while leaving row/cell
    document.getElementById('modal-board').addEventListener('dragleave', (e) => {
        if (!e.currentTarget.contains(e.relatedTarget)) {
            document.querySelectorAll('.preview-cell').forEach(cell => cell.classList.remove('preview-cell'));
            document.querySelectorAll('.preview-redCell').forEach(cell => cell.classList.remove('preview-redCell'));
        }
    });
    
};
    
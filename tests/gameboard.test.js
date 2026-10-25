import { Gameboard } from '../dir/gameboard.js';
import { Ship } from '../dir/ship.js';

test ("is the placement right?", () => {
    const gameBoard = new Gameboard();
    const ship = new Ship(4);
    gameBoard.placeShip(ship, [0,0]);
    expect(gameBoard.board[0][0]).toEqual(ship);
});

test ("did the ship got hit?", () => {
    const ship = new Ship(4);
    const gameBoard = new Gameboard();
    gameBoard.placeShip(ship, [0,0]);
    gameBoard.receiveAttack([0, 0]);
    expect(ship.hits).toBe(1);
});

test ("did you really miss it?", () => {
    const ship = new Ship(4);
    const gameBoard = new Gameboard();
    gameBoard.placeShip(ship, [0,0]);
    gameBoard.receiveAttack([1, 2]);
    expect(ship.hits).toBe(0);
    expect(gameBoard.missedAttacks[0]).toEqual([1, 2]);
});

test ("do all the ships of yours were sunked?", () => {
    const ship = new Ship(4);
    const gameBoard = new Gameboard();
    gameBoard.placeShip(ship, [0,0]);
    gameBoard.receiveAttack([0,0]);
    gameBoard.receiveAttack([0,0]);
    gameBoard.receiveAttack([0,0]);
    gameBoard.receiveAttack([0,0]);
    expect(gameBoard.isAllSunk()).toBe(true);
});
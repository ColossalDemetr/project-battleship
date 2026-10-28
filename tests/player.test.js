import { Player } from '../dir/classes/player.js';
import { Gameboard } from '../dir/classes/gameboard.js';

test(`does a player has it's own gameboard?`, () => {
    const player = new Player();
    expect(player.gameboard).toBeDefined();
});

test(`can a cpu make his own calls without repeating them?`, () => {
    const computer = new Player();
    const enemyBoard = new Gameboard();

    computer.attack(enemyBoard);
    expect(enemyBoard.missedAttacks.length).toBe(1);

    computer.attack(enemyBoard);
    expect(enemyBoard.missedAttacks.length).toBe(2);
});
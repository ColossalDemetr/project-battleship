import { Player } from '../dir/player.js';

test(`does a player has it's own gameboard?`, () => {
    const player = new Player();
    expect(player.gameboard).toBeDefined();
});
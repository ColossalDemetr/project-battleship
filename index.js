import { Player } from './dir/classes/player.js';
import { initPlacement } from './dir/logic/placement.js';
import { renderBoard } from './dir/ui/ui.js';
import { initGame } from './dir/logic/game.js';

const player1 = new Player;
const player2 = new Player;

initGame(player1, player2, renderBoard);
initPlacement(player1, renderBoard);
renderBoard(player1.gameboard.board, player1.gameboard.missedAttacks, player1.gameboard.hitAttacks, document.getElementById('modal-board'), false);
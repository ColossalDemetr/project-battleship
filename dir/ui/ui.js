export const renderBoard = (board, missedAttacks, attacksOnTarget, element, hideShips = false) => {
    
    element.innerHTML = '';

    for (let x = 0; x < 10; x++) {
        for (let y = 0; y < 10; y++) {
            const newDiv = document.createElement("div");
            newDiv.classList.add('gameboard-cell');
            newDiv.dataset.rowIndex = x;
            newDiv.dataset.cellIndex = y;
            
            if (board[x][y] !== null && !hideShips) newDiv.classList.add('ship-cell');

            const isMissed = missedAttacks.some(cell => cell[0] === x && cell[1] === y);
            const isHit = attacksOnTarget.some(cell => cell[0] === x && cell[1] === y);

            if (isMissed) newDiv.classList.add('missed-cell');
            if (isHit) newDiv.classList.add('hit-cell');
            
            element.appendChild(newDiv);
        };
    };

            
  
};
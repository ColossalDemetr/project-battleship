import { Ship } from '../dir/classes/ship.js'

test ("does it have the length that's needed?", () => {
    const ship = new Ship(4);
    expect(ship.length).toBe(4);
});

test ("did it got hit?", () => {
    const ship = new Ship(4);
    ship.hit();
    expect(ship.hits).toBe(1);
});

test ("did the ship sunk?", () => {
    const ship = new Ship(3);
    ship.hit();
    ship.hit();
    ship.hit();
    ship.hit();
    expect(ship.isSunk()).toBe(true);
});
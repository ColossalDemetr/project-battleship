class Ship {
    constructor(length) {
        this.length = length;
        this.hits = 0;
    };

    isSunk() {

        if (this.length <= this.hits) {
            return true;
        };

        return false;

    };

    hit() {
        this.hits++;
    };



};

export { Ship };
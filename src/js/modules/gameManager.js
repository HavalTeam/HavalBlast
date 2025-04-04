import Map from './map.js';
import SquareBlock from './squareBlock.js';
import RectangleHorizontalBlock from './rectangleHorizontalBlock.js';
import RactangleVerticalBlock from './rectangleVerticalBlock.js';
import CubeBlock from './cubeBlock.js';
import LBlock from './LBlock.js';
import LReverseBlock from './LReverseBlock.js';
import GBlock from './GBlock.js';
import GReverseBlock from './GReverseBlock.js';

export default class GameManager {
    constructor() {
        this._map = new Map(); 
        this.selected = null;
        this._blocksClasses = [SquareBlock, RectangleHorizontalBlock, RactangleVerticalBlock, 
            CubeBlock, LBlock, LReverseBlock, GReverseBlock, GBlock];
        this._handCounter = 0;

        document.addEventListener('mousemove', (event) => {
            const x = event.clientX;
            const y = event.clientY;
            if (this.selected !== null) {
                this.selected.x = x;
                this.selected.y = y;
                this.selected.blockDiv.style.top = `${y - this.selected.sizeY / 2}px`;
                this.selected.blockDiv.style.left = `${x - this.selected.sizeX / 2}px`;
            }
        })
    }

    get handCounter() {
        return this._handCounter;
    }

    set handCounter(value) {
        this._handCounter = value;
        if (value === 0) {
            this._fillHand();
        }

    }

    start() {
        this._fillHand();
    }


    canLand(block) {
        return this._map.canPlace(block.type, block.x, block.y, block.sizeX, block.sizeY, block.blockColor);
    }

    _chooseRandomBlock() {
        return this._blocksClasses[Math.floor(Math.random() * this._blocksClasses.length)];
    }

    _fillHand() {
        for (let i = 0; i < 3; i++) {
            const constr = this._chooseRandomBlock();
            const newBlock = new constr(this);
        }
        this._handCounter = 3;
    }
}
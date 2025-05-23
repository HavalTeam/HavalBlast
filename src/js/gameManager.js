class GameManager {
    constructor() {
        this._map = new Map(); 
        this.selected = null;
        this.handBlocks = [];
        this._blocksClasses = [
            CubeBlock,
            DBlock,
            FiveColBlock,
            FiveRowBlock,
            FourColBlock,
            FourRowBlock,
            GBlock,
            GReverseBlock,
            LBlock,
            LReverseBlock,
            LeftBottomBlock,
            LeftTopBlock,
            RectangleHorizontalBlock,
            RectangleVerticalBlock,
            RightBottomBlock,
            RightTopBlock,
            RickyBlock,
            RickyReverseBlock,
            RickyReverseUpsideDownBlock,
            RickyUpsideDownBlock,
            SBlock,
            SquareBlock,
            SUpsideDownBlock,
            TBlock,
            ThreeColBlock,
            ThreeRowBlock,
            ZBlock,
            ZUpsideDownBlock
        ];
        this._handCounter = 0;
        this.score = 0;

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
        return this._map.canPlace(block, block.x, block.y, block.sizeX, block.sizeY, block.blockColor);
    }

    checkGameOver() {
        return this._map.checkGameOver(this.handBlocks);
    }

    _chooseRandomBlock() {
        return this._blocksClasses[Math.floor(Math.random() * this._blocksClasses.length)];
    }

    _fillHand() {
        for (let i = 0; i < 3; i++) {
            const constr = this._chooseRandomBlock();
            const newBlock = new constr(this);
            this.handBlocks.push(newBlock);
        }
        this._handCounter = 3;
    }

    addScore(points) {
        this.score += points;
        // Проверяем и обновляем лучший счет
        const currentHighScore = parseInt(localStorage.getItem('highScore')) || 0;
        if (this.score > currentHighScore) {
            localStorage.setItem('highScore', this.score);
        }
    }

    getScore() {
        return this.score;
    }
}
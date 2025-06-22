class Block {
    constructor(gm) {
        this.blocksContainer = document.getElementById('blocks-container');
        this.blockDiv = document.createElement('div');
        this.blockDiv.setAttribute('draggable', 'false');
        this.blockDiv.addEventListener('dragstart', e => e.preventDefault());
        this.gm = gm;

        this.x = null;
        this.y = null;

        this.blockDiv.addEventListener('mousedown', (event) => {
            this.blockDiv.style.position = 'absolute';
            this.blockDiv.style.zIndex = 2;
            this.gm.selected = this;

            const x = event.clientX;
            const y = event.clientY;
            this.x = x;
            this.y = y;
            this.blockDiv.style.top = `${y - this.sizeY / 2}px`;
            this.blockDiv.style.left = `${x - this.sizeX / 2}px`;
        });

        this.blockDiv.addEventListener('mouseup', () => {
            const landed = gm.canLand(this);
            if (landed) {
                gm.handCounter--;

                const points = this.blockDiv.children.length * 10;
                gm.addScore(points);
                
                document.getElementById('current-score').textContent = gm.getScore();

                gm.handBlocks.splice(gm.handBlocks.indexOf(this), 1);
                console.log(gm.handBlocks);
                if(gm.checkGameOver()) {
                    const gameOverPopup = document.getElementById('game-over-popup');
                    const finalScore = document.getElementById('final-score');
                    const restartBtn = document.getElementById('restart-game-btn');

                    finalScore.textContent = gm.getScore();
                    gameOverPopup.style.display = 'block';

                    restartBtn.addEventListener('click', () => {
                        window.location.reload();
                    });
                }

                setTimeout(() => {
                    this.blockDiv.remove();
                }, 1);
                
            } else {
                this.blockDiv.style.position = 'relative';
                this.blockDiv.style.top = 'auto';
                this.blockDiv.style.left = 'auto';
                this.blockDiv.style.zIndex = 1;
            }
            this.gm.selected = null;
        });
    }


    spawnBlock(amount) {
        this._addBuildingBlocks(amount);
        this.blocksContainer.appendChild(this.blockDiv);
    }


    _addBuildingBlocks(amount) {
        this.blockColors = this._getRandomColor();
        for (let i = 0; i < amount; i++) {
            const buildingBlock = document.createElement('div');
            buildingBlock.classList.add('building-block');
            
            buildingBlock.style.backgroundColor = this.blockColors.bodyColor;
            buildingBlock.style.borderBottomColor = this.blockColors.bottomBorderColor;
            buildingBlock.style.borderRightColor = this.blockColors.rightBorderColor;
            buildingBlock.style.borderLeftColor = this.blockColors.leftBorderColor;
            buildingBlock.style.borderTopColor = this.blockColors.topBorderColor;

            this.blockDiv.appendChild(buildingBlock);
        }
    }

    _getRandomColor() {
        const mainColorRGB = blockColors[Math.floor(Math.random() * blockColors.length)];
        
        const toCss = arr =>
            `rgb(${arr.map(v => Math.round(v)).join(', ')})`;

        const bodyColor = toCss(mainColorRGB);
        const bottomBorderColor = toCss(mainColorRGB.map(x => Math.max(0, x - 60)));
        const rightBorderColor = toCss(mainColorRGB.map(x => Math.max(0, x - 30)));
        const leftBorderColor = toCss(mainColorRGB.map(x => Math.min(255, x + 30)));
        const topBorderColor = toCss(mainColorRGB.map(x => Math.min(255, x + 70)));
        
        return {
            bodyColor,
            bottomBorderColor,
            rightBorderColor,
            leftBorderColor,
            topBorderColor,
        };
    }
}
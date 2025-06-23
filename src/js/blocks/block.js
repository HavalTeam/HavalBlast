class Block {
    constructor(gm, forBg = false) {
        this.gm = gm;
        this.forBg = forBg;
        this._handScale = 0.75;
        this._homeSlot = null;
        this._isAnimating = false;

        this.x = null;
        this.y = null;

        this.blockDiv = document.createElement('div');
        this.blockDiv.setAttribute('draggable', 'false');
        this.blockDiv.addEventListener('dragstart', e => e.preventDefault());

        if (!forBg) {
            this._attachEventListeners();
        } else {
            this.blocksContainer = document.getElementById('bg-blocks-container');
        }
    }


    spawnBlock(amount, handNum) {
        this._addBuildingBlocks(amount);
        
        if (this.forBg) {
            this.blocksContainer.appendChild(this.blockDiv);
            return;
        }


        const slot = document.getElementById(`slot-${handNum}`);
        this._homeSlot = slot;
        slot.appendChild(this.blockDiv);

        Object.assign(this.blockDiv.style, {
            transform: `translateY(100vh) scale(${this._handScale})`,
            opacity: '0',
            transition: 'transform 0.6s ease-out, opacity 0.6s ease-out'
        });

        this.blockDiv.getBoundingClientRect();

        requestAnimationFrame(() => {
            this.blockDiv.style.transition =
            'transform 0.5s ease-out, opacity 0.5s ease-out';

            this.blockDiv.style.transform =
            `translateY(0) scale(${this._handScale})`;
            this.blockDiv.style.opacity = '1';
        });
    }

    _attachEventListeners() {
        this.blockDiv.addEventListener('mousedown', this._onMouseDown.bind(this));
        this.blockDiv.addEventListener('mouseup',   this._onMouseUp.bind(this));
    }


    _onMouseDown(event) {
        if (this._isAnimating) {
            return;
        }

        this.blockDiv.style.transition = 'transform 0.2s ease-out';
        this.blockDiv.style.transform = 'scale(1)';
        
        this.blockDiv.style.position = 'absolute';
        this.blockDiv.style.zIndex = 2;
        this.gm.selected = this;

        this.x = event.clientX;
        this.y = event.clientY;
        this.blockDiv.style.top  = `${this.y - this.sizeY/2}px`;
        this.blockDiv.style.left = `${this.x - this.sizeX/2}px`;
    }


    _onMouseUp() {
        if (this._isAnimating) {
            return;
        }

        this._placementInfo = this.gm.canLand(this);

        if (this._placementInfo) {
            this._landToGrid(this._placementInfo.cellRect);  
        } else {
            this._returnToSlot();
        }
        this.gm.selected = null;
    }


    _landToGrid(cellRect) {
        this._isAnimating = true;

        const start = this.blockDiv.getBoundingClientRect();
        const targetLeft = cellRect.left;
        const targetTop  = cellRect.top;

        Object.assign(this.blockDiv.style, {
            position: 'absolute',
            transition: 'none',
            zIndex: 2
        });

        const anim = this.blockDiv.animate([
            { top: `${start.top}px`,  left: `${start.left}px`},
            { top: `${targetTop}px`, left: `${targetLeft}px`}
        ], {
            duration: 250,
            easing:   'ease-out',
            fill:     'forwards'
        });

        anim.onfinish = () => {
            const { coords } = this._placementInfo;
            this.gm.map.paintCells(coords, this.blockColors);
            this._placementInfo = null;

            const buildingBlocks = Array.from(this.blockDiv.children);

            const anims = buildingBlocks.map((bb, idx) =>
                bb.animate(
                [
                    { transform: 'scale(1)' },
                    { transform: 'scale(0.05)' }
                ],
                {
                    duration: 180,
                    easing:   'ease-in',
                    fill:     'forwards',
                    delay: idx * 30
                }
                )
            );

            Promise.all(anims.map(a => a.finished))
                .then(() => {
                    this._commitPlacement();
                });
        };
    }


    _commitPlacement() {
        this.gm.handBlocks.splice(this.gm.handBlocks.indexOf(this), 1);
        if (this.gm.selected === this) {
            this.gm.selected = null;
        }

        this.gm.handCounter--;
        this._updateScore();

        setTimeout(() => this.blockDiv.remove(), 1);

        if (this.gm.checkGameOver()) {
            this._showGameOver();
        }
        this._isAnimating = false;
    }


    _updateScore() {
        const points = this.blockDiv.children.length * 10;
        this.gm.addScore(points);
        document.getElementById('current-score').textContent = this.gm.getScore();
    }


    _showGameOver() {
        this.gm.gameOver();
    }


    _returnToSlot() {
        this._isAnimating = true;
        const scale = this._handScale;
        const slotRect = this._homeSlot.getBoundingClientRect();

        const sizeX = this.sizeX * scale;
        const sizeY = this.sizeY * scale;
        const targetLeft = slotRect.left + (slotRect.width  - sizeX) / 2;
        const targetTop  = slotRect.top  + (slotRect.height - sizeY) / 2;

        const startRect = this.blockDiv.getBoundingClientRect();
        const startLeft = startRect.left;
        const startTop  = startRect.top;

        Object.assign(this.blockDiv.style, {
            position:   'absolute',
            transition: 'none'
        });

        const anim = this.blockDiv.animate([
            {
                top:       `${startTop}px`,
                left:      `${startLeft}px`,
                transform: 'scale(1)'
            },
            {
                top:       `${targetTop}px`,
                left:      `${targetLeft}px`,
                transform: `scale(${scale})`
            }
        ], {
            duration: 200,
            easing:   'ease-out',
            fill:     'forwards'
        });

        anim.onfinish = () => {
            anim.cancel();
            Object.assign(this.blockDiv.style, {
                position:  'relative',
                top:       'auto',
                left:      'auto',
                transform: `scale(${scale})`
            });
            this._isAnimating = false;
        };
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
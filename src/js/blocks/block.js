class Block {
    constructor(gm, forBg = false) {
        this.gm = gm;
        this.forBg = forBg;
        this._handScale = 0.75;
        this._homeSlot = null;
        
        this.blockDiv = document.createElement('div');
        this.blockDiv.setAttribute('draggable', 'false');
        this.blockDiv.addEventListener('dragstart', e => e.preventDefault());

        if (forBg) {
            this.blocksContainer = document.getElementById('bg-blocks-container');
            return;
        }

        this.blocksContainer = document.getElementById('blocks-container');

        this.x = null;
        this.y = null;

        this.blockDiv.addEventListener('mousedown', (event) => {
            this.blockDiv.style.transition = 'transform 0.2s ease-out';
            this.blockDiv.style.transform = 'scale(1)';
            
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
                gm.handBlocks.splice(gm.handBlocks.indexOf(this), 1);
                gm.selected = null;
                gm.handCounter--;
                
                const points = this.blockDiv.children.length * 10;
                gm.addScore(points);
                document.getElementById('current-score').textContent = gm.getScore();

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




            // Плавный возврат в «домашний» слот с анимацией возврата и масштабом
    const scale = this._handScale;
    const slotRect = this.blockDiv.parentElement.getBoundingClientRect();
    const sizeX = this.sizeX * scale;
    const sizeY = this.sizeY * scale;
    const targetLeft = slotRect.left + (slotRect.width  - sizeX) / 2;
    const targetTop  = slotRect.top  + (slotRect.height - sizeY) / 2;

    const startRect = this.blockDiv.getBoundingClientRect();
    const startLeft = startRect.left;
    const startTop  = startRect.top;

    // Переводим в absolute и убираем прежний transition
    Object.assign(this.blockDiv.style, {
        position:   'absolute',
        transition: 'none'
    });

    // Запускаем анимацию Web Animations API
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
        // Отменяем animation, чтобы применить inline-стили
        anim.cancel();
        Object.assign(this.blockDiv.style, {
            position:  'relative',
            top:       'auto',
            left:      'auto',
            transform: `scale(${scale})`
        });
    };
    }




            
            this.gm.selected = null;
        });
    }


    spawnBlock(amount, handNum) {
        this._addBuildingBlocks(amount);
        
        if (this.forBg) {
            this.blocksContainer.appendChild(this.blockDiv);
            return;
        }

        Object.assign(this.blockDiv.style, {
            transform: `translateY(100vh) scale(${this._handScale})`,
            opacity: '0',
            transition: 'transform 0.6s ease-out, opacity 0.6s ease-out'
        });


        const slot = document.getElementById(`slot-${handNum}`);
        this._homeSlot = slot;
        slot.appendChild(this.blockDiv);


        requestAnimationFrame(() => {
            this.blockDiv.style.transform = `translateY(0) scale(${this._handScale})`;
            this.blockDiv.style.opacity = '1';
        });
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
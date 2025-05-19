class Block {
    constructor(gm) {
        this.blocksContainer = document.getElementById('blocks-container');
        this.blockDiv = document.createElement('div');
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
        })
    }


    spawnBlock(amount) {
        this._addBuildingBlocks(amount);
        this.blocksContainer.appendChild(this.blockDiv);
    }


    _addBuildingBlocks(amount) {
        this.blockColor = this._getRandomColor();
        for (let i = 0; i < amount; i++) {
            const buildingBlock = document.createElement('div');
            buildingBlock.classList.add('building-block');
            buildingBlock.style.backgroundColor = this.blockColor;
            this.blockDiv.appendChild(buildingBlock);
        }
    }

    _getRandomColor() {
        return `rgb(${Math.random() * 255}, ${Math.random() * 255}, ${Math.random() * 255})`
        
    }
}
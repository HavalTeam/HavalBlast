class SUpsideDownBlock extends Block {
    constructor(gm, handNum, forBg = false) {
        super(gm, forBg);
        this.type = blockType.S_UPSIDE_DOWN;
        this.sizeX = 50 * 2;
        this.sizeY = 50 * 3;

        this.blockDiv.classList.add('two-three-block');
        this.spawnBlock(4, handNum);
    }

    _addBuildingBlocks(amount) {
        super._addBuildingBlocks(amount);
        const blocks = this.blockDiv.children;
        
        blocks[0].style.gridColumn = '1';
        blocks[0].style.gridRow = '1';
        
        blocks[1].style.gridColumn = '1';
        blocks[1].style.gridRow = '2';
        
        blocks[2].style.gridColumn = '2';
        blocks[2].style.gridRow = '2';
        
        blocks[3].style.gridColumn = '2';
        blocks[3].style.gridRow = '3';
    }

    getBlockCoords(cellJ, cellI) {
        return [
            [cellJ, cellI],
            [cellJ, cellI + 1],
            [cellJ + 1, cellI + 1],
            [cellJ + 1, cellI + 2]
        ];
    }
} 
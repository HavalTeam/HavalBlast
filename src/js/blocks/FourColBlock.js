class FourColBlock extends Block {
    constructor(gm) {
        super(gm);
        this.type = blockType.FOUR_COL;
        this.sizeX = 50;
        this.sizeY = 50 * 4;

        this.blockDiv.classList.add('one-four-block');
        this.spawnBlock(4);
    }

    _addBuildingBlocks(amount) {
        super._addBuildingBlocks(amount);
        const blocks = this.blockDiv.children;
        
        blocks[0].style.gridColumn = '1';
        blocks[0].style.gridRow = '1';
        
        blocks[1].style.gridColumn = '1';
        blocks[1].style.gridRow = '2';
        
        blocks[2].style.gridColumn = '1';
        blocks[2].style.gridRow = '3';
        
        blocks[3].style.gridColumn = '1';
        blocks[3].style.gridRow = '4';
    }

    getBlockCoords(cellJ, cellI) {
        return [
            [cellJ, cellI],
            [cellJ, cellI + 1],
            [cellJ, cellI + 2],
            [cellJ, cellI + 3]
        ];
    }
} 
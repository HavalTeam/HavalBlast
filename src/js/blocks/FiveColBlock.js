class FiveColBlock extends Block {
    constructor(gm) {
        super(gm);
        this.type = blockType.FIVE_COL;
        this.sizeX = 50;
        this.sizeY = 50 * 5;

        this.blockDiv.classList.add('one-five-block');
        this.spawnBlock(5);
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
        
        blocks[4].style.gridColumn = '1';
        blocks[4].style.gridRow = '5';
    }

    getBlockCoords(cellJ, cellI) {
        return [
            [cellJ, cellI],
            [cellJ, cellI + 1],
            [cellJ, cellI + 2],
            [cellJ, cellI + 3],
            [cellJ, cellI + 4]
        ];
    }
} 
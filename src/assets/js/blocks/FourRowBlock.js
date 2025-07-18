class FourRowBlock extends Block {
    constructor(gm, handNum, forBg = false) {
        super(gm, forBg);
        this.type = blockType.FOUR_ROW;
        this.sizeX = 50 * 4;
        this.sizeY = 50;

        this.blockDiv.classList.add('four-one-block');
        this.spawnBlock(4, handNum);
    }

    _addBuildingBlocks(amount) {
        super._addBuildingBlocks(amount);
        const blocks = this.blockDiv.children;
        
        blocks[0].style.gridColumn = '1';
        blocks[0].style.gridRow = '1';
        
        blocks[1].style.gridColumn = '2';
        blocks[1].style.gridRow = '1';
        
        blocks[2].style.gridColumn = '3';
        blocks[2].style.gridRow = '1';
        
        blocks[3].style.gridColumn = '4';
        blocks[3].style.gridRow = '1';
    }

    getBlockCoords(cellJ, cellI) {
        return [
            [cellJ, cellI],
            [cellJ + 1, cellI],
            [cellJ + 2, cellI],
            [cellJ + 3, cellI]
        ];
    }
} 
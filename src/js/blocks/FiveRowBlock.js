class FiveRowBlock extends Block {
    constructor(gm, forBg = false) {
        super(gm, forBg);
        this.type = blockType.FIVE_ROW;
        this.sizeX = 50 * 5;
        this.sizeY = 50;

        this.blockDiv.classList.add('five-one-block');
        this.spawnBlock(5);
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
        
        blocks[4].style.gridColumn = '5';
        blocks[4].style.gridRow = '1';
    }

    getBlockCoords(cellJ, cellI) {
        return [
            [cellJ, cellI],
            [cellJ + 1, cellI],
            [cellJ + 2, cellI],
            [cellJ + 3, cellI],
            [cellJ + 4, cellI]
        ];
    }
} 
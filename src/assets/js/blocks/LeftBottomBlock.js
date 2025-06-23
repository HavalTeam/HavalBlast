class LeftBottomBlock extends Block {
    constructor(gm, handNum, forBg = false) {
        super(gm, forBg);
        this.type = blockType.LEFT_BOTTOM;
        this.sizeX = 50 * 3;
        this.sizeY = 50 * 3;

        this.blockDiv.classList.add('three-three-block');
        this.spawnBlock(5, handNum);
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
        
        blocks[3].style.gridColumn = '2';
        blocks[3].style.gridRow = '3';
        
        blocks[4].style.gridColumn = '3';
        blocks[4].style.gridRow = '3';
    }

    getBlockCoords(cellJ, cellI) {
        return [
            [cellJ, cellI],
            [cellJ, cellI + 1],
            [cellJ, cellI + 2],
            [cellJ + 1, cellI + 2],
            [cellJ + 2, cellI + 2]
        ];
    }
} 
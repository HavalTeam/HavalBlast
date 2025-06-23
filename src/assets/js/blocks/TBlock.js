class TBlock extends Block {
    constructor(gm, handNum, forBg = false) {
        super(gm, forBg);
        this.type = blockType.T;
        this.sizeX = 50 * 3;
        this.sizeY = 50 * 2;

        this.blockDiv.classList.add('three-two-block');
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
        
        blocks[3].style.gridColumn = '2';
        blocks[3].style.gridRow = '2';
    }

    getBlockCoords(cellJ, cellI) {
        return [
            [cellJ, cellI],
            [cellJ + 1, cellI],
            [cellJ + 2, cellI],
            [cellJ + 1, cellI + 1]
        ];
    }
} 
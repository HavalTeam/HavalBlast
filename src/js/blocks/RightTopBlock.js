class RightTopBlock extends Block {
    constructor(gm) {
        super(gm);
        this.type = blockType.RIGHT_TOP;
        this.sizeX = 50 * 3;
        this.sizeY = 50 * 3;

        this.blockDiv.classList.add('right-top-block');
        this.spawnBlock(5);
    }

    _addBuildingBlocks(amount) {
        super._addBuildingBlocks(amount);
        const blocks = this.blockDiv.children;
        
        // Располагаем блоки в форме буквы Г
        blocks[0].style.gridColumn = '1';
        blocks[0].style.gridRow = '1';
        
        blocks[1].style.gridColumn = '2';
        blocks[1].style.gridRow = '1';
        
        blocks[2].style.gridColumn = '3';
        blocks[2].style.gridRow = '1';
        
        blocks[3].style.gridColumn = '3';
        blocks[3].style.gridRow = '2';
        
        blocks[4].style.gridColumn = '3';
        blocks[4].style.gridRow = '3';
    }

    getBlockCoords(cellJ, cellI) {
        return [
            [cellJ, cellI],
            [cellJ + 1, cellI],
            [cellJ + 2, cellI],
            [cellJ + 2, cellI + 1],
            [cellJ + 2, cellI + 2]
        ];
    }
}
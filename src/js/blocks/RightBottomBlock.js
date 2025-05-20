class RightBottomBlock extends Block {
    constructor(gm) {
        super(gm);
        this.type = blockType.RIGHT_BOTTOM;
        this.sizeX = 50 * 3;
        this.sizeY = 50 * 3;

        this.blockDiv.classList.add('right-bottom-block');
        this.spawnBlock(5);
    }

    _addBuildingBlocks(amount) {
        super._addBuildingBlocks(amount);
        const blocks = this.blockDiv.children;
        
        // Располагаем блоки в форме перевернутой буквы Г
        blocks[0].style.gridColumn = '3';
        blocks[0].style.gridRow = '1';
        
        blocks[1].style.gridColumn = '3';
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
            [cellJ + 2, cellI],
            [cellJ + 2, cellI + 1],
            [cellJ, cellI + 2],
            [cellJ + 1, cellI + 2],
            [cellJ + 2, cellI + 2]
        ];
    }
} 
class ThreeColBlock extends Block {
    constructor(gm) {
        super(gm);
        this.type = blockType.THREE_COL;
        this.sizeX = 50;
        this.sizeY = 50 * 3;

        this.blockDiv.classList.add('three-col-block');
        this.spawnBlock(3);
    }

    _addBuildingBlocks(amount) {
        super._addBuildingBlocks(amount);
        const blocks = this.blockDiv.children;
        
        // Располагаем блоки вертикально
        blocks[0].style.gridColumn = '1';
        blocks[0].style.gridRow = '1';
        
        blocks[1].style.gridColumn = '1';
        blocks[1].style.gridRow = '2';
        
        blocks[2].style.gridColumn = '1';
        blocks[2].style.gridRow = '3';
    }

    getBlockCoords(cellJ, cellI) {
        return [
            [cellJ, cellI],
            [cellJ, cellI + 1],
            [cellJ, cellI + 2]
        ];
    }
} 
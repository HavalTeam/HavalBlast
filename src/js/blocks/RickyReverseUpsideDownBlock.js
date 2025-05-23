class RickyReverseUpsideDownBlock extends Block {
    constructor(gm) {
        super(gm);
        this.type = blockType.RICKY_REVERSE_UPSIDE_DOWN;
        this.sizeX = 50 * 3;
        this.sizeY = 50 * 2;

        this.blockDiv.classList.add('ricky-reverse-upside-down-block');
        this.spawnBlock(4);
    }

    _addBuildingBlocks(amount) {
        super._addBuildingBlocks(amount);
        const blocks = this.blockDiv.children;
        
        // Располагаем блоки в форме перевернутой буквы R
        blocks[0].style.gridColumn = '1';
        blocks[0].style.gridRow = '1';
        
        blocks[1].style.gridColumn = '2';
        blocks[1].style.gridRow = '1';
        
        blocks[2].style.gridColumn = '3';
        blocks[2].style.gridRow = '1';
        
        blocks[3].style.gridColumn = '1';
        blocks[3].style.gridRow = '2';
    }

    getBlockCoords(cellJ, cellI) {
        return [
            [cellJ, cellI],
            [cellJ + 1, cellI],
            [cellJ + 2, cellI],
            [cellJ, cellI + 1]
        ];
    }
} 
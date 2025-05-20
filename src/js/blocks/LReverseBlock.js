class LReverseBlock extends Block {
    constructor(gm) {
        super(gm);
        this.type = blockType.L_REVERSE;
        this.sizeX = 50 * 2;
        this.sizeY = 50 * 3;
        
        this.blockDiv.classList.add('l-reverse-block')
        this.spawnBlock(4);
    }

    getBlockCoords(cellJ, cellI) {
        return [
            [cellJ + 1, cellI],
            [cellJ + 1, cellI + 1],
            [cellJ, cellI + 2],
            [cellJ + 1, cellI + 2]
        ];
    }
}
class LReverseBlock extends Block {
    constructor(gm, handNum, forBg = false) {
        super(gm, forBg);
        this.type = blockType.L_REVERSE;
        this.sizeX = 50 * 2;
        this.sizeY = 50 * 3;
        
        this.blockDiv.classList.add('l-block', 'reverse')
        this.spawnBlock(4, handNum);
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
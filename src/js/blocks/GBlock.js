class GBlock extends Block {
    constructor(gm, forBg = false) {
        super(gm, forBg);
        this.type = blockType.G;
        this.sizeX = 50 * 2;
        this.sizeY = 50 * 3;
        
        this.blockDiv.classList.add('g-block')
        this.spawnBlock(4);
    }

    getBlockCoords(cellJ, cellI) {
        return [
            [cellJ, cellI],
            [cellJ + 1, cellI],
            [cellJ, cellI + 1],
            [cellJ, cellI + 2]
        ];
    }
}
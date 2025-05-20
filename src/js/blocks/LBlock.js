class LBlock extends Block {
    constructor(gm) {
        super(gm);
        this.type = blockType.L;
        this.sizeX = 50 * 2;
        this.sizeY = 50 * 3;
        
        this.blockDiv.classList.add('l-block')
        this.spawnBlock(4);
    }

    getBlockCoords(cellJ, cellI) {
        return [
            [cellJ, cellI],
            [cellJ, cellI + 1],
            [cellJ, cellI + 2],
            [cellJ + 1, cellI + 2]
        ];
    }
}
class GReverseBlock extends Block {
    constructor(gm) {
        super(gm);
        this.type = blockType.G_REVERSE;
        this.sizeX = 50 * 2;
        this.sizeY = 50 * 3;
        
        this.blockDiv.classList.add('g-block', 'reverse');
        this.spawnBlock(4);
    }

    getBlockCoords(cellJ, cellI) {
        return [
            [cellJ, cellI],
            [cellJ + 1, cellI],
            [cellJ + 1, cellI + 1],
            [cellJ + 1, cellI + 2]
        ];
    }
}
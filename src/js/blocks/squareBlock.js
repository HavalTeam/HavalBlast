class SquareBlock extends Block {
    constructor(gm, forBg = false) {
        super(gm, forBg);
        this.type = blockType.SQUARE;
        this.sizeX = 50 * 2;
        this.sizeY = 50 * 2;

        this.blockDiv.classList.add('square-block')
        this.spawnBlock(4);
    }

    getBlockCoords(cellJ, cellI) {
        return [
            [cellJ, cellI],
            [cellJ + 1, cellI],
            [cellJ, cellI + 1],
            [cellJ + 1, cellI + 1]
        ];
    }
}
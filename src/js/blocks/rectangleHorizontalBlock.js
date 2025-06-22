class RectangleHorizontalBlock extends Block {
    constructor(gm, forBg = false) {
        super(gm, forBg);
        this.type = blockType.RECTANGLE_HORIZONTAL;
        this.sizeX = 50 * 3;
        this.sizeY = 50 * 2;
        
        this.blockDiv.classList.add('rectangle-horizontal-block')
        this.spawnBlock(6);
    }

    getBlockCoords(cellJ, cellI) {
        return [
            [cellJ, cellI],
            [cellJ + 1, cellI],
            [cellJ + 2, cellI],
            [cellJ, cellI + 1],
            [cellJ + 1, cellI + 1],
            [cellJ + 2, cellI + 1]
        ];
    }
}
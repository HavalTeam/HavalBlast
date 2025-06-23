class RectangleVerticalBlock extends Block {
    constructor(gm, handNum, forBg = false) {
        super(gm, forBg);
        this.type = blockType.RECTANGLE_VERTICAL;
        this.sizeX = 50 * 2;
        this.sizeY = 50 * 3;
        
        this.blockDiv.classList.add('rectangle-vertical-block')
        this.spawnBlock(6, handNum);
    }

    getBlockCoords(cellJ, cellI) {
        return [
            [cellJ, cellI],
            [cellJ + 1, cellI],
            [cellJ, cellI + 1],
            [cellJ + 1, cellI + 1],
            [cellJ, cellI + 2],
            [cellJ + 1, cellI + 2]
        ];
    }
}
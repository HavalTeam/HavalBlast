class CubeBlock extends Block {
    constructor(gm, handNum, forBg = false) {
        super(gm, forBg);
        this.type = blockType.CUBE;
        this.sizeX = 50 * 3;
        this.sizeY = 50 * 3;
        
        this.blockDiv.classList.add('cube-block')
        this.spawnBlock(9, handNum);
    }

    getBlockCoords(cellJ, cellI) {
        return [
            [cellJ, cellI],
            [cellJ + 1, cellI],
            [cellJ + 2, cellI],
            [cellJ, cellI + 1],
            [cellJ + 1, cellI + 1],
            [cellJ + 2, cellI + 1],
            [cellJ, cellI + 2],
            [cellJ + 1, cellI + 2],
            [cellJ + 2, cellI + 2]
        ];
    }
}
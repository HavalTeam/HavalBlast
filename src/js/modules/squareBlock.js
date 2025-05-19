class SquareBlock extends Block {
    constructor(gm) {
        super(gm);
        this.type = blockType.SQUARE;
        this.sizeX = 50 * 2;
        this.sizeY = 50 * 2;

        this.blockDiv.classList.add('square-block')
        this.spawnBlock(4);



        this.blockDiv.addEventListener('mouseup', () => {
            const landed = gm.canLand(this);
            if (landed) {
                gm.handCounter--;
                setTimeout(() => {
                    this.blockDiv.remove();

                }, 1);
            } else {
                this.blockDiv.style.position = 'relative';
                this.blockDiv.style.top = 'auto';
                this.blockDiv.style.left = 'auto';
                this.blockDiv.style.zIndex = 1;
            }
            this.gm.selected = null;
        })
    }
}
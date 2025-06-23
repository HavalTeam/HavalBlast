const blockType = Object.freeze({
    SQUARE: 'square',
    RECTANGLE_HORIZONTAL: 'rectangleHorizontal',
    RECTANGLE_VERTICAL: 'rectangleVertical',
    CUBE: 'cube',
    L: 'l',
    L_REVERSE: 'lReverse',
    G: 'g',
    G_REVERSE: 'gReverse',
    D: 'd',
    T: 't',
    RICKY: 'ricky',
    RICKY_REVERSE: 'rickyReverse',
    RICKY_UPSIDE_DOWN: 'rickyUpsideDown',
    RICKY_REVERSE_UPSIDE_DOWN: 'rickyReverseUpsideDown',
    Z: 'z',
    S: 's',
    Z_UPSIDE_DOWN: 'zUpsideDown',
    S_UPSIDE_DOWN: 'sUpsideDown',
    LEFT_BOTTOM: 'leftBottom',
    RIGHT_BOTTOM: 'rightBottom',
    LEFT_TOP: 'leftTop',
    RIGHT_TOP: 'rightTop',
    THREE_COL: 'threeCol',
    FOUR_COL: 'fourCol',
    FIVE_COL: 'fiveCol',
    THREE_ROW: 'threeRow',
    FOUR_ROW: 'fourRow',
    FIVE_ROW: 'fiveRow',
})

const blockColors = [
    [160, 0, 241],
    [1, 0, 242],
    [240, 1, 2],
    [249, 230, 9],
    [2, 241, 1],
    [239, 130, 1],
    [2, 241, 243],
]

blockColors.forEach(arr => Object.freeze(arr));
Object.freeze(blockColors);
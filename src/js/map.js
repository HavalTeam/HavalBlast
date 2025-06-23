class Map {
    constructor() {
        this._cellsStateMatrix = [];
        this.grid = document.getElementById('grid-container');
        for (let i = 0; i < 8; i++) {
            const row = [];
            for (let j = 0; j < 8; j++) {
                const cell = document.createElement('div');
                cell.classList.add('grid-item');
                cell.id = `cell-${j}-${i}`;
                this.grid.appendChild(cell);
                row.push(0);
            }
            this._cellsStateMatrix.push(row);
        }
    }
    

    canPlace(block, x, y, sizeX, sizeY) {
        const [cellRect, j, i] = this._findNearestCell(x, y, sizeX, sizeY);
        if (!cellRect) {
            return null;
        }

        const coords = block.getBlockCoords(j, i);
        return this._checkEmptyPlace(coords) ? { cellRect, coords } : null;
    }

    paintCells(coords, colors) {
        for (const [j, i] of coords) {
            this._occupyCell(j, i, colors);
        }
        this._clearIfCan();
    }

    checkGameOver(handBlocks) {
        for (let i = 0; i < 8; i++) {
            for (let j = 0; j < 8; j++) {
                for (let handBlock of handBlocks) {
                    const cords = handBlock.getBlockCoords(j, i);
                    if (this._checkEmptyPlace(cords)) {
                        return false;
                    }
                }
            }
        }
        return true;
    }

    _findNearestCell(x, y, sizeX, sizeY) {
        const range = 50;
        let nearestCellRect = null;
        let minD = 1e5;
        let [nearestJ, nearestI] = [-1, -1];
        for (let i = 0; i < 8; i++) {
            for (let j = 0; j < 8; j++) {
                const cell = document.getElementById(`cell-${j}-${i}`);
                const cellRect = cell.getBoundingClientRect();
                const d = Math.sqrt(Math.pow(x - cellRect.x - sizeX / 2, 2) + Math.pow(y - cellRect.y - sizeY / 2, 2));
                if (d < minD && d < range) {
                    minD = d;
                    nearestCellRect = cellRect;
                    [nearestJ, nearestI] = [j, i];
                }
            }
        }
        return [nearestCellRect, nearestJ, nearestI];
    }


    _checkEmptyPlace(coords) {
        for (let [x, y] of coords) {
            if (x <= -1 || y <= -1 || 
                x >= 8 || y >= 8 || 
                this._cellsStateMatrix[y][x] === 1) {
                return false;
            }
        }
        return true;
    }

    
    _occupyCell(x, y, colors) {
        this._cellsStateMatrix[y][x] = 1;
        const cell = document.getElementById(`cell-${x}-${y}`);
        cell.style.borderWidth = '10px';
        cell.classList.add('building-block-grid');

        cell.style.backgroundColor = colors.bodyColor;
        cell.style.borderBottomColor = colors.bottomBorderColor;
        cell.style.borderRightColor = colors.rightBorderColor;
        cell.style.borderLeftColor = colors.leftBorderColor;
        cell.style.borderTopColor = colors.topBorderColor;

    }


    _clearIfCan() {
        const toClear = this._checkFilledLines();
        if (toClear.length === 0) {
            return;
        }
        
        for (let [x, y] of toClear) {
            this._cellsStateMatrix[y][x] = 0;
            const cell = document.getElementById(`cell-${x}-${y}`);
            cell.style.backgroundColor = 'rgb(30, 42, 77)';

            setTimeout(() => {
                cell.classList.remove('building-block-grid');
                cell.style.borderWidth = '1px';
                cell.style.borderColor = 'rgba(0, 0, 0, 0.266)';
            }, 100);
        }

    }


    _checkFilledLines() {
        let toClear = [];
        for (let i = 0; i < 8; i++) {
            if (this._cellsStateMatrix[i].filter(x => x === 1).length === 8) {
                
                toClear = toClear.concat(Array.from({length: 8}, (_, idx) => [idx, i]));

            }
        }

        for (let j = 0; j < 8; j++) {
            let colCount = 0;
            for (let i = 0; i < 8; i++) {
                if (this._cellsStateMatrix[i][j] === 1) {
                    colCount++;
                } 
            }
            if (colCount === 8) {
                toClear = toClear.concat(Array.from({length: 8}, (_, idx) => [j, idx]));
            }
        }

        return toClear;
    }
}
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
    

    canPlace(block, x, y, sizeX, sizeY, color) {
        const [nearestCellRect, cellJ, cellI] = this._findNearestCell(x, y, sizeX, sizeY);
        if (nearestCellRect === null) {
            return false;
        }
        
        const coords = block.getBlockCoords(cellJ, cellI);
        return this._placedBlock(block, coords, color);
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

    _placedBlock(block, coords, color) {
        if (this._checkEmptyPlace(coords)) {
            for (let [j, i] of coords) {
                this._occupyCell(j, i, color);
            }
            this._clearIfCan();
            return true;
        } else {
            return false;
        }
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

    
    _occupyCell(x, y, color) {
        this._cellsStateMatrix[y][x] = 1;
        const cell = document.getElementById(`cell-${x}-${y}`);
        cell.classList.add('building-block-grid');
        cell.style.backgroundColor = color;
    }


    _clearIfCan() {
        const toClear = this._checkFilledLines();
        if (toClear.length === 0) {
            return;
        }
        
        for (let [x, y] of toClear) {
            this._cellsStateMatrix[y][x] = 0;
            document.getElementById(`cell-${x}-${y}`).style.backgroundColor = 'rgb(30, 42, 77)';
            setTimeout(() => {
                document.getElementById(`cell-${x}-${y}`).classList.remove('building-block-grid');
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
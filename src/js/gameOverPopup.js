class GameOverPopup {
    constructor(gm) {
        this.gm = gm
        this.popup = document.getElementById('game-over-popup');
    }


    showPopup() {
        setTimeout(() => {
            this._popupSetup();
            this.popup.classList.add('show');
        }, 1000);
    }

    
    _popupSetup() {
        document.getElementById('final-score-num').textContent = this.gm.getScore();
        document.getElementById('best-score-num').textContent = this.gm.getBestScore();
        document.getElementById('restart-game-btn')
            .addEventListener('click', () => window.location.reload());
        document.getElementById('go-to-menu-btn')
            .addEventListener('click', () => window.location.href = 'index.html');
    }
}
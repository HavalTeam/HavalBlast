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



        const nameDisplay = document.getElementById('current-user-name');
        const nameForm = document.getElementById('user-name-form');
        const nameInput = document.getElementById('user-name-input');


        nameForm.addEventListener('submit', e => {
            e.preventDefault();
            const name = nameInput.value.trim();
            if (!name) {
                nameInput.classList.add('error');
                nameInput.addEventListener('animationend', () => {
                    nameInput.classList.remove('error');
                }, { once: true });
                return;
            }

            fetch('/api/users/addUser', {
                method: 'PUT',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({name: name, record: this.gm.getScore()}),
            }).then(response => {})
            nameDisplay.textContent = name;

        });
    }
}
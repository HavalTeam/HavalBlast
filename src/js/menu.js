document.addEventListener('DOMContentLoaded', () => {
    const startGameBtn = document.querySelector('.start-game-btn');
    const recordsBtn = document.querySelector('.records-btn');
    const recordsPopup = document.getElementById('records-popup');
    const helpBtn = document.querySelector('.help-btn');
    const helpPopup = document.getElementById('help-popup');
    const closePopupBtns = document.querySelectorAll('.close-popup');
    const highScoreElement = document.getElementById('high-score');

    const nameDisplay = document.getElementById('current-user-name');
    const nameForm = document.getElementById('user-name-form');
    const nameInput = document.getElementById('user-name-input');

    const savedName = localStorage.getItem('userName') || '';
    let preventStart;
    if (savedName) {
        nameDisplay.textContent = savedName;
        preventStart = false;
    } else {
        nameDisplay.textContent = '';
        preventStart = true;
    }


    const highScore = localStorage.getItem('highScore') || 0;
    highScoreElement.textContent = highScore;


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

        localStorage.setItem('userName', name);
        nameDisplay.textContent = name;
        preventStart = false;
    });


    startGameBtn.addEventListener('click', () => {
        if (preventStart) {
            nameInput.classList.add('error');
            nameInput.addEventListener('animationend', () => {
                nameInput.classList.remove('error');
            }, { once: true });
            return;
        }

        window.location.href = 'game.html';
    });

    recordsBtn.addEventListener('click', () => {
        recordsPopup.classList.add('show');
    });

    helpBtn.addEventListener('click', () => {
        helpPopup.classList.add('show');
    });

    closePopupBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            helpPopup.classList.remove('show');
            recordsPopup.classList.remove('show');
        });
    });
    
    window.gm = new GameManager(forBg = true);
});
document.addEventListener('DOMContentLoaded', () => {
    const startGameBtn = document.querySelector('.start-game-btn');
    const statBtn = document.querySelector('.stat-btn');
    const helpBtn = document.querySelector('.help-btn');
    const helpPopup = document.getElementById('help-popup');
    const recordsPopup = document.getElementById('records-popup');
    const closePopupBtns = document.querySelectorAll('.close-popup');
    const highScoreElement = document.getElementById('high-score');

    // Загружаем лучший счет из localStorage
    const highScore = localStorage.getItem('highScore') || 0;
    highScoreElement.textContent = highScore;

    startGameBtn.addEventListener('click', () => {
        window.location.href = 'gamePage.html';
    });

    statBtn.addEventListener('click', () => {
        recordsPopup.style.display = 'block';
    });

    helpBtn.addEventListener('click', () => {
        helpPopup.style.display = 'block';
    });

    // Закрытие pop-up окон
    closePopupBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            helpPopup.style.display = 'none';
            recordsPopup.style.display = 'none';
        });
    });

    window.addEventListener('click', (event) => {
        if (event.target === helpPopup) {
            helpPopup.style.display = 'none';
        }
        if (event.target === recordsPopup) {
            recordsPopup.style.display = 'none';
        }
    });
});
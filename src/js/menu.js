document.addEventListener('DOMContentLoaded', () => {
    const startGameBtn = document.querySelector('.start-game-btn');
    const recordsBtn = document.querySelector('.records-btn');
    const recordsPopup = document.getElementById('records-popup');
    const helpBtn = document.querySelector('.help-btn');
    const helpPopup = document.getElementById('help-popup');
    const closePopupBtns = document.querySelectorAll('.close-popup');
    const highScoreElement = document.getElementById('high-score');


    const highScore = localStorage.getItem('highScore') || 0;
    highScoreElement.textContent = highScore;

    startGameBtn.addEventListener('click', () => {
        window.location.href = 'game';
    });

    recordsBtn.addEventListener('click', () => {
        recordsPopup.style.display = 'block';
    });

    helpBtn.addEventListener('click', () => {
        helpPopup.style.display = 'block';
    });

    closePopupBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            helpPopup.style.display = 'none';
            recordsPopup.style.display = 'none';
        });
    });
    
});
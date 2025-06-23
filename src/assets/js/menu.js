document.addEventListener('DOMContentLoaded', async () => {
    const startGameBtn = document.querySelector('.start-game-btn');
    const recordsBtn = document.querySelector('.records-btn');
    const recordsPopup = document.getElementById('records-popup');
    const helpBtn = document.querySelector('.help-btn');
    const helpPopup = document.getElementById('help-popup');
    const closePopupBtns = document.querySelectorAll('.close-popup');
    const nameDisplay = document.getElementById('current-user-name');
    const savedName = localStorage.getItem('userName') || '';
    const leaderboardEl = document.getElementById('leaderboard');
    const userRecordEl = document.getElementById('user-record');
    const highScore = localStorage.getItem('highScore') || 0;


    const topRecords = await (await fetch('/api/users/top10', {
        method: 'GET',
        headers: {'Content-Type': 'application/json'}
    })).json();

    topRecords.forEach((record, index) => {
        const li = document.createElement('li');
        li.textContent = `${record.name} — ${record.record}`;
        leaderboardEl.appendChild(li);
    });

    userRecordEl.textContent = `Ваш рекорд: ${highScore}`;


    startGameBtn.addEventListener('click', () => {
        window.location.href = '/game';
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

    window.gm = new GameManager(true);
    document.dispatchEvent(new Event('gm:ready'));
});
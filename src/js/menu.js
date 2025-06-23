document.addEventListener('DOMContentLoaded', async () => {
    const startGameBtn = document.querySelector('.start-game-btn');
    const recordsBtn = document.querySelector('.records-btn');
    const recordsPopup = document.getElementById('records-popup');
    const helpBtn = document.querySelector('.help-btn');
    const helpPopup = document.getElementById('help-popup');
    const closePopupBtns = document.querySelectorAll('.close-popup');
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

    if (savedName) {
        const userScore = await (await fetch('/api/users/getRecord', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name: savedName })
            })
        ).json();

        const userPlace = await (await fetch('/api/users/getRank', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name: savedName })
            })
        ).json();

        userRecordEl.textContent =
            `Ваше место: ${userPlace.rank}  Ваш рекорд: ${userScore.record}`;
    }


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

    window.gm = new GameManager(true);
    document.dispatchEvent(new Event('gm:ready'));
});
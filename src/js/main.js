const gm = new GameManager();

const userName = localStorage.getItem('userName') || undefined;
fetch('/api/users/addUser', {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({name: userName}),
}).then(response => {console.log("aboba")})

document.dispatchEvent(new Event('gm:ready'));
gm.start();
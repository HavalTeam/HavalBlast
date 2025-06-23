const express = require('express');
const app = express();
const path = require('path');

const PORT = process.env.PORT || 3000;

app.use('/assets', express.static(path.join(__dirname, 'src', 'assets')));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'src', 'index.html'));
});

app.get('/game', (req, res) => {
    res.sendFile(path.join(__dirname, 'src', 'game.html'));
});
app.use(express.json())
app.use('/api/users', require('./routes/users'));

app.listen(PORT, () => {
    console.log(`Сервер запущен: http://localhost:${PORT}`);
});

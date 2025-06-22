const express = require('express');
const app = express();
const path = require('path');

const PORT = process.env.PORT || 3000;

app.use(express.static(path.join(__dirname, 'src'), {
    extensions: ['html']
}));
app.use(express.json())
app.use('/api/users', require('./routes/users'));

app.listen(PORT, () => {
    console.log(`Сервер запущен: http://localhost:${PORT}`);
});

const express = require('express');
const router = express.Router();
const {
    createUserWithRecord,
    getTop10,
    getRecordByName,
    getUserRank,
} = require('../queries');

router.put('/addUser', async (req, res) => {
    try {
        const { name, record } = req.body;
        if (!name || !record) {
            return res.status(400).json({ error: 'Name and record is required' });
        }
        const user = await createUserWithRecord(name, record);
        res.json(user);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Server error' });
    }
});

router.get('/top10', async (req, res) => {
    const list = await getTop10();
    res.json(list);
});

router.post('/getRecord', async (req, res) => {
    try {
        const { name } = req.body;
        if (!name) {
            return res.status(400).json({ error: 'Name is required' });
        }
        const record = await getRecordByName(name);
        if (record === null) {
            return res.status(404).json({ error: 'User not found or record is null' });
        }
        res.json({ name, record });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Server error' });
    }
});

router.post('/getRank', async (req, res) => {
    try {
        const { name } = req.body;
        if (!name) {
            return res.status(400).json({ error: 'Name is required' });
        }
        const rank = await getUserRank(name);
        if (rank === null) {
            return res.status(404).json({ error: 'User not found or record is null' });
        }
        res.json({ name, rank });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Server error' });
    }
});

module.exports = router;
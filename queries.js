const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: String(process.env.DB_NAME),
    password: String(process.env.DB_PASS),
    port: process.env.DB_PORT || 5432
});

async function createUser(name) {
    const text = 'INSERT INTO users(name) VALUES($1) RETURNING *';
    const values = [name];
    const res = await pool.query(text, values);
    return res.rows[0];
}

async function addRecordToUser(name, record) {
    const text = `UPDATE users SET record = $1 WHERE name = $2 RETURNING *`;
    const values = [record, name];
    const res = await pool.query(text, values);
    return res.rows[0];
}

async function getTop10() {
    const text = `
    SELECT * FROM users
    WHERE record IS NOT NULL
    ORDER BY record DESC
    LIMIT 10
  `;
    const res = await pool.query(text);
    return res.rows;
}

async function getRecordByName(name) {
    const text = 'SELECT record FROM users WHERE name = $1';
    const res = await pool.query(text, [name]);
    return res.rows[0]?.record || null;
}

async function getUserRank(name) {
    const text = `
    SELECT rank FROM (
      SELECT name,
             record,
             RANK() OVER (ORDER BY record DESC) AS rank
      FROM users
      WHERE record IS NOT NULL
    ) sub
    WHERE name = $1
  `;
    const res = await pool.query(text, [name]);
    return res.rows[0]?.rank || null;
}

module.exports = {
    createUser,
    addRecordToUser,
    getTop10,
    getRecordByName,
    getUserRank,
};
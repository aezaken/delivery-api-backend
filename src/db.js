const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_DATABASE,
    password: process.env.DB_PASSWORD,
    port: parseInt(process.env.DB_PORT), // Порт должен быть числом
});

pool.on('error', (err, client) => {
    console.error('Неожиданная ошибка в пуле БД:', err);
});

module.exports = {
    query: (text, params) => pool.query(text, params),
    pool
};
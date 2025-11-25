const express = require('express');
const db = require('./db');
const app = express();
const port = 3000;

// Middleware для обработки JSON запросов от Flutter
app.use(express.json());

app.use((req, res, next) => {
    console.log(`[REQUEST] Method: ${req.method}, URL: ${req.url}`);
    next(); // Продолжаем выполнение запроса
});


app.get('/', (req, res) => {
    res.send('API Server for Delivery App is running!');
});


app.get('/api/test-db-time', async (req, res) => {
    try {
        const result = await db.query('SELECT NOW() AS now_time');
        res.json({
            message: 'Database connected successfully!',
            time: result.rows[0].now_time
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Database connection failed' });
    }
});

app.listen(port, () => {
    console.log(`Йоу здарова! http://localhost:${port}`);
});

db.pool.connect()
    .then(client => {
        console.log('--- УСПЕШНОЕ ПОДКЛЮЧЕНИЕ К POSTGRESQL! ---');
        client.release();
    })
    .catch(err => console.error('--- ОШИБКА ПОДКЛЮЧЕНИЯ К БД:', err.stack));
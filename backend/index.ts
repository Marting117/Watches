// index.ts
import express, { Request, Response } from 'express';
import bodyParser from 'body-parser';
import mysql from 'mysql2/promise';

const app = express();
const PORT = process.env.PORT || 3005;

// Middleware
app.use(bodyParser.json());

// MySQL connection pool
const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: '', // Replace with your MySQL password
    database: 'watches', // Replace with your database name
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

// Routes
app.get('/watches', async (req: Request, res: Response) => {
    try {
        const connection = await pool.getConnection();
        const [rows] = await connection.query('SELECT * FROM watches');
        connection.release();
        res.json(rows);
    } catch (error) {
        console.error('Error fetching watches:', error);
        res.status(500).json({ error: 'Error fetching watches' });
    }
});

app.post('/watches', async (req: Request, res: Response) => {
    const { brand, model, price, image } = req.body;
    try {
        const connection = await pool.getConnection();
        await connection.query('INSERT INTO watches (brand, model, price) VALUES (?, ?, ?)', [brand, model, price]);
        connection.release();
        res.status(201).json({ message: 'Watch added successfully' });
    } catch (error) {
        console.error('Error adding watch:', error);
        res.status(500).json({ error: 'Error adding watch' });
    }
});

app.put('/watches/:id', async (req: Request, res: Response) => {
    const watchId = req.params.id;
    const { brand, model, price } = req.body; // Remove image
    try {
        const connection = await pool.getConnection();
        await connection.query('UPDATE watches SET brand = ?, model = ?, price = ? WHERE id = ?', [brand, model, price, watchId]); // Remove image
        connection.release();
        res.json({ message: 'Watch updated successfully' });
    } catch (error) {
        console.error('Error updating watch:', error);
        res.status(500).json({ error: 'Error updating watch' });
    }
});

app.delete('/watches/:id', async (req: Request, res: Response) => {
    const watchId = req.params.id;
    try {
        const connection = await pool.getConnection();
        await connection.query('DELETE FROM watches WHERE id = ?', [watchId]);
        connection.release();
        res.json({ message: 'Watch deleted successfully' });
    } catch (error) {
        console.error('Error deleting watch:', error);
        res.status(500).json({ error: 'Error deleting watch' });
    }
});

// Start server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

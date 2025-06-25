const express = require('express');
const createDBConnection = require('./db');

const app = express();
app.use(express.json());

const PORT = process.env.PORT || 5001;
const pool = createDBConnection();

app.get('/users', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM users');
    res.status(200).json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get('/fake/users', (req, res) =>{
  const fakeUsers = [
    { id: 1, name: 'John Doe', email: 'john.doe@example.com' },
    { id: 2, name: 'Jane Smith', email: 'jane.smith@example.com' },
    { id: 3, name: 'Bob Johnson', email: 'bob.johnson@example.com' },
  ];
  res.status(200).json(fakeUsers);
});

app.listen(PORT, () => {
  console.log('Server running on port ${PORT}');
});
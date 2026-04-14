const express = require('express');
const { connectDB, getDB } = require('./db');
const path = require('path');

const app = express();
app.use(express.json());

async function startServer() {
  await connectDB();

  app.get('/api/test', (req, res) => {
    res.json({ message: "If you see this the test was successful" });
  });

  app.post('/api/users', async (req, res) => {
    const { name, email, password } = req.body;

    try {
      const db = getDB();

      const result = await db.collection('users').insertOne({ name, email, password });

      res.json(result);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });

  app.use(express.static('public'));

  app.listen(5000, () => {
    console.log('Running on port 5000');
  });
}

startServer();

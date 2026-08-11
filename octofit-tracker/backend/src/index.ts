import express from 'express';
import dotenv from 'dotenv';
import './config/database.js';

dotenv.config();

const app = express();
const port = Number(process.env.PORT || 8000);

app.use(express.json());

app.get('/', (_req, res) => {
  res.json({ message: 'OctoFit Tracker API is running' });
});

app.listen(port, () => {
  console.log(`Backend server listening on http://localhost:${port}`);
});

import express from 'express';
import cors from 'cors';
import fetch from 'node-fetch';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors()); // Allow all origins (you can restrict to your GitHub Pages origin)
app.use(express.json()); // To parse JSON bodies

const GOOGLE_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbw-wW-MXAAWjkLr0Q72CHF93ohAyJqqKMgSSioU95SAEHDfxGmsuNMortZxyo-vEOVr/exec";

app.post('/submit', async (req, res) => {
  try {
    const response = await fetch(GOOGLE_SCRIPT_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(req.body)
    });

    const data = await response.text();
    res.status(200).send(data);
  } catch (err) {
    console.error(err);
    res.status(500).send("Something went wrong.");
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
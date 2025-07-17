import express from 'express';
import cors from 'cors';
import fetch from 'node-fetch';

const app = express();
const PORT = process.env.PORT || 3000;

// Restrict CORS to only your GitHub Pages site
const allowedOrigin = 'https://sarvessh05.github.io';
app.use(cors({ origin: allowedOrigin }));

app.use(express.json()); // Parse JSON body

const GOOGLE_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbw-wW-MXAAWjkLr0Q72CHF93ohAyJqqKMgSSioU95SAEHDfxGmsuNMortZxyo-vEOVr/exec";

app.post('/submit', async (req, res) => {
  console.log('📥 Incoming form data:', req.body);

  try {
    const response = await fetch(GOOGLE_SCRIPT_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(req.body)
    });

    const responseText = await response.text();
    console.log('✅ Forwarded to Google Script:', responseText);

    res.status(200).send(responseText);
  } catch (error) {
    console.error('❌ Error:', error);
    res.status(500).send("Something went wrong.");
  }
});

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
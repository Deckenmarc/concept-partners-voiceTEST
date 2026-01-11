const express = require('express');
const Retell = require('retell-sdk');
const path = require('path');

const app = express();
const retellClient = new Retell({
  apiKey: process.env.RETELL_API_KEY,
});

app.use(express.static('public'));

// This endpoint creates the secure session
app.post('/create-web-call', async (req, res) => {
  try {
    const response = await retellClient.webCall.create({
      agent_id: process.env.RETELL_AGENT_ID,
    });
    res.json(response);
  } catch (error) {
    console.error("Error starting call:", error);
    res.status(500).json({ error: "Failed to create call" });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

// server.js (or app.js)
const express = require('express');
const path = require('path');
const fs = require('fs');
const cors = require('cors'); 

const app = express();
const PORT = process.env.PORT || 5000;

// Enable CORS
app.use(cors());

// Serve static files (if needed)
app.use(express.static(path.join(__dirname, 'public')));

// API route to fetch JSON data
app.get('/api/data', (req, res) => {
  fs.readFile(path.join(__dirname, 'data', 'data.json'), 'utf8', (err, data) => {
    if (err) {
      return res.status(500).json({ error: 'Failed to read data file' });
    }
    res.json(JSON.parse(data));
  });
});


// Start server
app.listen(PORT, () => {
  console.log(`Server running on port http://localhost:${PORT}`);
});

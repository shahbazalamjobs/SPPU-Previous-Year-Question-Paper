// server.js (or app.js)
const express = require('express');
const path = require('path');
const fs = require('fs');
// const cors = require('cors'); 

const app = express();
const PORT = process.env.PORT || 5000;

// Enable CORS
// app.use(cors());

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


// const express = require('express');
// const path = require('path');
// const fs = require('fs');
// // const cors = require('cors');
// const helmet = require('helmet');
// const compression = require('compression');
// const morgan = require('morgan');
// const dotenv = require('dotenv');

// // Load environment variables from .env file, if present
// dotenv.config();

// const app = express();
// const PORT = process.env.PORT || 5000;

// // Enable CORS
// // app.use(cors({
// //   origin: 'https://sppu-papers.vercel.app', // Allow only your frontend to access the API
// //   optionsSuccessStatus: 200
// // }));

// // Set security-related HTTP headers
// app.use(helmet());

// // Compress responses
// app.use(compression());

// // Log HTTP requests
// app.use(morgan('combined'));

// // Serve static files from the 'public' directory
// app.use(express.static(path.join(__dirname, 'public')));

// // API route to fetch JSON data
// app.get('/api/data', (req, res) => {
//   const dataFilePath = path.join(__dirname, 'data', 'data.json');
//   fs.readFile(dataFilePath, 'utf8', (err, data) => {
//     if (err) {
//       console.error('Failed to read data file:', err);
//       return res.status(500).json({ error: 'Failed to read data file' });
//     }
//     res.json(JSON.parse(data));
//   });
// });

// // Catch-all route to serve the frontend's index.html for all non-API routes
// app.get('*', (req, res) => {
//   res.sendFile(path.join(__dirname, 'public', 'index.html'));
// });

// // Error handling middleware
// app.use((err, req, res, next) => {
//   console.error('Unexpected error:', err);
//   res.status(500).json({ error: 'An unexpected error occurred' });
// });

// // Start server
// app.listen(PORT, () => {
//   console.log(`Server running on http://localhost:${PORT}`);
// });

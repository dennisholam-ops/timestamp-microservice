const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.static('public'));

// API endpoint
app.get('/api/:date?', (req, res) => {
  let dateString = req.params.date;
  
  // If no date parameter provided, use current date
  if (!dateString) {
    const currentDate = new Date();
    return res.json({
      unix: currentDate.getTime(),
      utc: currentDate.toUTCString()
    });
  }
  
  // Check if date string is a number (Unix timestamp)
  if (!isNaN(dateString)) {
    dateString = parseInt(dateString);
  }
  
  const date = new Date(dateString);
  
  // Check if date is valid
  if (isNaN(date.getTime())) {
    return res.json({ error: "Invalid Date" });
  }
  
  // Return the timestamp in the required format
  res.json({
    unix: date.getTime(),
    utc: date.toUTCString()
  });
});

// Serve the main page
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

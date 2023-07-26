const express = require('express');
const cors = require('cors');
const app = express();
const port = 3000; // You can use any desired port number

app.use(cors());

const movieTitles = [
  'The Avengers',
  'All Dogs Go to Heaven',
  'The Aristocats',
  'The Brave Little Toaster',
  'The Lord of the Rings',
  'The Revenant',
  'Cats & Dogs',
];

app.get('/all', (req, res) => {
  res.json(movieTitles);
});

app.get('/find', (req, res) => {
  const searchTerm = req.query.contains || req.query.startsWith;
  if (searchTerm) {
    const filteredTitles = movieTitles.filter((title) =>
      req.query.contains
        ? title.toLowerCase().includes(searchTerm.toLowerCase())
        : title.toLowerCase().startsWith(searchTerm.toLowerCase())
    );
    res.json(filteredTitles);
  } else {
    res.json(movieTitles);
  }
});

app.delete('/all', (req, res) => {
  movieTitles.length = 0;
  res.send('All the Movie Titles removed from the array.');
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});

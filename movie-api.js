
const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = "mongodb+srv://cfastudentuser:<password>@cluster0.nfsnbwr.mongodb.net/?retryWrites=true&w=majority";

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();
    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}
run().catch(console.dir);


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

const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion } = require('mongodb');
const PORT = 3000;

const app = express();
app.use(cors());

const collectionname = "Movies";
const uri = "mongodb+srv://cfastudentuser:JQbwpXCRt2wfxR0g@cluster0.nfsnbwr.mongodb.net/?retryWrites=true&w=majority";

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

let movieList = [
  'The Avengers', 
  'All Dogs Go To Heaven', 
  'The Aristocats', 
  'The Brave Little Toaster', 
  'The Lord of the Rings', 
  'The Revenant', 
  'Cats & Dogs'
];

app.get('/all', async (req, res) => {
  let result = [];
  let error = null;
  try {
    // Connect the client to the server (optional starting in v4.7)
    await client.connect();
    // Send a ping to confirm a successful connection
    const collection = client.db("cfastudentdb").collection(collectionname);
    // finds all items in the collection
    result = await collection.find({}).toArray();

    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } catch (e) {
    console.dir(e);
    error = e;
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }

  if (error === null) {
    res.json(result.map((value) => {
      return value.title;
    }));
  } else {
    res.status(500).send("Failure");
  }
});

app.delete('/all', (req, res) => {
  movieList = [];
  res.sendStatus(200);
});

app.get('/find', async (req, res) => {
  let error = null;
  try {
    await client.connect();
    const collection = client.db("cfastudentdb").collection(collectionname);
    let result;

    if (req.query.hasOwnProperty('contains')) {
      result = await collection.find({
        title: { $regex: req.query.contains, $options: "i" } // Added $options: "i" for case-insensitive search
      }).toArray();
    } else if (req.query.hasOwnProperty('startsWith')) {
      result = await collection.find({
        title: { $regex: `^${req.query.startsWith}`, $options: "i" } // Added $options: "i" for case-insensitive search
      }).toArray();
    } else {
      res.status(400).send("Bad Request");
      return;
    }

    console.log(req.query);
    res.json(result);
  } catch (e) {
    console.dir(e);
    error = e;
  } finally {
    await client.close();
  }

  if (error) {
    res.status(500).send("Failure");
  }
});

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});

const express = require('express');
const app = express();

const { MongoClient } = require('mongodb');

const uri = '<add ur URI>';
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

app.use(express.urlencoded({ extended: true }));

async function connect() {
  try {
    await client.connect();
    console.log('Connected to MongoDB Atlas');
  } catch (err) {
    console.error(err);
  }
}
connect();

app.post('/search', async (req, res) => {
  const query = req.body.search;

  try {
    const collection = client.db('hadi').collection('lag');
    const result = await collection.find({ name: "hadi" }).toArray();
    console.log(result);
    res.send(`You searched for: ${result[0].filename}`);
  } catch (err) {
    console.error(err);
    res.status(500).send('Internal server error');
  }
});

app.listen(3000, () => {
  console.log('Server started on port 3000');
});



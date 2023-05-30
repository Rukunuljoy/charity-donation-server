const express = require("express");
const cors = require("cors");
const app = express();
const {
  MongoClient,
  ServerApiVersion
} = require("mongodb");
const port = process.env.PORT || 5000;
require("dotenv").config();

app.use(cors());
app.use(express.json());

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.hvxqvqc.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
});

async function run() {
    try {
        const donationCauses = client.db("donation").collection("causes");
        const donationGallery = client.db("donation").collection("gallery");
        const donationBlogs = client.db("donation").collection("donationBlog");

        app.get("/causes", async (req, res) => {
            const query = {};
            const result = await donationCauses.find(query).toArray();
            res.send(result);
          });
        app.get("/gallery", async (req, res) => {
            const query = {};
            const result = await donationGallery.find(query).toArray();
            res.send(result);
          });
        app.get("/donationBlog", async (req, res) => {
            const query = {};
            const result = await donationBlogs.find(query).toArray();
            res.send(result);
          });

    } finally {

    }
}
run().catch((err) => console.error(err));

app.get("/", (req, res) => {
    res.send("donation server is running");
  });
  
  app.listen(port, () => {
    console.log(`donation server listening on ${port}`);
  });
  
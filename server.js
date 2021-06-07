require("dotenv").config();
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const fileUpload = require("express-fileupload");

const app = express();

//middleware

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static('img'));
app.use(fileUpload());

const MongoClient = require("mongodb").MongoClient;
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.1xva6.mongodb.net/redOnionDb?retryWrites=true&w=majority`;
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const port = 4000;

app.get("/", (req, res) => {
  res.send("Red Onion Restrurent Server v1.0.0");
});

client.connect((err) => {
  const productCollection = client.db("redOnionDb").collection("products");

  app.post("/addproduct", (req, res) => {
    const info = req.body;
    const file = req.files;
    const newProduct = {
        ...info,
        img:file.photo.name
    }
    productCollection.insertOne(newProduct)
    .then(response => {
        if (response.insertedCount > 0) {
            res.status(200).send(true);
        }
    })
    file.photo.mv(`${__dirname}/img/${file.photo.name}`)
  });
});

app.listen(port, () => {
  console.log(`Example app listening at :${port}`);
});

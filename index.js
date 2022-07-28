const express = require("express");
const cors = require("cors");
const { MongoClient, ServerApiVersion } = require("mongodb");
const app = express();
const port = process.env.PORT || 5000;
require("dotenv").config();

//middleware
app.use(cors());
app.use(express.json());

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.fna0i.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });


async function run() {
    try {
        await client.connect();
        console.log("connected to mongodb");
        // all collection here
        const postCollection = client.db("Posts").collection("post");
        const userCollection = client.db("Users").collection("user");

        // post methods
        app.get('/post', async (req, res) => {
            const posts = await postCollection.find({}).toArray();
            res.send(posts);
        });
        app.post('/post', async (req, res) => {
            // console.log(req.body);
            const data = req.body;
            const post = await postCollection.insertOne(data);
            res.send(post);
        });

        app.delete('/post/:id', async (req, res) => {
            const post = await postCollection.deleteOne({ _id: req.params.id });
            res.send(post);
        });
        app.put('/post/:id', async (req, res) => {
            const post = await postCollection.updateOne({ _id: req.params.id }, { $set: req.body });
            res.send(post);
        });
        // user methods
        app.get('/user', async (req, res) => {
            const users = await userCollection.find({}).toArray();
            res.send(users);
        });
        app.post('/user', async (req, res) => {
            const user = await userCollection.insertOne(req.body);
            res.send(user);
        });
        app.delete('/user/:id', async (req, res) => {
            const user = await userCollection.deleteOne({ _id: req.params.id });
            res.send(user);
        });
        app.put('/user/:id', async (req, res) => {
            const user = await userCollection.updateOne({ email: req.params.id }, { $set: req.body });
            res.send(user);
        });
    } finally {
        // await client.close();
    }
}
run().catch(console.dir);

app.get("/", (req, res) => {
    res.send("Hello World!");
});

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});

//middleware
app.use(cors());
app.use(express.json());
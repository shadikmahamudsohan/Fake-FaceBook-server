const express = require("express");
const cors = require("cors");
const { MongoClient, ServerApiVersion } = require("mongodb");
const app = express();
const port = process.env.PORT || 5000;
require("dotenv").config();
const ObjectId = require('mongodb').ObjectId;

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
        const imageShareCollection = client.db("ImageShare").collection("details");
        const videoCollection = client.db("Videos").collection("video");


        // ========================================================
        // ===================    ImageShare    ========================= 
        // ========================================================
        // post methods
        app.get('/imageShare', async (req, res) => {
            const imageShares = await imageShareCollection.find({}).toArray();
            res.send(imageShares);
        });
        //create imageShare
        app.post('/imageShare', async (req, res) => {
            const data = req.body;
            const imageShare = await imageShareCollection.insertOne(data);
            res.send(imageShare);
        });
        //delete imageShare
        app.delete('/imageShare/:id', async (req, res) => {
            const imageShare = await imageShareCollection.deleteOne({ _id: ObjectId(req.params.id) });
            res.send(imageShare);
        });
        //update imageShare
        app.put('/imageShare/:id', async (req, res) => {
            const imageShare = await imageShareCollection.updateOne({ _id: req.params.id }, { $set: req.body });
            res.send(imageShare);
        });
        //patch imageShare
        app.patch('/imageShare/:id', async (req, res) => {
            const imageShare = await imageShareCollection.updateOne({ _id: ObjectId(req.params.id) }, { $set: req.body });
            res.send(imageShare);
        });

        // ========================================================
        // ===================    USER    ========================= 
        // ========================================================

        // user methods
        app.get('/user', async (req, res) => {
            const users = await userCollection.find({}).toArray();
            res.send(users);
        });
        //get single user
        app.get('/user/:email', async (req, res) => {
            const user = await userCollection.findOne({ email: req.params.email });
            res.send(user);
        });

        //create user
        app.post('/user', async (req, res) => {
            const user = await userCollection.insertOne(req.body);
            res.send(user);
        });
        //delete user
        app.delete('/user/:id', async (req, res) => {
            const user = await userCollection.deleteOne({ _id: ObjectId(req.params.id) });
            res.send(user);
        });
        //update user
        app.put('/user/:email', async (req, res) => {
            const user = await userCollection.updateOne({ email: req.params.email }, { $set: req.body }, { upsert: true });
            res.send(user);
        });

        //make a user patch request
        app.patch('/user/:email', async (req, res) => {
            const user = await userCollection.updateOne({ email: req.params.email }, { $set: req.body }, { upsert: true });
            console.log(user, req.params.email);
            res.send(user);
        });
        // ========================================================
        // ===================    videoCollection    ========================= 
        // ========================================================
        // post methods
        app.get('/shareVideo', async (req, res) => {
            const shareVideos = await videoCollection.find({}).toArray();
            res.send(shareVideos);
        });
        //create shareVideo
        app.post('/shareVideo', async (req, res) => {
            const data = req.body;
            const shareVideo = await videoCollection.insertOne(data);
            res.send(shareVideo);
        });
        //delete shareVideo
        app.delete('/shareVideo/:id', async (req, res) => {
            const shareVideo = await videoCollection.deleteOne({ _id: ObjectId(req.params.id) });
            res.send(shareVideo);
        });
        //update shareVideo
        app.put('/shareVideo/:id', async (req, res) => {
            const shareVideo = await videoCollection.updateOne({ _id: req.params.id }, { $set: req.body });
            res.send(shareVideo);
        });
        //patch shareVideo
        app.patch('/shareVideo/:id', async (req, res) => {
            const shareVideo = await videoCollection.updateOne({ _id: ObjectId(req.params.id) }, { $set: req.body });
            res.send(shareVideo);
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
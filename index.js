const express = require('express');
const cors = require('cors');
const app = express();
require("dotenv").config();
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const port = process.env.PORT || 5000;


app.use(cors());
app.use(express.json())

const uri = `mongodb+srv://${process.env.USER_NAME}:${process.env.USER_PASS}@cluster0.c8jqolf.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });




async function run() {
    try {
        const userCollection = client.db('easymanager').collection('user')
        const boardCollection = client.db('easymanager').collection('board')
        const boardListCollection = client.db('easymanager').collection('boardList')
        app.post('/user', async (req, res) => {
            const user = req.body;
            const postuser = await userCollection.insertOne(user)
            res.send(postuser)
        })
        app.post('/board', async (req, res) => {
            const board = req.body;
            const postboard = await boardCollection.insertOne(board)
            res.send(postboard)
        })
        app.get('/boards', async (req, res) => {
            var query = {};
            if (req.query.email) {
                query = {
                    email: req.query.email
                }
            }
            const cursor = boardCollection.find(query);
            const orderRevew = await cursor.toArray();
            res.send(orderRevew)
        })
        app.get('/boards/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: new ObjectId(id) }
            const selectedBoards = await boardCollection.findOne(query)
            res.send(selectedBoards)
        })
        // boards list items
        app.post('/boardlist', async (req, res) => {
            const board = req.body;
            const postboard = await boardListCollection.insertOne(board)
            res.send(postboard)
        })
        app.get('/boardlist/:id', async (req, res) => {
            const id = req.params.id;
            var query = {};
            if (id) {
                query = {
                    boardId: id
                }
            }
            const cursor = boardListCollection.find(query);
            const orderRevew = await cursor.toArray();
            res.send(orderRevew)
        })

        // const orderCalaction = client.db('easymanager').collection('orders')
        // const latastShortCalaction = client.db('easymanager').collection('latast short')
        // app.get('/serves', async (req, res) => {
        //     const query = {};
        //     const cursor = serviceCollection.find(query);
        //     const servises = await cursor.limit(3).toArray();
        //     res.send(servises);

        // })
        // app.get('/latastShort', async (req, res) => {
        //     const query = {};
        //     const cursor = latastShortCalaction.find(query);
        //     const servises = await cursor.toArray();
        //     res.send(servises);

        // })
        // app.get('/moreserves', async (req, res) => {
        //     const page = parseInt(req.query.page);
        //     const size = parseInt(req.query.size);
        //     const query = {};
        //     const cursor = serviceCollection.find(query);
        //     const servic = await cursor.skip(page * size).limit(size).toArray();
        //     const count = await serviceCollection.estimatedDocumentCount()
        //     res.send({ count, servic });

        // })
        // app.get('/serves/:id', async (req, res) => {
        //     const id = req.params.id;
        //     const query = { _id: ObjectId(id) }
        //     const selectedService = await serviceCollection.findOne(query)
        //     res.send(selectedService)
        // })
        // app.post('/order', async (req, res) => {
        //     const order = req.body;
        //     const postOrder = await orderCalaction.insertOne(order)
        //     res.send(postOrder)
        // })
        // app.get('/revew', async (req, res) => {
        //     var query = {};
        //     if (req.query.email) {
        //         query = {
        //             email: req.query.email
        //         }
        //     }
        //     const cursor = orderCalaction.find(query);
        //     const orderRevew = await cursor.toArray();
        //     res.send(orderRevew)
        // })
        // app.patch('/order/:id', async (req, res) => {
        //     const id = req.params.id;
        //     console.log(id)
        //     const status = req.body.status;
        //     const query = { _id: ObjectId(id) }
        //     const updateDoc = {
        //         $set: {
        //             status: status
        //         }
        //     }
        //     const result = await orderCalaction.updateOne(query, updateDoc);
        //     res.send(result)
        // })
        // app.put('/update/:id', async (req, res) => {
        //     const id = req.params.id;
        //     const query = { _id: ObjectId(id) }
        //     const update = req.body;
        //     const option = { upsert: true }
        //     const updateDoc = {
        //         $set: {
        //             castomerName: update.castomerName,
        //             address: update.address,
        //             phone: update.phone,
        //             castomerText: update.castomerText,
        //             email: update.email,
        //             img: update.img,
        //             ServicName: update.ServicName,
        //             id: update.id
        //         }
        //     }
        //     const result = await orderCalaction.updateOne(query, updateDoc, option);
        //     res.send(result)
        // })
        // app.get('/update/:id', async (req, res) => {
        //     const id = req.params.id;
        //     const query = { _id: ObjectId(id) }
        //     const selectedService = await orderCalaction.findOne(query)
        //     res.send(selectedService)
        // })
        // app.delete('/order/:id', async (req, res) => {
        //     const id = req.params.id;
        //     const query = { _id: ObjectId(id) }
        //     const resutl = await orderCalaction.deleteOne(query)
        //     res.send(resutl)
        // })

    }
    catch {

    }
}
run().catch(err => console.log(err))




app.get('/', async (req, res) => {
    res.send("server is running")
})


app.listen(port, () => { console.log(`server runing:${port}`) })
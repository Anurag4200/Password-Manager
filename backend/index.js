const express=require("express")
const app=express()
const mongoose=require("mongoose")
const dotenv=require("dotenv")
const bodyParser=require("body-parser")
const cors=require("cors")
const PORT=process.env.PORT || 5000

dotenv.config()
app.use(bodyParser.json())
app.use(cors())
const { MongoClient } = require('mongodb');
// or as an es module:
// import { MongoClient } from 'mongodb'

// Connection URL
const url =process.env.MONGO_URL;
const client = new MongoClient(url);

// Database Name
const dbName = 'passOP';
client.connect();



// fetch all the password
app.get("/",async (req,res)=>{
    const db=client.db(dbName)
    const collection=db.collection("passwords")
    const findResult= await collection.find({}).toArray();
    res.json(findResult)

    
})

// save the password
app.post("/",async (req,res)=>{
    const password=req.body
    const db=client.db(dbName)
    const collection=db.collection("passwords")
    const result=await collection.insertOne(password)
    res.send(result)
    
})

// delete the password
app.delete("/",async (req,res)=>{
    const password=req.body
    const db=client.db(dbName)
    const collection=db.collection("passwords")
    const result=await collection.deleteOne(password)
    res.send(result)

})

app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`)
})


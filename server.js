require('dotenv').config();

const express = require('express')
const mongoose = require('mongoose')
const user = require("./models/users");

const app = express()
const PORT = process.env.PORT || 3000

mongoose.set('strictQuery', false);
const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
}

//Routes go here
app.get('/', (req,res) => {
    res.send({ title: 'data' });
})

app.get('/data', async (req,res)=> {

  const Data = await data.find();

  if (data) {
    res.json(data)
  } else {
    res.send("Something went wrong.");
  }
  
});

app.get('/add-info', async (req,res) => {
  try {
    await data.insertMany([
      {
        title: "e-monitoring",
        body: "All data goes here...",
      },
      {
        title: "e-monotoring and evaluation data",
        body: "All data goes here...",
      }
    ]);
    res.json({"Data":"Added"})
  } catch (error) {
    console.log("err", + error);
  }
})

app.post("/createUser", async (req, res) => {
  const user = req.body;
  const newUser = new UserModel(user);
  await newUser.save();

  res.json(user);
});

//Connect to the database before listening
connectDB().then(() => {
    app.listen(PORT, () => {
        console.log("listening for requests");
    })
})

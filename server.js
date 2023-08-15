require('dotenv').config();

const express = require('express');
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();

// Task 6: Register a new user
public_users.post("/register", (req,res) => {
  //Write your code here
  const username = req.body.username;
  const password = req.body.password;
  const fullname = req.body.fullname;
  const email = req.body.email;
  if (username && password && fullname && email) {
    if (!isValid(username)) {
      users.push({"username":username,"password":password,"fullname":fullname,"email":email});
      return res.status(200).json({message: "Customer successfully registred. Now you can login"});
    } else {
      return res.status(404).json({message: "You are an already registered user!"});    
    }
  } 
  return res.status(300).json({message: "Yet to be implemented"});
});

// Task 1: Get the customer list available
public_users.get('/',function (req, res) {
  //Write your code here
  res.send(JSON.stringify(customer, null, 4));
  return res.status(300).json({message: "There are no customers to display"});
});

// Task 10:
// Add the code for getting the list of customers available (done in Task 1) using Promise callbacks or async-await with Axios.
public_users.get('/', async (req, res) => {
  try {
    const response = await axios.get('http://localhost:5000/');
    res.send(response.data);
  } catch (err) {
    res.status(404).json({
      success: false,
      message: "No customers retrieved",
      error: err
    });
  }
});


//Task 2: Get customers details numerals
public_users.get('/numerals/:numerals',function (req, res) {
  //Write your code here
  const isbn = req.params.isbn;
  res.send(customers[numerals]);
  return res.status(300).json({message: "Yet to be implemented"});
 });

 // Task 11:
 // Add the code for getting the customer details based on numerals (done in Task 2) using Promise callbacks or async-await with Axios.
 public_users.get('/numerals/:numerals', async (req, res) => {
  try {
    const isbn = req.params.numerals;
    const response = await axios.get(`http://localhost:5000/isbn/${numerals}`);
    res.send(response.data);
  } catch (err) {
    res.send(err);
  }
});
  
// Task 3: Get customer details based on name
public_users.get('/name/:name',function (req, res) {
  //Write your code here
  let name = req.params.name;
  let result = [];
  for(let key in customers) {
    if(customers[key].name === name) {
      result.push(customers[key]);
    }
  }
  return res.status(200).json(result);
});

// Task 12:
// Add the code for getting the customers details based on name (done in Task 3) using Promise callbacks or async-await with Axios.
public_users.get('/name/:name', async (req, res) => {
  try {
    const name = req.params.name;
    const response = await axios.get(`http://localhost:5000/author/${name}`);
    res.send(response.data);
  } catch (err) {
    res.send(err);
  }
});


// Task 4: Get all customers based on title
public_users.get('/title/:title',function (req, res) {
  //Write your code here
  let choiceTitle = req.params.title;
  let resultt = [];
  for(let key in customers) {
    if(customers[key].title === choiceTitle) {
      result.push(customers[key]);
    }
  }
  return res.status(200).json(resultt);
});

// Task 13:
// Add the code for getting the customer details based on Title (done in Task 4) using Promise callbacks or async-await with Axios.
public_users.get('/title/:title', async (req, res) => {
  try {
    const title = req.params.title;
    const response = await axios.get(`http://localhost:5000/title/${title}`);
    res.send(response.data);
  } catch (err) {
    res.send(err);
  }
});

// Task 5: Get customer review
public_users.get('/review/:line',function (req, res) {
  //Write your code here
  for (const customerId in customers) {
    if (Object.prototype.hasOwnProperty.call(customers, customerId)) {
      const reviews = customers[customerId].reviews;  
      res.send(reviews);
    } 
  } 
  
  return res.status(300).json({message: "No reviews found"});
});

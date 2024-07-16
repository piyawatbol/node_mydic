var express = require('express');
require("dotenv").config();
require("./config/database").connect();
var app = express();
var cors = require("cors");
const {API_PORT} = process.env;

app.use(cors());

app.use(express.json())

app.use(function (req, res, next) {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type");
    res.setHeader("Access-Control-Allow-Credentials", true);
    next();
  });

app.get('/',(req,res)=>{
    res.send("hello to vocab")
})

app.use('/vocab',require('./routes/vocab/vocab.js'))

app.use('/oxford',require('./routes/vocab/oxford.js'))

app.use('/login',require('./routes/login/login.js'))

app.use('/register',require('./routes/register/register.js'))




app.listen(API_PORT, ()=>{
    console.log(`Api Listening on PORT ${API_PORT}`);
})

module.exports = app
var express = require('express');
const PORT = 3000
var app = express();
var cors = require("cors");

const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

mongoose.set("strictQuery", false);

mongoose.connect('mongodb+srv://piyawat:1234@cluster0.92gccgo.mongodb.net/my-dictionary?retryWrites=true&w=majority')
        .then(() => console.log('connection database successfully!'))
        .catch((err) => console.error(err))

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

app.use('/vocab',require('./routes/vocab'))

app.use('/oxford',require('./routes/oxford'))


app.listen(PORT, ()=>{
    console.log(`Api Listening on PORT ${PORT}`);
})

module.exports = app
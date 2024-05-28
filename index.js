var express = require('express');
const PORT = 3000
var app = express();


app.listen(PORT, ()=>{
    console.log(`Api Listening on PORT ${PORT}`);
})


app.get('/',(req,res)=>{
    res.send("hello")
})


module.exports = app;
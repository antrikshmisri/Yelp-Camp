const express = require('express');
const app = express();
const path = require('path')
const mongoose = require('mongoose')

mongoose.connect('mongodb://localhost:27017/yelp-camp',{
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
})

const db = mongoose.connection;
db.on("error" , console.error.bind(console , "Connection error: "));
db.once("open" , ()=>{
    console.log("connection established")
})

app.set('view engine' , 'ejs')
app.set('views' , path.join(__dirname , 'views'))

app.get('/' , (req , res) =>{
    res.render('home')
})
app.listen(5050 , () =>{
    console.log('Listening on Port 5050')
})


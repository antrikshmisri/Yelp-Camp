const express = require('express');
const app = express();
const path = require('path')
const mongoose = require('mongoose')
const campground = require('./models/campground')
const methodOverride = require('method-override')

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
app.use(express.urlencoded({extended:false}));
app.use(methodOverride('_method'))

app.get('/' , (req , res) =>{
    res.render('home')
})

app.get('/campgrounds' , async (req , res)=>{
    const allcamps = await campground.find({})
    res.render('campground/index' , {allcamps})
})

app.get('/campgrounds/new' , (req , res)=>{
    res.render('campground/new')
})

app.post('/campgrounds' , async (req , res)=>{
    const {title , location} = req.body
    const newcamp = new campground({
        title: title,
        location: location
    })
    await newcamp.save()
    res.redirect('/campgrounds')
})
app.get('/campgrounds/:id/delete' ,async (req , res)=>{
    const {id} = req.params;
    const foundcamp = await campground.findById(id)
    res.render('campground/delete' , {foundcamp})
})

app.delete('/campgrounds/:id' ,async (req , res)=>{
    const {id} = req.params
    await campground.findByIdAndDelete(id)
    res.redirect('/campgrounds')
})
app.get('/campgrounds/:id' , async (req , res)=>{
    const {id} = req.params;
    const foundcamp = await campground.findById(id);
    res.render('campground/show', {foundcamp})
})
app.listen(5050 , () =>{
    console.log('Listening on Port 5050')
})


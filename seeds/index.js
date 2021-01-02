const campground = require('../models/campground')
const mongoose = require('mongoose')
const cities = require('./cities')
const {descriptors , places} = require('./seedHelpers')
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

const seedDB = async () =>{
    await campground.deleteMany({});
    for(let i=0 ; i<50 ; i++)
    {
        const randindex = Math.floor(Math.random() * 1000);
        const descriptor = Math.floor(Math.random() * descriptors.length)
        const place = Math.floor(Math.random() * places.length)
        const camp = new campground({
            title: `${descriptors[descriptor]} ${places[place]}`,
            location:   `${cities[randindex].city}, ${cities[randindex].state}`
        })
        await camp.save();
    }
}

seedDB().then(() =>{
    mongoose.connection.close();
})
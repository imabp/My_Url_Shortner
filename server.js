// we need express, mongoose.
const express = require('express');
const mongoose = require('mongoose');

//getting shorturl
const ShortUrl = require('./models/shortUrl')

//creating instance of express class.
const app = express()

//connecting with mongoosejs.
mongoose.connect('mongodb://localhost/urlShortener', {
    useNewUrlParser: true, useUnifiedTopology: true
});

//setting up view enginne as ejs.
app.set('view engine', 'ejs')

// we need to tell express we are using url parameters.
app.use(express.urlencoded({ extended: false }))

//this is the route of home page.
app.get('/', async (req, res) => {
    const shortUrls=await ShortUrl.find()
    res.render('index',{shortUrls: shortUrls})

})

//this is the route of shortening url.
app.post('/shortUrls', async(req, res) => {
 await ShortUrl.create({ full: req.body.fullUrl })
 res.redirect('/')
})

//shortUrl Routing

app.get('/:shortUrl',async (req,res)=>{
const shortUrl= await ShortUrl.url.findone({short:req.params.shortUrl})


if(shortUrl==null) return res.sendStatus(404);
shortUrl.clicks++
shortUrl.save();
res.redirect(shortUrl.full)
})



//server is running at 
app.listen(process.env.PORT || 5000)
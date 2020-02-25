const mongoose = require('mongoose');

//shortid dependency generates unique identifiers.
//shortid.generate() is a function which generate short ids
const shortId = require('shortid') 


const shortUrlSchema = new mongoose.Schema({
    full: {
        type: String,
        required: true
    },
    short: {
        type: String,
        required: true,
        default: shortId.generate 
    },
    clicks: {
        type:Number,
        required:true,
        default:0
    }




})

module.exports=mongoose.model('ShortUrl',shortUrlSchema);
const mongoose = require('mongoose');

const siteSchema = mongoose.Schema({
    featured:{
        required:true,
        type:Array,
        default:[]
    },
    siteInfo:{
        required:true,
        type:Array,
        default:[]
    }
});

const Site = mongoose.model('Site',siteSchema,'Site');

module.exports = { Site }
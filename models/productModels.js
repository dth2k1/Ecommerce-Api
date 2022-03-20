const mongoose = require('mongoose');



const productSchema = new mongoose.Schema({
    productCode:{
        type:String,
        required:true
    },
    price:{
        type:Number,
        required:true
    }
    ,title:{
        type:String,
        required:true
    }
},{
    timestamps:true
})

module.exports = mongoose.model('Products',productSchema)
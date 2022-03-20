//Connect Db
const mongoose = require("mongoose");

const connectdb = async ()=>{
    try{
        const connectmongo =mongoose.connect('mongodb+srv://dthadmin:hiephihi123@cluster0.owazy.mongodb.net/myFirstDatabase?retryWrites=true&w=majority', {
            useNewUrlParser: true,
            useUnifiedTopology: true
        }, () => {
            console.log('Connect mongodb atlas sucessfully!');
        })
    }catch(e){
        console.log(e)
    }
}
module.exports = connectdb


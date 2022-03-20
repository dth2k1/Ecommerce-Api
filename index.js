require('dotenv');
require('./config/db')()
const winston = require('winston')
const express  = require('express');
const app = express()
require('./config/config')(app)
const port  = process.env.PORT || 3000;
app.listen(port, ()=>{
    winston.info(`Server is run in ${port}`)
})
const winston = require('winston')
const logger = winston.createLogger({
    transports: [
        new winston.transports.Http,
        new winston.transports.Console(),
        new winston.transports.File({ filename: 'combined.log' })
    ]
})


module.exports = function(err,req,res,next){
    logger.log({
        level:'error',
        message:err
    })
    next()
}
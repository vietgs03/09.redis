const express = require('express');
const app = express();
app.use(express.json())
app.use(express.urlencoded({
    extended:true
}))
require('./dbs/init.postgresdb')
const initredis = require('./configs/config.redis')
initredis.initRedis()
app.use('/',require('./routes'))
app.use((req,res,next)=>{
    const error = new Error('Not found')
    error.status=404
    next(error)
})
app.use((error,req,res,next)=>{
    const statusCode =error.status || 500
    return res.status(statusCode).json({
        status:'error',
        code:statusCode,
        message:error.message || 'Internal server error'
    })
})
module.exports = app
const express=require('express')
const dotenv=require('dotenv')
const { connection } = require('./Connections/connect')

dotenv.config()
const PORT=process.env.PORT||8080

app.get("/ping" ,(req,res)=>{
    res.send("Base Url")
})

app.listen(PORT,async()=>{
    try{
        await connection
        console.log(`Connected to ${PORT}`)
    }catch(err){
        console.log(err)
    }
})


const app=express()


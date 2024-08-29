const express=require('express')
const app=express()
const cors = require('cors');
const dotenv=require('dotenv')
const { connection } = require('./Connections/connect')
const { CardModel } = require('./Models/CardModel')


dotenv.config()
const PORT=process.env.PORT||8080
app.use(express.json())
app.use(cors())
// validation error handling

app.use((err,req,res,next)=>{
    if(err.name==='ValidationError'){
        return res.status(400).json({error:err.message})
    }
    next(err)
})


// Base api
app.get("/ping" ,(req,res)=>{
    res.send("Base Url")
})

// Card Api
app.post("/cards",async(req,res)=>{
const {id,title,description}=req.body

try{
await CardModel.create({id,title,description})
res.status(201).json("Card added Successfully")
}catch(err){
    console.log(err)
    res.status(400).json("Failed adding card")
}
})

app.get("/cards",async(req,res)=>{
    try{
    const data=await CardModel.find({})
    res.status(200).json(data)
    }catch(err){
        console.log(err)
        res.status(500).json("Error finding cards")
    }
})

app.get("/cards/:title",async(req,res)=>{
    const {title}=req.params;
    try{
        const card=await CardModel.findOne({title})
         if(!card){
         return   res.status(400).json("Card not found")
         }
         res.status(200).json(card)

    }catch(err){
        console.log(err)
        res.status(500).json("Error")
    }

})

app.listen(PORT,async()=>{
    try{
        await connection
        console.log(`Connected to ${PORT}`)
    }catch(err){
        console.log(err)
    }
})





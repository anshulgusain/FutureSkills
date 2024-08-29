const mongoose=require("mongoose")

const cardSchema=new mongoose.Schema({
  id:{type:String,required:true,unique:true},
  title:{type:String,required:true},
  description:{type:String,required:true}
})

const CardModel=mongoose.model('Card',cardSchema);

module.exports={
    CardModel
}
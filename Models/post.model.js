const mongoose =require("mongoose")


const PostSchema=mongoose.Schema({
    title :{type:String,require:true},
    body :{type:String,require:true},
    no_of_comments:{type:Number,require:true},
    device :{type:String,enum:["Laptop", "Tablet", "Mobile"],require:true},
    userid:{type:String},
    name:{type:String}
  
},{
    versionKey:false
})


const PostModel=mongoose.model("post",PostSchema)

module.exports={
    PostModel
}

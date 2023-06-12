const {PostModel}=require("../Models/post.model")

const {Router}=require("express")

const postRouter=Router()

postRouter.post("/add",async(req,res)=>{
    try{
const post=new PostModel(req.body)
await post.save()
res.status(200).send({"msg":`New post has been created by ${req.body.name}`})
    }catch(er){
        res.send(er.message)
    }
})


postRouter.get("/",async(req,res)=>{
    const {userid}=req.body
    const {device}=req.query
let obj={}
    if(userid){
obj.userid=userid
    }

    if(device){
        obj.device=device
    }

    try{
        const notes=await PostModel.find(obj)
        if(notes){
            res.status(200).send({"msg":notes})
        }else{
            res.status(200).send({"msg":`Notes not found`})
        }



    }catch(er){
        res.send(er.message)
    }
})










module.exports={
    postRouter
}
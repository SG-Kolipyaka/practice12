const {UserModel}=require("../Models/user.model")
const jwt = require('jsonwebtoken');
const {Router}=require("express")
const bcrypt = require('bcrypt');

const userRouter=Router()


userRouter.post("/register",async(req,res)=>{

    const {name,email,password,gender,city,age,is_married}=req.body
    try{
        const user1=await UserModel.findOne({email})
        if(user1){
            res.status(200).send({"msg":"User Already Registered Please Login"})
        }else{
            // const user=new UserModel(req.body)
            // await user.save()
            bcrypt.hash(password, 4, async(err, hash) =>{
                // Store hash in your password DB.
                const user=new UserModel({name,email,password:hash,gender,age,is_married,city})
                await user.save()
                res.status(200).send({"msg":"User Has been Registered Successfully","user":req.body})
            });
        }


    }catch(er){
        res.status(200).send(er.message)
    }
})



userRouter.post('/login',async(req,res)=>{
    const {email,password}=req.body
    try{
const user1=await UserModel.findOne({email})
if(user1){
    bcrypt.compare(password, user1.password, (err, result) =>{
        // result == true
        if(result){
            const token = jwt.sign({ userid: user1._id,name:user1.name }, 'ravi');
            res.status(200).send({"msg":"Login Successfull","token":token})
        }else{
            res.status(200).send({"msg":"Wrong Credencial"})
        }
    });
}else{
    res.status(200).send({"msg":"Wrong Credencial"})
}
    }catch(er){
        res.status(200).send(er.message)
    }
})







module.exports={
    userRouter
}





const jwt = require('jsonwebtoken');


const auth=(req,res,next)=>{
const token=req.headers.authorization
if(token){
    try{
        jwt.verify(token, 'ravi', (err, decoded)=> {
            if(decoded){
                req.body.userid=decoded.userid
                req.body.name=decoded.name
                next()
            }else{
                res.send("Not valid")
            }
            
          });
    }catch(er){
        res.send(er.message)
    }
}else{
    res.send("Not Valid")
}
}


module.exports={
    auth
}
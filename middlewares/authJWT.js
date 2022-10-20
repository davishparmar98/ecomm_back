const jwt=require("jsonwebtoken");
const { User } = require("../models");


verifytoken=(req,res,next)=>{
   

    let token=req.header("x-access-token");


if(!token){
    return res.status(403).send({message:"JWT token is missing"});
}
jwt.verify(token,process.env.SECRET__KEY, async function(err,decoded){
    if(err){
        res.status(401).send({message:"Unauthorized"})
    }
    const userid=decoded.id;
    const user=await User.findByPk(userid);
    req.user=user;
    next();
})
}
const authJWT={
    verifytoken:verifytoken
}
module.exports=authJWT;
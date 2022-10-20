const { User } = require("../models");


const checkduplicateemailorusername=(req,res,next)=>{

    const {username,email}=req.body;

    const checkusername= User.findOne({
        where:{
            username:username
        }
    })
    const checkemail= User.findOne({
        where:{
            email:email
        }
    })
    Promise.all([checkusername,checkemail])
    .then((users)=>{
       if(users[0] || users[1]){
           res.status(400).send({message:"Failed! Username or Email already in use."})
                 return;
        }       next();
    })
       .catch((err)=>{
        res.status(500).send({message:"something went wrong"})
    })
}

const checkroles=(req,res,next)=>{

    const role=req.body.role;
    if(role){
        for(let i=0;i<role.lenght;i++){
            if(!Roles.includes(role[i])){
                res.status(400).send({message:"Failed! role doesn't exist" +role[i]});
                return;
            }
        }
    }    next();
}
module.exports ={
    checkduplicateemailorusername,
    checkroles
}
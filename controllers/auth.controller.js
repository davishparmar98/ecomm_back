const { User,Role, Sequelize,Roles} = require("../models");
const bcrypt=require("bcrypt");
const jwt=require("jsonwebtoken");

exports.signup=async (req,res)=>{

    try{
    var {username,email,password,roles}=req.body;
    if(!roles || !roles.lenght){ roles=[Roles[0]]}
    const user=await User.create({username:username,email:email,password:bcrypt.hashSync(password,8)})
    const userroles=await Role.findAll({where:{name:{[Sequelize.Op.or]:roles}}})
     await user.setRoles(userroles)
    res.send({message:"User registered successfully"});}
    catch(err){ res.status(500).send({message:err.message || "Something went wrong"});}
}

exports.signin=async (req,res)=>{

    const {username,password}=req.body;

    if(!username || !password){
     res.status(400).send({message:"Username or Password can not be empty."});}
    try{ const user = await User.findOne({where:{username:username}})
    
   if(!user){return res.status(400).send({message:"User not found"});}
    var ispasswordvalid=bcrypt.compareSync(password,user.password);
    if(!ispasswordvalid){return res.status(401).send({message:"Incorrect Password"})}
    const token=jwt.sign({id:user.Id},process.env.SECRET_KEY,{})
 
        res.send({id:user.Id,username:user.username,email:user.email,roles:user.roles,accesstoken:token })}
        catch(err){res.status(500).send({message:err.message || "something went wrong"})}
        }

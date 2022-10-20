const {Product,Category}=require("../models");
const {Op}=require("sequelize");

exports.create=(req,res)=>{

    const {name,description,cost,categoryId}=req.body;

    const product={
      name,
      description,
      cost,
      categoryId
    };

    Product.create(product)
    .then((product)=>{
        res.status(201).send(product);
    })
    .catch((err)=>{
        res.status(500).send({message:err.message || "something went wrong"})
    })
}

exports.getAll=(req,res)=>{

    let productpromise=null;

    const{name,mincost,maxcost}=req.query;

    if(name){
       productpromise= Product.findAll({
           where:{ name:name}
       })
    }
   else if(mincost){
       productpromise=Product.findAll({
           where:{
               cost:{
                   [Op.gte]:mincost
               }
           }
       })
   }
   else if(maxcost){
    productpromise=Product.findAll({
        where:{
            cost:{
                [Op.lte]:maxcost
            }
        }
    })
   }
   else if(mincost && maxcost){
    productpromise=Product.findAll({
        where:{
            cost:{
                [Op.lte]:maxcost,
                [Op.gte]:mincost
            }
        }
    })
   }
    else{
        productpromise=Product.findAll();
    }
    productpromise
    .then((products)=>{
        res.send(products);
    })
    .catch((err)=>{
        res.status(500).send({message:err.message || "something went wrong"})
    })
}

exports.getOne=(req,res)=>{

    const productId=req.params.id;

    Product.findByPk(productId)
    .then((product)=>{
        if(!product){
            res.status(404).send({message:"product not found"});
        }
        res.send(product);
    })
    .catch((err)=>{
        res.status(500).send({message:err.message || "something went wrong"})
    })
}

exports.findproductsundercategory=(req,res)=>{

    const categoryId=req.params.categoryId;

    Product.findByPk(categoryId)
    .then((category)=>{
       
        Product.findAll({
            where:{categoryId:req.params.categoryId}
        })
        .then((products)=>{
            res.send(products)
        })
        .catch((err)=>{
            res.status(500).send({message:err.message || "something went wrong while getting the products."})
        })
        
    })
    .catch((err)=>{
        res.status(500).send({message:err.message || "something went wrong"})
    })
}


exports.findproductundercategory=(req,res)=>{

    const categoryId=req.params.categoryId;

    Product.findByPk(categoryId)
    .then((category)=>{
       
        Product.findByPk({
            where:{id:req.params.id}
        })
        .then((products)=>{
            res.send(products)
        })
        .catch((err)=>{
            res.status(500).send({message:err.message || "something went wrong while getting the products."})
        })
        
    })
    .catch((err)=>{
        res.status(500).send({message:err.message || "something went wrong"})
    })
}


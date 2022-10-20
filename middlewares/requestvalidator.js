
const { Category, Product}=require("../models");

 const validatecategoryrequest=(req,res,next)=>{
    if(!req.body.name){
        res.status(400).send({message:"Name of the Category can not be empty."});
        return;
    }
         next();
 }

 const validateproductrequest=(req,res,next)=>{
     
    if(!req.body.name || !req.body.cost){
        res.status(400).send({message:"name or cost of a product can not be empty."});
        return;
    }
    if(!req.body.categoryId){
        res.status(400).send({message:"categoryId of a product can not be empty."});
        return;
    }
    Category.findByPk(req.body.categoryId)
    .then((category)=>{
        if(!category){
            res.status(404).send({message:`Category with categoryId ${req.body.categoryId} does not exists`});
            return;
        }
        next();
    })
    .catch((err)=>{
        console.log(err);
        res.status(500).send({message:"something went wrong"})
    })
    }
 
  const validatecategorypaased=(req,res,next)=>{
    
      const categoryId=parseInt(req.params.categoryId);
      if(!categoryId){
          res.status(400).send({message:"categoryId is not passed or is of invalid data type."});
      }
      Category.findByPk(req.params.categoryId)
      .then((category)=>{
          if(!category){
              res.status(404).send({message:`Category with categoryId ${req.params.categoryId} does not exists`});
              return;
          }
          next();
      })
      .catch((err)=>{
          console.log(err);
          res.status(500).send({message:"something went wrong"})
      })

  }

  const validatecategoryandproductpaased=(req,res,next)=>{
    const categoryId=parseInt(req.params.categoryId);
    const productId=parseInt(req.params.productId);
    if(!categoryId){
        res.status(400).send({message:"categoryId is not passed or is of invalid data type."});
    }
    if(!productId){
        res.status(400).send({message:"productId is not passed or is of invalid data type."});
    }
    Category.findByPk(req.params.categoryId)
    .then((category)=>{
       Product.findByPk(req.params.productId)
       .then((product)=>{
           res.send(product)
       })
        
        next();
    })
    .catch((err)=>{
        console.log(err);
        res.status(500).send({message:"something went wrong"})
    })


  }

 module.exports={
     validatecategoryrequest,
     validateproductrequest,
     validatecategorypaased,
     validatecategoryandproductpaased
 }
const { INTEGER } = require("sequelize");


 module.exports=(Sequelize,sequelize)=>{
     const Product=sequelize.define("product",{

        id:{
            type:Sequelize.INTEGER,
            primaryKey:true,
            autoIncrement:true
        },
        name:{
            type:Sequelize.STRING,
            allowNull:false
        },
       description:{
           type:Sequelize.STRING,

       },
       cost:{
           type:Sequelize.INTEGER,
           allowNull:false
       },
    categoryId:{
        type:Sequelize.INTEGER
    }},
        {
         tablename:"products"
     });
     return Product;
 }
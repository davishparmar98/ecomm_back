const productcontroller=require("../controllers/product.controllers");
const { requestvalidator } = require("../middlewares");

module.exports=(app)=>{

    app.post("/ecomm/api/v1/product",requestvalidator.validateproductrequest,productcontroller.create);

    app.get("/ecomm/api/v1/product",productcontroller.getAll);

    app.get("/ecomm/api/v1/product/:id",productcontroller.getOne);

   //to get all the products under a category

   app.get("/ecomm/api/v1/category/:categoryId/product",requestvalidator.validatecategorypaased,productcontroller.findproductsundercategory);

   app.get("/ecomm/api/v1/category/:categoryId/product/:productId",requestvalidator.validatecategoryandproductpaased,productcontroller.findproductundercategory);
}
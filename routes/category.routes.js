const categorycontroller=require("../controllers/category.controllers");
const { requestvalidator } = require("../middlewares");

module.exports=(app)=>{

app.post("/ecomm/api/v1/category",requestvalidator.validatecategoryrequest,categorycontroller.create);

app.get("/ecomm/api/v1/category",categorycontroller.getAll);

app.get("/ecomm/api/v1/category/:id",categorycontroller.getOne);

app.put("/ecomm/api/v1/category/:id",categorycontroller.update);

app.delete("/ecomm/api/v1/category/:id",categorycontroller.delete);
}
const usercontroller=require("../controllers/user.controller")

module.exports=(app)=>{

    app.get("/ecomm/api/v1/users",usercontroller.findAll)
}
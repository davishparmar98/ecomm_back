const {signupvalidator}=require("../middlewares")
const authcontroller=require("../controllers/auth.controller")

module.exports=(app)=>{

    app.post("/ecomm/api/v1/auth/signup",[signupvalidator.checkduplicateemailorusername,signupvalidator.checkroles],authcontroller.signup)

    app.post("/ecomm/api/v1/auth/signin",authcontroller.signin)
}

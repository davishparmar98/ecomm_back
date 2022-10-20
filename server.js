const express = require("express");
const config = require("./configs/db.config");
const bodyParser = require("body-parser");
require("dotenv").config();
const {Role}=require("./models");
const authJWT=require("./middlewares");

const app = express();

app.use(bodyParser.json());

const db=require("./models");
const { verifytoken } = require("./middlewares/authJWT");




db.sequelize.sync({force:false})
.then(()=>{
    console.log("DB synced");
})


// Role.create({
//     id:1,
//     name:"user"
// });

// Role.create({
//     id:2,
//     name:"admin"
// });
require("./routes/auth.routes")(app);

app.use(verifytoken());
//imported category routes
require("./Routes/category.routes")(app);

require("./Routes/product.routes")(app);

require("./routes/user.routes")(app);
app.listen(process.env.PORT,()=>{
    console.log(`Application is running on port ${process.env.PORT}`);
})
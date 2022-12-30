const express = require("express");
const bodyParser = require("body-parser");
const {PORT} = require("./config/serverConfig");
const apiRoutes = require("./routes/index");
const db = require("./models/index");
// const { Role, User } = require("./models/index");

const startServer = () =>{
   const app = express();
   app.use(bodyParser.json());
   app.use(bodyParser.urlencoded({extended: true}));
   
   app.use('/api', apiRoutes);

   app.listen(PORT, async()=>{
    console.log(`Server is running on port ${PORT}`);
    
    if(process.env.DB_SYNC) {
        db.sequelize.sync({alter: true});
    }
    

    //Test for 'USER_ROLES'
    // const u1 =await User.findByPk(3);
    // const r1 =await Role.findOne({
    //     where: {
    //         name: 'CUSTOMER'
    //     }
    // });

    // u1.addRole(r1); //add`Model name'
    // const response = await u1.getRoles(); //get`Model name`
    // console.log(response);

   });
}

startServer();
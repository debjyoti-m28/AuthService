const express = require("express");
const bodyParser = require("body-parser");
const {PORT} = require("./config/serverConfig");
const apiRoutes = require("./routes/index");
// const UserService = require("./services/user-service");

const startServer = () =>{
   const app = express();
   app.use(bodyParser.json());
   app.use(bodyParser.urlencoded({extended: true}));
   
   app.use('/api', apiRoutes);

   app.listen(PORT, ()=>{
    console.log(`Server is running on port ${PORT}`);

   //  const userService = new UserService();
   //  const token = userService.createToken({email: 'deb@gmail.com', id:2});
   //  console.log("Token : ", token);
   // const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImRlYkBnbWFpbC5jb20iLCJpZCI6MiwiaWF0IjoxNjcyMzM3MDUxLCJleHAiOjE2NzIzNDA2NTF9.Hop8z9FcpHRqtT8sZq3JIlE9FJPbHzm0L2CHCc-9UKg'
   // const obj = userService.verifyToken(token);
   // console.log("decoded", obj);
   });
}

startServer();
/**
 * User controller
 */
const userModel  = require("../models/UserSchema");



const users = {}; //initialize our user object


users.login = (req, res) =>{
   const { email, password} = req.body.credentials;

   //Check if there are upcoming data
   if(!email || password){
     res.status(400);
     res.send({status:"error", error: "Email or Password is missing! "});
   }

   //Call userModel
   const userLogin = userModel.methods.login(email, password);
   

}

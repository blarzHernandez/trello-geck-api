/**
 * User controller
 */
const userModel  = require("../models/UserSchema");



const users = {}; //initialize our user object

/**
 * User Login
 */
users.login = (req, res) =>{
    
   const { email, password} = req.body;
   //Check if there are upcoming data
   if(!email || !password){
     res.status(400);
     res.send({status:"error", error: "Email or Password is missing! "});
   }

   userModel.findOne({email:email, password:password})
   .then(user => {      
       
       if(user && userModel.isValidPassword(password)){
           res.json({user:userModel.setJWTToken()});
       }else{
           res.status(400).json({status:"error", error:"Invalid Credentials"});
       }
   })
  


}


/**
 * User register
 */
users.saveUser = (req, res) =>{
    
    const { email, username, password } = req.body;
       
}



    
module.exports = users;
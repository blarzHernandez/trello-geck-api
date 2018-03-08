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

   userModel.findOne({email:email})
   .then(user => {      
       
       if(user && userModel.isValidPassword(password)){
           res.json({user:userModel.toAuthJSON(user) });
       }else{
           res.status(400).json({status:"error", error:"Invalid Data"});
       }
   })
  

}

/**
 * IN case we want to close sesssion via server
 */
users.logout = (req, res) =>{
    res.status(200).send({auth:false,token:null});
}


/**
 * User register
 */
users.saveUser = (req, res) =>{
    //pick up variables
    const { email, username, password } = req.body;
    const nUser = new User({email, username});
    nUser.setPassword(password);
    nUser.save()
        .then(user=>{
            res.json({
                user:email,
                token:userModel.toAuthJSON(user)
            });
        });


       
}



    
module.exports = users;
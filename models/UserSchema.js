const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

//######################## MONGOOSE SCHEMA #########################
const User = new mongoose.Schema({
    email:{
        type:String,
        unique:true,
        required:true
       
    },
    username:{
        type:String,
        unique:true,
        required:true
        
    },
    passwordHash:{
        type:String,
        required:true
    }
},{timestamps:true});


//######################## METHODS ##################################
var User = mongoose.model('User',UserSchema);
/**
 * Seed for users
 */
User.seed = function() {
   //set default password hash
    this.setPassword("123456");  
    var defaultUser = new User({
                                email:"blarz@gmail.com", 
                                username:'blarz',                               
                                passwordHash: this.getPasswordHash()});
    defaultUser.save(function(err, user) {
        console.log("Users seed saved.");
    if(err) console.dir('error occured in populating database' + err);
    });
}




//Compare the hash password
User.isValidPassword= password => {  
    return bcrypt.compareSync(password,this.passwordHash);
}

//Set password hash
User.setPassword = password =>{   
    const salt = bcrypt.genSaltSync();
    this.passwordHash = bcrypt.hashSync(password, salt);
   
}

User.getPasswordHash = () => {
    return this.passwordHash;
}


User.generateJWT = () => {
    return jwt.sign(
        {
        email:this.email,
        confirmed:true
        }, 'yoursecretkey123456abcde'
    );
}


User.toAuthJSON = () =>{
   return { 
       email:this.email
       //token:User.generateJWT()
   };
}




module.exports=User;
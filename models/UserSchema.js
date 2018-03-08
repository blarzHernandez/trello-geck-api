const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

//######################## MONGOOSE SCHEMA #########################
const UserSchema = new mongoose.Schema({
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
    this.passwordHash = bcrypt.hashSync(password, 10);
   
}

User.getPasswordHash = () => {
    return this.passwordHash;
}


User.generateJWT = () =>{
    return jwt.sign({
        email:this.email
    },process.env.JWT_SECRET || 'yoursecretkey');
}


User.setJWTToken = () =>{
   return {
       email:this.email,
       token:this.generateJWT()
   }
}




module.exports=User;
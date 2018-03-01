const mongoose = require("mongoose");
const bcryp = require("bcrypt");
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
    password:{
        type:String,
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
    this.setPassword("blarz");  
    var defaultUser = new User({
                                email:"blarz@gmail.com", 
                                username:'blarz', 
                                password:'123456',
                                passwordHash: this.getPasswordHash()});
    defaultUser.save(function(err, user) {
        console.log("Users seed saved.");
    if(err) console.dir('error occured in populating database' + err);
    });
}

/**
 * User register
 */
User.saveUser = (req, res) =>{
   
}

/**
 * User Login
 * @argument  
 */
User.login = (email, password) => {     
     //Look up user
    User.findOne({email, password})
        .then(user => {
            if(user && this.isValidPassword(password)){
                
            }
        });

}

/**
 * Logout 
 */

User.logout = sessionId => {

}

//Compare the hash password
User.isValidPassword= password => {
    return bcryp.compareSync(password,this.passwordHash);
}

//Set password hash
User.setPassword = password =>{
   
    this.passwordHash = bcryp.hashSync(password, 10);
   
}

User.getPasswordHash = () => {
    return this.passwordHash;
}


User.generateJWT = () =>{
    
}




module.exports=User;
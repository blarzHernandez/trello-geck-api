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

/**
 * Seed for users
 */
UserSchema.methods.seed = function() {
    var defaultUser = new User({email:"blarz@gmail.com", username:'blarz', password:'123456'});
    defaultUser.save(function(err, user) {
        console.log("Users seed saved.");
    if(err) console.dir('error occured in populating database');
    });
}

/**
 * User register
 */
UserSchema.methods.create = (req, res) =>{
   
}

/**
 * User Login
 * @argument  
 */
UserSchema.methods.login = (email, password) => {     
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

UserSchema.methods.logout = sessionId => {

}

//Compare the hash password
UserSchema.methods.isValidPassword= password => {
    return bcryp.compareSync(password,this.passwordHash);
}

//Set password hash
UserSchema.methods.setPassword = password =>{
    this.passwordHash = bcryp.hashSync(password, 10);
}


UserSchema.methods.generateJWT = () =>{
    
}



//var User = mongoose.model('User',UserSchema);
module.exports=mongoose.model('User',UserSchema);
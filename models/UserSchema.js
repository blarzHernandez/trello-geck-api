var mongoose = require("mongoose");
//Create a new instance of mongoose
//var Schema = mongoose.Schema();
var UserSchema = new mongoose.Schema({
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

    }
});




var User = mongoose.model('User',UserSchema);

var userModel = {};

userModel.seed = function() {
    var defaultUser = new User({email:"blarz@gmail.com", username:'blarz', password:'123456'});
    defaultUser.save(function(err, user) {
        console.log("Saving...");
    if(err) console.dir('error occured in populating database');
    });
}


module.exports=userModel;
var mongoose = require("mongoose");
//Create a new instance of mongoose
var Schema = mongoose.Schema();
var UserSchema = new Schema({
    email:{
        type:String,
        unique:true,
        required:true,
        trim:true
    },
    username:{
        type:String,
        unique:true,
        required:true,
        trim:true
    },
    password:{
        type:String,
        required:true

    }
});

var User = mongoose.model('User',UserSchema);
module.exports=User;
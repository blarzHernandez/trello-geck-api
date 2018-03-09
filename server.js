
/**
 * Entry API
 */
const express = require("express")///invoke express framework
const app = express();//define our app using express
const mongoose = require("mongoose");
const keys = require('./config/keys');
const Promise = require('bluebird');
//const mongoDb = require("mongodb");
mongoose.Promise = Promise;

const bodyParser = require("body-parser");//to parser incoming resquest bodies
const morgan = require("morgan");

//Connect to mongoDB
mongoose.connect(keys.MONGO_URI,{useMongoClient:false});


//const db = mongoose.connection;
mongoose.connection.on("error",console.error);
mongoose.connection.once("open",function(){
    console.log("Successfully connected to the Database");
    
});


//Config
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use(morgan("dev"));//Logger 


//handling routes
const routes = require("./routes");
const authRoute = require("./routes/auth");
const userRoute = require("./routes/user");
const User = require('./models/UserSchema');

//Default Users ...seeds
console.log(User.seed());

app.use("/",routes);//home route
app.use("/api/user",authRoute);//authentication route
app.use("/api/user",userRoute);//user routes

const port = process.env.PORT || 3001;

app.listen(port, ()=>{
 console.log(`Express Server running On port: ${port}`);
});
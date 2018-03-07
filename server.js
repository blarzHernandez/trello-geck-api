
/**
 * Entry API
 */
const express = require("express")///invoke express framework
const app = express();//define our app using express
const mongoose = require("mongoose");
const keys = require('./config/keys');
//const mongoDb = require("mongodb");
mongoose.Promise = global.Promise;

const bodyParser = require("body-parser");//to parser incoming resquest bodies
const morgan = require("morgan");
console.log("Node_env",keys.NODE_ENV);
//Connect to mongoDB
mongoose.connect(keys.MONGO_URI,{useMongoClient:true});


//const db = mongoose.connection;
mongoose.connection.on("error",console.error);
mongoose.connection.once("open",function(){
    console.log("Successfully connected to the Database");
    
});


///Just mongoDB
/*mongoDb.MongoClient.connect(`mongodb://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@ds249428.mlab.com:49428/heroku_8pxz75t5`,(error, db)=>{
console.log(error);
});*/


//Config
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use(morgan("dev"));//Logger 


//handling routes
const routes = require("./routes");
const authRoute = require("./routes/auth");
const User = require('./models/UserSchema');

//Default Users
console.log(User.seed());

app.use("/",routes);//home route
app.use("/auth",authRoute);//authentication route


const port = process.env.PORT || 3001;
//const host = "localhost";


app.listen(port, ()=>{
 console.log(`Express Server running On port: ${port}`);
});
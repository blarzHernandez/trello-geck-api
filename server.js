
/**
 * Entry API
 */
const express = require("express")///invoke express framework
const app = express();//define our app using express
const mongoose = require("mongoose");


const bodyParser = require("body-parser");//to parser incoming resquest bodies
const morgan = require("morgan");

//Connect to mongoDB
const db = mongoose.connection;
db.on("error", console.error);
mongoose.connect(`mongodb://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}:@ds249428.mlab.com:49428/heroku_8pxz75t5`)


//Config
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
app.use(morgan("dev"));//Logger 


//handling routes
const routes = require("./routes");
const authRoute = require("./routes/auth");

app.use("/",routes);//home route
app.use("/login",authRoute);//authentication route


const port = process.env.PORT || 3001;
//const host = "localhost";


app.listen(port, ()=>{
 console.log(`Express Server running On port: ${port}`);
});

/**
 * Entry API
 */
const express = require("express")///invoke express framework
 app = express();//define our app using express


const bodyParser = require("body-parser");//to parser requests
const morgan = require("morgan");

//Config
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
app.use(morgan("dev"));//Logger 


//handling routes
const routes = require("./routes");
app.use("/",routes);


const port = process.env.PORT || 3001;
//const host = "localhost";


app.listen(port, ()=>{
 console.log(`Express Server running On port: ${port}`);
});
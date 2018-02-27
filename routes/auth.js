const express = require("express");
const auth = require("../controllers/authController");
const authRouter = express.Router();


//router.get("/register", auth.register);
authRouter.get("/", (req, res)=>{
    res.send("Ok");
});

module.exports = authRouter;
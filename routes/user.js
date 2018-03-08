const express = require("express");
const users = require("../controllers/userController");
const userRouter = express.Router();


//Users register
authRouter.post("/register",users.saveUser);
const express = require("express");
const users = require("../controllers/userController");
const authRouter = express.Router();


//router.get("/register", auth.register);
authRouter.post("/login",users.login);

module.exports = authRouter;
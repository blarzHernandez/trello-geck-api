const express = require("express");
const router = express.Router();

//get method / home
router.get("/",(req, res) => {
    res.status(200).send("Welcome Geckos Team 25, this the trello-geck-api");
});


//not found
/*router.get("*", (req, res)=>{
    res.status(404).send("<h1>Page not Found!</h1>")
})*/

module.exports = router;
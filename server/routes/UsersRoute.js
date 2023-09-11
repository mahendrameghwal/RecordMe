const express = require("express");
const router = express.Router();
const {Login, Register, Logout}  = require("../controllers/User.controller");

router.post("/register",Register)
router.post("/login",Login)
router.post("/logout",Logout)


module.exports = router;
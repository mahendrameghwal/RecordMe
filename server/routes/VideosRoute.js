const express = require("express");
const router = express.Router()
const {CreateVideo,GetVideo} = require("../controllers/Video.controller");
const Verfiytoken = require("../middleware/Verfiytoken");
const verifyToken = require("../middleware/Verfiytoken");

router.post("/video/:id",Verfiytoken,CreateVideo);
router.get("/getvideo",verifyToken, GetVideo);


module.exports = router;


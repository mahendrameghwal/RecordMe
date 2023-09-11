const express = require("express");
const app = express();
const PORT = 8800 || 8000;
const bodyparser = require("body-parser");
const ConnectDB = require("./config/Dbconfig");
const cookieParser = require('cookie-parser');
const cors = require("cors");

require('dotenv').config()

ConnectDB()



app.use(cors());
app.use(cookieParser());
app.use(bodyparser.json())
app.use(express.json());



// error handling
app.use((err,req,res,next)=>{
    const errorStatus = err.status || 500;
    const errorMesaage = err.message || "something went wrong"
    return res.status(errorStatus).send(errorMesaage);
})

const UsersRoutes = require("./routes/UsersRoute");
const VideosRoute = require("./routes/VideosRoute");

app.use("/api/users", UsersRoutes);
app.use("/api/upload",VideosRoute);


app.get("/",(req,res)=>{
    res.status(200).send("working ok !")
})
app.listen(PORT, ()=>{
    console.log(`listen on port ${PORT}`);
})
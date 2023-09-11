const mongoose = require("mongoose")
const { Schema } = mongoose;

const VideoSchema = new Schema({
  VideoId: {type:String , required:true}, 
  VideoURL: {type:String , required:true}
});

const Videomodel =  mongoose.model("videos",VideoSchema)
module.exports = Videomodel ;
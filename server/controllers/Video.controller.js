const CreateAsyncError = require("../CreateAsyncError");
const videoModel = require("../model/VideoModel")


const CreateVideo = async (req, res, next) => {
 const {id}= req.params


    try {
        if (req.userId === id) {
            const NewVideo = new videoModel({ ...req.body });
            await NewVideo.save();
            return res.status(201).send("video uploaded successfull");

        } else
      return await res.status(401).send("unauthorized user access")
    } catch (error) {
        return next(CreateAsyncError(500, "something went wrong"))
    }
}



const GetVideo = async (req, res, next) => {


    try {
        if (req.userId) {
            const Videos = await videoModel.find({ VideoId: req.userId });
            return res.status(200).send(Videos)
        }
        else {
            return res.status(404).send('not dound any video')
        }

    }
    catch (error) {
        return next(CreateAsyncError(500, "something went wrong"))

    }



}


module.exports = { CreateVideo, GetVideo };

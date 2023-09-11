
import { useEffect, useRef, useState } from 'react';
import cloudinaryConfig from '../config/CloudConfig';
import "./video.css"
import { useNavigate } from 'react-router-dom';
import Request from '../../utils/Request';
import toast, { Toaster } from 'react-hot-toast';

function VideoJSComponent() {
  const navigate =useNavigate();

  
  

  const videoRef = useRef(null);
  const webcamRef = useRef(null);
  const [ err, setErr ] = useState(null);
  const [ mediaRecorder, setMediaRecorder ] = useState(null);
  const [ screenStream, setScreenStream ] = useState(null);
  const [ webcamStream, setWebcamStream ] = useState(null);
  const [ recording, setRecording ] = useState(false);
  const [ videoUrl, setVideoUrl ] = useState(null);
  const [ videoBlob, setVideoBlob ] = useState(null)
  

  const constraints = {
    video: true,
    audio: true,
    displaySurface: "monitor",
    logicalSurface: true,
  };
  
  //for permission
  const requestPermissions = async () => {
    try {
      await navigator.mediaDevices.getUserMedia({
        video: false,
        audio: false,
      });
    } catch (error) {
      console.error('Permission denied:', error.message);

    }
  };
  
  
  useEffect(() => {
    requestPermissions()
  }, [])
  
  
  // start recording
  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getDisplayMedia(constraints);
      videoRef.current.srcObject = stream;
      setScreenStream(stream);

      const webcamStream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: true,
      });
      webcamRef.current.srcObject = webcamStream;
      setWebcamStream(webcamStream);

      const chunks = [];
      const recorder = new MediaRecorder(stream);
      setMediaRecorder(recorder);

      recorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          chunks.push(event.data);
        }
      };
      
      // stop recording
      recorder.onstop = async () => {
        const blob = new Blob(chunks, { type: 'video/mp4' });
        setVideoBlob(blob)
        const videoURL = URL.createObjectURL(blob);
        setVideoUrl(videoURL);
        const blobOptions = { type: 'video/mp4' };
        const videoBlob = new Blob(chunks, blobOptions);

        //upload video to cloudnary
        const formData = new FormData();
        formData.append('file', videoBlob);
        formData.append('upload_preset', 'video_preset')
        try {

          const response = await fetch(import.meta.env.VITE_CLOUDNAIRY_URL, {
            method: 'POST',
            body: formData,
          });

          if (response.ok) {
            const cloudinaryData = await response.json();
            {/** secure true for https */}
            const cloudinaryUrl = cloudinaryConfig.url(cloudinaryData.public_id, {
              resource_type: 'video',
              secure: true, 
              quality: 'auto:good', 
              width: 640, 
              height: 480,
              crop: 'scale',
              format: 'mp4',
              audio_codec: 'aac'
            });
            
            UplodToDatabse(cloudinaryUrl)
            
          } else {
            console.error('Failed to upload video to Cloudinary.');
          }
        } catch (error) {
          console.error('Error uploading to Cloudinary:', error);
        }


      };

      recorder.start();
      setRecording(true);
    } catch (error) {
      console.error(error);
      setErr(error.message);
    }
  };


  // stop recordding
  const stopRecording = async () => {
    if (mediaRecorder) {
      mediaRecorder.stop();
      setRecording(false);
      screenStream.getTracks().forEach((track) => track.stop());
      webcamStream.getTracks().forEach((track) => track.stop());
    }
  };
  //download video 
  const downloadVideo = () => {

    if (videoUrl) {
      const a = document.createElement('a');
      a.href = videoUrl;
      a.download = 'recorded-video.mp4';
      a.click();
    }
  };


//upload to server
async function UplodToDatabse (URL){

 
  
  try {
   if (URL) {
     
       const user = localStorage.getItem("user");
       const token= JSON.parse(user).token;
       const Userinfo = JSON.parse(user).info;
     
       const Videodata = {
      VideoId:Userinfo._id,
        VideoURL:URL
       }
      
       const config = { headers: { Authorization: "Bearer " + token } };
  const Uploded = await Request.post(`/upload/video/${Userinfo._id}`,Videodata,config);
  if (Uploded) {
    toast.success('successfully uploded', {
      style: {
        border: '1px solid #713200',
        padding: '16px',
        color: '#713200',
      },
      iconTheme: {
        primary: '#713200',
        secondary: '#FFFAEE',
      },
    });
  } else{
    toast.error("uploaded failed")
  }

   }
    
  } catch (error) {
    toast.error(err.response.data)
  }
}




  return (
    <main className=' main h-screen max-h-full '>
    <Toaster position="top-center" reverseOrder={false}/>
      <div className="wrapper-1 ">
        <button onClick={startRecording} className='dark:bg-white dark:text-black mx-3 my-3' id="startRecording">Start Recording</button>
        <button onClick={stopRecording} className='dark:bg-white dark:text-black mx-3 my-3' id="startRecording">stop Recording</button>
        <button onClick={downloadVideo} className='dark:bg-white dark:text-black mx-3 my-3' id="downloadButton">Download</button>
        <button onClick={()=>{navigate("/profile")}} className='dark:bg-white dark:text-black mx-3 my-3' id="downloadButton">Show Profile</button>

      </div>
      <div className="flex flex-wrap items-center my-5 gap-x-2 justify-between max-lg:gap-y-9 max-md:flex-col">
        <div className="w-1/3  shadow-lg max-lg:my-4 max-lg:w-screen mx-auto">
        <p className='text-black dark:bg-black dark:text-white text-center'>Screen Recorder</p>
          {
            <video ref={videoRef} id="recorded" autoPlay playsInline muted controls={false} />
          }
        </div>
        <div className="w-1/3  shadow-lg max-lg:my-4 max-lg:w-screen mx-auto">
          <p className='text-black dark:bg-black dark:text-white text-center'>User Webcam</p>
          {
            <video ref={webcamRef} id="webcam" autoPlay playsInline muted controls={false} />
          }
        </div>
      </div>

      {
        err && <p className=' text-red-500 font-semibold text-xl '>{toast.error(err)}</p>
      }
    </main>
  );
}

export default VideoJSComponent;

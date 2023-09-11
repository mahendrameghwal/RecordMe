import { useEffect } from "react"
import VideoJSComponent from "../components/VideoJSComponent"
import { useNavigate } from "react-router-dom"


const Homepage = () => {
  const token = localStorage.getItem("user")
  const navigate = useNavigate()


 useEffect(()=>{
token ? navigate("/"): navigate("/login")

 },[token])
  
  return (
    <div>
    <VideoJSComponent/>
    </div>
  )
}

export default Homepage
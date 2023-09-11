import { useState } from "react"
import Request from "../../utils/Request"
import toast, { Toaster } from 'react-hot-toast';
import { useNavigate } from "react-router-dom";

const Register = () => {
const [email, setemail] = useState(null)
const [username, setusername] = useState(null)
const [password, setpassword] = useState(null)


const navigate = useNavigate()

const HandleSubmit = async e => {
  e.preventDefault();
  
  const Users = {
     email,
    username,
     password,
  };

  try {
    const res = await Request.post("/users/register", Users);

    toast.success(res.data.data);
    navigate("/login")
  } catch (err) {
  
    toast.error(err.response.data)
  }
};


    return (
      <div className="dark:text-white dark:bg-gray-900 bg-gray-100 flex items-center justify-center h-screen ">
      <Toaster
  position="top-center"
  reverseOrder={false}
/>
      <section className=" w-1/3 max-lg:w-2/4 max-md:w-4/5 max-sm:w-5/6 border border-black dark:border-white  px-9 rounded-sm ">
      <div className="text-center py-2"><span className="underline text-2xl dark:text-white underline-offset-2 text-black">Create Acount</span></div>

      <div className="flex  flex-col my-6 max-md:my-2">
      <label className="py-2 text-black dark:text-white font-semibold">Name</label>
      <input onChange={(e)=>{setusername(e.target.value)}} name="username" value={username|| ""} className="bg-gray-300 dark:bg-slate-300  placeholder:text-gray-500 placeholder:dark:text-gray-700 text-black outline-none px-4 py-2" type="text" placeholder="example@123" />
      </div>
        <div className="flex  flex-col my-6 max-md:my-2">
        <label className="py-2 text-black dark:text-white font-semibold">Your email</label>
        <input onChange={(e)=>{setemail(e.target.value)}} required name="email" value={email || ""} className="bg-gray-300 dark:bg-slate-300  placeholder:text-gray-500 placeholder:dark:text-gray-700 text-black outline-none px-4 py-2" type="email" placeholder="examlple@gmail.com" />
        </div>
  
        <div className="flex flex-col  my-6 max-md:my-2">
        <label className="py-2 text-black dark:text-white font-semibold">Password</label>
        <input onChange={(e)=>{setpassword(e.target.value)}}  required name="password" value={password || ""}  className="bg-gray-300 dark:bg-slate-300  placeholder:text-gray-500 placeholder:dark:text-gray-700 text-black outline-none px-4 py-2" type="password" placeholder="password" />
        </div>
        <div className="flex  flex-col my-6 max-md:my-2">
        <button onClick={HandleSubmit} className="py-2 dark:bg-slate-300 dark:text-black bg-gray-700 text-white font-semibold">Create Acount</button>
        </div>
        <div className="flex  flex-col my-6 max-md:my-2">
        <button onClick={()=>{navigate("/login")}} className="py-2 dark:bg-slate-300 dark:text-black bg-gray-700 text-white font-semibold">Login</button>
        </div>
      </section>
      
      </div>
    )
  }
  
  export default Register
  
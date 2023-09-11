import { useNavigate } from "react-router-dom"
import Request from "../../utils/Request"
import {useState } from "react"
import toast, { Toaster } from 'react-hot-toast';

const Register = () => {
  const [email, setemail] = useState(null)
  const [password, setpassword] = useState(null)
  const [cstumerr, setcstumerr] = useState(null)

  const navigate = useNavigate();

  const HandleLogin = async e => {
    e.preventDefault();
    
    const Users = {
       email,
       password,
    };
  
    try {
      const res = await Request.post("/users/login", Users);
      if (res.data.token) {
        
        localStorage.setItem("user",JSON.stringify(res.data));
        navigate("/")
        
      }else{
        navigate("/login")
      }
        
    
    } catch (err) {
  
      toast.error(err.response.data)
    }
  };


  

    return (
      <div className="dark:text-white dark:bg-gray-900 bg-gray-100 flex items-center justify-center h-screen ">
      <Toaster
      position="top-center"
      reverseOrder={false}/>
      <section className=" w-1/3 max-lg:w-2/4 max-md:w-4/5 max-sm:w-5/6 border border-black  dark:border-white  px-9 rounded-sm ">
      <div className="text-center py-2"><span className="underline underline-offset-2 text-2xl dark:text-white text-black">Login</span></div>

        <div className="flex  flex-col my-6 max-md:my-4">
        <label className="py-2 text-black dark:text-white font-semibold">Your email</label>
        <input onChange={(e)=>{setemail(e.target.value)}} name="email" value={email|| ""} className="bg-gray-300 dark:bg-slate-300  placeholder:text-gray-500 placeholder:dark:text-gray-700 text-black outline-none px-4 py-2" type="email" placeholder="examlple@gmail.com" />
        </div>
  
        <div className="flex flex-col  my-6 max-md:my-4">
        <label className="py-2 text-black dark:text-white font-semibold">Password</label>
        <input onChange={(e)=>{setpassword(e.target.value)}} name="password" value={password|| ""} className="bg-gray-300 dark:bg-slate-300  placeholder:text-gray-500 placeholder:dark:text-gray-700 text-black outline-none px-4 py-2" type="password" placeholder="password" />
        </div>
        <div className="flex  flex-col my-6 max-md:my-4">
        <button onClick={HandleLogin} className="py-2 dark:bg-slate-300 dark:text-black bg-gray-700 text-white font-semibold">Log in</button>
        </div>
        <div className="flex  flex-col my-6 max-md:my-4">
        <button onClick={()=>{navigate("/register")}} className="py-2 dark:bg-slate-300 dark:text-black bg-gray-700 text-white font-semibold">Register</button>
        </div>
      </section>
      
      </div>
    )
  }
  
  export default Register
  
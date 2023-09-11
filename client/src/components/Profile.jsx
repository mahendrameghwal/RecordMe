import { useEffect, useState } from "react";
import { Link,  useNavigate } from "react-router-dom";
import Request from "../../utils/Request";

const Profile = () => {
const [videos , setvideos]= useState(null)
const [User , setUser]= useState(null)

const navigate = useNavigate();

const Getinformation = async () => {
    const user = JSON.parse(localStorage.getItem("user"));
      setUser(user)
      const config = { headers: { Authorization: "Bearer " + user?.token } };
      const Videos = await Request.get("/upload/getvideo", config);
      setvideos(Videos.data)
      
    };
    
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
      user ? navigate("/profile") : navigate("/login");
      Getinformation();
    }, [User?.token]);

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <div className="main h-screen max-h-full ">
      <div className=" mb2 shadow overflow-hidden sm:rounded-lg">
        <div className="border-t  border-gray-200">
          <dl>
            <div className="bg-gray-50 dark:bg-slate-900 flex justify-between border  dark:text-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <p className="dark:text-white text-2xl font-bold ">
                User Profile
              </p>{" "}
              <Link to={"/"}>
                <button className="dark:text-white text-xl font-bold ">
                  Home
                </button>
              </Link>
              <button
                onClick={handleLogout}
                className="dark:text-white text-xl font-bold "
              >
                logut
              </button>
            </div>
            <div className="bg-gray-50 dark:bg-slate-900  dark:text-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500 dark:text-white">
                userId
              </dt>
              <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2 dark:text-white">
                {User?.info?._id}
              </dd>
            </div>
            <div className="bg-gray-50 dark:bg-slate-900  dark:text-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500 dark:text-white">
                User Name
              </dt>
              <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2 dark:text-white">
              {User?.info?.email}
              </dd>
            </div>
            <div className="bg-white dark:bg-slate-900  px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500 dark:text-white">
                University
              </dt>
              <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2 dark:text-white">
                Institue of Technology & Management  <span className="bg-red-800 text-red-100 mx-3 px-1 py-1 rounded-md">(default )</span>
              </dd>
            </div>
            <div className="bg-gray-50 dark:bg-slate-900  dark:text-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500 dark:text-white">
                Email
              </dt>
              <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2 dark:text-white">
              {User?.info?.email}
              </dd>
            </div>
            <div className="bg-white dark:bg-slate-900  px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500 dark:text-white">
                All videos
              </dt>
              <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2 dark:text-white">
                {videos?.length < 1 ? 0 : videos?.length}
              </dd>
            </div>
          </dl>
        </div>
      </div>

      <div className="px-2 my-2 grid grid-cols-2 max-sm:grid-cols-1 md:grid-cols-3 gap-4">
      {videos && videos.length === 0 && <p>No videos found</p>}
      {videos && videos.map((video) => (
        <div key={video._id}>
        <video  controls>
        <source src={video.VideoURL}  type="video/mp4"/>
      </video>
          
        </div>
      ))}

      
  
      </div>
      
    </div>
  );
};

export default Profile;

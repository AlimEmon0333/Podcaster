import React from "react";
import headphones from "../assets/headphones.png";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const Home = () => {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  return (
    <div className="bg-green-100 px-12 h-screen lg:h-[86vh] flex flex-col justify-center items-center">
      <div className="w-full flex items-center justify-between gap-4">
        <div className="w-full lg:w-5/6">
          <h1 className="text-3xl md:text-6xl  lg:text-8xl font-bold flex flex-col items-center lg:items-start  ">
            Create & Listen the
            <h2 className="flex items-center justify-center lg:justify-start ">
              P
              <span>
                <img
                  src={headphones}
                  className="h-10 md:h-12 lg:h-20 lg:mx-2"
                  alt=""
                />
              </span>
              dcasts.
            </h2>
          </h1>
        </div>
        <div className="hidden lg:block w-1/6">
          <div className="px-4 py-6 border border-black font-semibold rounded-full text-center bg-white text-xl -rotate-90 tracking-widest">
            It's Podcaster
          </div>
        </div>
      </div>
      <div className="w-full mt-12 flex items-center justify-between flex-col lg:flex-row">
        <div className="flex flex-col justify-center">
          <p className="text-xl font-semibold text-center lg:text-end">
            Listen to the most popular podcasts on just one platform -{" "}
            <b>PODCASTER</b>
          </p>
         {isLoggedIn ? ("") : (<Link to={"/login"} className="px-6 py-4 bg-green-800 text-white font-semibold rounded-full mt-8">
            Login to listen
          </Link>)} 
        </div>
        <div className="lg:mt-0 mt-8">
          <p className="text-zinc-700 font-semibold text-center lg:text-end">
            Our App Contains More than 2000 Podcasts For you
          </p>
        </div>
      </div>
    </div>
  );
};

export default Home;

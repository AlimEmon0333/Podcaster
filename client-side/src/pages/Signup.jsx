import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { Bounce, ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import { useSelector } from "react-redux";
import Err404page from "./Err404page";

const Signup = () => {
   const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const navigate = useNavigate();
  const [loading, setloading] = useState(false);
  const [values, setValues] = useState({
    username: "",
    email: "",
    password: "",
  });
  const onChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };
  const HaandleSubmit = async () => {
    try {
      setloading(true);
      const res = await axios.post(
        "http://localhost:2000/api/v1/sign-up/",
        values
      );
      setloading(false);
      navigate("/login")
    } catch (error) {
      toast.error(error.response.data.message);
      setloading(false);
    }
  };
  return (
   <div>
   {isLoggedIn ? <Err404page/> :<div className="h-screen bg-green-100 flex items-center justify-center">
      <ToastContainer
        position="bottom-left"
        draggable
        pauseOnHover
        closeOnClick
      />
      <div className="w-5/6 lg:w-2/6 flex flex-col justify-center items-center">
        <Link to={"/"} className="text-2xl font-bold">
          PODCASTER
        </Link>
        <div className="mt-10 w-full">
          <div className="w-full flex flex-col">
            <label htmlFor="username" className="font-bold">
              Username*
            </label>
            <input
              type="text"
              className="mt-2 px-4 py-3 outline-none border border-gray-500 rounded-xl text-lg lg:text-xl font-serif"
              placeholder="eg. muhammadali"
              required
              name="username"
              value={values.username}
              onChange={onChange}
            />
            <label htmlFor="email" className="font-bold mt-4">
              Email*
            </label>
            <input
              type="email"
              className="mt-2 px-4 py-3 outline-none border border-gray-500 rounded-xl text-lg lg:text-xl font-serif"
              placeholder="eg. muhammadali@example.com"
              name="email"
              required
              value={values.email}
              onChange={onChange}
            />
            <label htmlFor="password" className="font-bold mt-4">
              Password*
            </label>
            <input
              type="password"
              className="mt-2 px-4 py-3 outline-none border border-gray-500 rounded-xl text-lg lg:text-xl font-serif"
              placeholder="eg. *********"
              name="password"
              required
              value={values.password}
              onChange={onChange}
            />
            <div className="w-6/6 flex flex-col justify-center items-center">
              {loading ? (
                <Box sx={{ display: "flex" }}>
                  <CircularProgress />
                </Box>
              ) : (
                <button
                  onClick={HaandleSubmit}
                  className="px-20 py-3 rounded-full font-bold bg-green-900 outline-none border-none text-white my-8 transition-all duration-200  hover:bg-green-700"
                >
                  Signup
                </button>
              )}
            </div>
            <div className="w-6/6 flex flex-col justify-center items-center">
              <p className="font-medium">
                Already Have an Account? Let's{" "}
                <Link
                  to={"/login"}
                  className="font-bold transition-all duration-200  hover:text-blue-600"
                >
                  Login
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div> } 
   </div>

  );
};

export default Signup;

import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { Bounce, ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import { useDispatch, useSelector } from "react-redux";
import { authActions } from "../store/auth";
import Err404page from "./Err404page";

const Login = () => {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [loading, setloading] = useState(false);
  const [values, setValues] = useState({
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
        "https://podcaster-smoky-theta.vercel.app/api/v1/sign-in/",
        values,
        { withCredentials: true }
      );
      setloading(false);
      navigate("/profile");
      dispatch(authActions.login());
    } catch (error) {
      toast.error(error.response.data.message);
      setloading(false);
    }
  };

  return (
    <div>
      {isLoggedIn ? (
        <Err404page />
      ) : (
        <div className="h-screen bg-green-100 flex items-center justify-center">
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
                <label htmlFor="email" className="font-bold mt-4">
                  Email*
                </label>
                <input
                  type="email"
                  className="mt-2 px-4 py-3 outline-none border border-gray-500 rounded-xl text-lg lg:text-xl font-serif"
                  placeholder="eg. muhammadali@example.com"
                  required
                  name="email"
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
                  required
                  name="password"
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
                      Login
                    </button>
                  )}
                </div>
                <div className="w-6/6 flex flex-col justify-center items-center">
                  <p className="font-medium">
                    New at Podcaster? Let's{" "}
                    <Link
                      to={"/signup"}
                      className="font-bold transition-all duration-200  hover:text-blue-600"
                    >
                      Signup
                    </Link>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Login;

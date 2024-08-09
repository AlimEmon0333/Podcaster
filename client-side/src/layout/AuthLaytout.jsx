import React from "react";
import Signup from "../pages/Signup";
import { Outlet } from "react-router-dom";

const AuthLaytout = () => {
  return (
    <div>
  <Outlet/>
    </div>
  );
};

export default AuthLaytout;

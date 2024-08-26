import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch } from 'react-redux';
import { authActions } from './../../store/auth';
import { useNavigate } from 'react-router-dom';

const Header = () => {
  const [userData, setuserData] = useState({});
  const dispatch = useDispatch()
  const navigate = useNavigate()
  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const res = await axios.get(
          "http://localhost:2000/api/v1/user-details",
          { withCredentials: true }
        );
        setuserData(res.data.user);
      } catch (error) {
      }
    };

    fetchUserDetails();
  }, []);
const LogoutUser = async () => {
  try {
    const res = await axios.post("http://localhost:2000/api/v1/log-out", null, {
      withCredentials: true,
    });
    dispatch(authActions.logout());
    navigate("/");
  } catch (error) {
  }
};


  return (
    <div>
      {userData && (
        <div className="bg-green-900 py-8  flex flex-col md:flex-row items-center justify-center gap-4 md:justify-between px-4 lg:px-12">
          <div className="flex flex-col items-center md:items-start">
            <p className="text-zinc-300 text-xl">Profile</p>
            <h1 className="text-3xl md:text-4xl mt-3 lg:text-5xl text-zinc-100 font-thin text-center">
              {userData.username}
            </h1>
            <p className="text-zinc-300 mt-3 text-xl font-thin">
              {userData.email}
            </p>
          </div>
          <div className="bg-white px-6 py-2 rounded text-zinc-800 font-semibold hover:shadow-xl cursor-pointer transition-all duration-300" onClick={LogoutUser}> 
            Logout
          </div>
        </div>
      )}
    </div>
  );
};

export default Header;

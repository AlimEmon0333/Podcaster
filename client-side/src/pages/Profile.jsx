import React from "react";
import { useSelector } from "react-redux";
import Err404page from "./Err404page";
import Header from "../components/Profile/Header";
import UserPodcasts from "../components/Profile/UserPodcasts";

const Profile = () => {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  return (
    <div>
      {isLoggedIn ? (
        <div>
          <Header />
          <UserPodcasts />
        </div>
      ) : (
        <Err404page />
      )}
    </div>
  );
};

export default Profile;

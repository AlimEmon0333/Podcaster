import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MainLayout from "./layout/MainLayout";
import Home from "./pages/Home";
import AuthLaytout from "./layout/AuthLaytout";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Categories from "./pages/Categories";
import Profile from "./pages/Profile";
import axios from "axios";
import { useDispatch } from "react-redux";
import { authActions } from "./store/auth";
import AddPodcast from "./pages/AddPodcast";
import AllPodcasts from "./pages/All-Podcasts";
import CategoryPage from "./pages/CategoryPage";
import PodcastDescription from "./pages/PodcastDescription";

const App = () => {
  const dispatch = useDispatch()
  useEffect(() => {
    const fetchCookie = async () => {
      try {
        const res = await axios.get(
          "https://podcaster-smoky-theta.vercel.app/api/v1/check-cookie",
          { withCredentials: true }
        );
        if (res.data.message == true) {
          dispatch(authActions.login());
        }
      } catch (error) {
      }
    };
    fetchCookie();
  }, []);

  return (
    <div className="">
      <Router>
        <Routes>
          <Route path="/" element={<MainLayout />}>
            <Route index element={<Home />} />
            <Route path="/categories" element={<Categories />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/add-podcast" element={<AddPodcast />} />
            <Route path="/allPodcasts" element={<AllPodcasts />} />
            <Route path="/category/:cat" element={<CategoryPage />} />
            <Route path="/description/:id" element={<PodcastDescription />} />
          </Route>
          <Route path="/" element={<AuthLaytout />}>
            <Route path="/signup" element={<Signup />} />
            <Route path="/login" element={<Login />} />
          </Route>
        </Routes>
      </Router>
    </div>
  );
};

export default App;

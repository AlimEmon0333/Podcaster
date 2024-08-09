import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import PodcastCard from "../allPodcasts/PodcastCard";
import axios from "axios";

const UserPodcasts = () => {
  const [Podcasts, setPodcasts] = useState([]);
  useEffect(() => {
    const allPodcasts = async () => {
      try {
        const response = await axios.get(
          "http://localhost:2000/api/v1/get-user-podcasts"
          ,{withCredentials:true}
        );
        console.log(response);
        setPodcasts([...response.data.data]);
      } catch (error) {
        console.log(error);
      }
    };
    allPodcasts();
  }, []);
  return (
    <div className="px-4 lg:px-12 my-4">
      <div className="flex items-center justify-between gap-4">
        <h1 className="text-xl font-semibold md:font-bold">Your Podcasts</h1>
        <Link
          to={"/add-podcast"}
          className="px-4 py-2 bg-zinc-900 text-white rounded font-semibold hover:shadow-lg"
        >
          Add Podcast
        </Link>
      </div>
          <div className="w-full my-4 grid md:grid-cols-3 lg:grid-cols-4 grid-cols-1  gap-8">
      {Podcasts.map((item, i) => {
        return (
          <div key={i}>
            {" "}
            <PodcastCard item={item}/>{" "}
          </div>
        );
      })}
    </div>
    </div>
  );
};

export default UserPodcasts;

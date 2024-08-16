import axios from "axios";
import React, { useEffect, useState } from "react";
import PodcastCard from "../components/allPodcasts/PodcastCard";

const AllPodcasts = () => {
  const [Podcasts, setPodcasts] = useState([]);
  useEffect(() => {
    const allPodcasts = async () => {
      try {
        const response = await axios.get(
          "https://podcaster-smoky-theta.vercel.app/api/v1/get-podcasts"
        );
        setPodcasts([...response.data.data]);
      } catch (error) {
      }
    };
    allPodcasts();
  }, []);
  return (
    <div>
    <div className="w-full px-4 lg:px-12 py-4 grid md:grid-cols-3 lg:grid-cols-4 grid-cols-1  gap-8">
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

export default AllPodcasts;

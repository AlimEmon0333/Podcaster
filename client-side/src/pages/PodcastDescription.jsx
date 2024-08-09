import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import PodcastCard from "../components/allPodcasts/PodcastCard";
import axios from "axios";
import { useSelector } from "react-redux";

const PodcastDescription = () => {
  const { id } = useParams();
  const [Podcasts, setPodcasts] = useState();
  useEffect(() => {
    const allPodcasts = async () => {
      try {
        const response = await axios.get(
          `http://localhost:2000/api/v1/get-podcast/${id}`,
          { withCredentials: true }
        );
        setPodcasts(response.data.data);
      } catch (error) {
        console.log(error);
      }
    };
    allPodcasts();
  }, []);
  return (
    <div className="px-4 lg:px-12 py-4 h-auto flex flex-col md:flex-row items-center justify-center gap-4">
      {Podcasts && (
        <>
          <div className="w-2/6 flex items-center justify-center ">
            <img
              src={`http://localhost:2000/${Podcasts.frontImage}`}
              className="rounded w-full h-[50vh] object-cover"
              alt="thumbnail"
            />
          </div>
          <div className="w-4/6 flex flex-col items-center justify-center lg:items-start lg:justify-start">
            <div className="text-4xl font-semibold">{Podcasts.title}</div>
            <h2 className="mt-4">{Podcasts.description}</h2>
            <div className="mt-2 w-fit bg-orange-100 text-orange-700 border border-orange-700 rounded-full px-4 py-2 text-center">
              {Podcasts.category.categoryName}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default PodcastDescription;

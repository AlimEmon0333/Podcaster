import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import PodcastCard from "../components/allPodcasts/PodcastCard";

const CategoryPage = () => {
  const { cat } = useParams();
  const [Podcasts, setPodcasts] = useState([]);
  useEffect(() => {
    const allPodcasts = async () => {
      try {
        const response = await axios.get(
          `https://podcaster-smoky-theta.vercel.app/api/v1/category/${cat}`,
          { withCredentials: true }
        );
        setPodcasts([...response.data.data]);
      } catch (error) {
      }
    };
    allPodcasts();
  }, []);
  return (
    <div className="px-4 py-4 lg:px-12">
      <h1 className="text-xl font-semibold">{cat}</h1>
      <div>
        {Podcasts.length > 0 ? (
          <div  className="w-full lg:px-12 py-4 grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {" "}
            {Podcasts.map((item, i) => {
              return (
                <div key={i}>
                  {" "}
                  <PodcastCard item={item} />{" "}
                </div>
              );
            })}
          </div>
        ) : (
          <div className="h-[70vh] w-[70vw] bg-green-200 flex items-center justify-center rounded border shadow-md">
            <h1 className="text-5xl font-serif">No Podcasts right now !</h1>
          </div>
        )}
      </div>
    </div>
  );
};

export default CategoryPage;

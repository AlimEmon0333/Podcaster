import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import comedy from "../assets/CATEGORY_comedy.jpg"
import business from "../assets/CATEGORY_bussines.jpg";
import education from "../assets/CATEGORY_education.jpg"
import hobbies from "../assets/CATEGORY_hobbies.jpg"
import government from "../assets/CATEGORY_government.jpg"
import axios from "axios";

const Categories = () => {
  const cat = [
    { name: "Comedy", color: "bg-purple-200", to: "/category/comedy", img: comedy },
    {
      name: "Business",
      color: "bg-green-200",
      to: "/category/business",
      img: business,
    },
    {
      name: "Education",
      color: "bg-red-200",
      to: "/category/education",
      img: education,
    },
    {
      name: "Hobbies",
      color: "bg-zinc-200",
      to: "/category/hobbies",
      img: hobbies,
    },
    {
      name: "Government",
      color: "bg-indigo-200",
      to: "/category/government",
      img: government,
    },
  ];

  return (
    <div className="h-screen lg:h-[78vh]">
      <div className="px-4 lg:px-12 py-4 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {cat.map((item, i) => {
          return (
            <Link
              key={i}
              to={item.to}
              className={`rounded px-8 py-4 text-xl font-semibold ${item.color} hover:scale-105 hover:shadow-xl transition-all duration-300 relative h-[22vh] overflow-hidden`}
            >
              <div>{item.name}</div>
              <div className="w-[100%] flex items-center justify-end absolute -bottom-2 -right-2">
                <img
                  src={item.img}
                  alt={item.name}
                  className="rounded rotate-12 h-[15vh] md:h-[17vh] lg:h-[18vh]"
                />
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default Categories;

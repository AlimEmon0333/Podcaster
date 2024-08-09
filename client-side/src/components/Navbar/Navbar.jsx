import React, { useState } from "react";
import { Link } from "react-router-dom";
import podcaster from "../../assets/podcaster.png";
import { HiBars3BottomLeft } from "react-icons/hi2";
import { RxCross1 } from "react-icons/rx";
import { useSelector } from "react-redux";

const navLinks = [
  {
    name: "Home",
    path: "/",
  },
  {
    name: "Categories",
    path: "/categories",
  },
  {
    name: "All Podcasts",
    path: "/allPodcasts",
  },
];
const Navbar = () => {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const [MobileNav, setMobileNav] = useState(false);
  return (
    <nav className="px-4 md:px-8 lg:px-12 py-6 relative">
      <div className="flex justify-between items-center">
        <div className="logo app-name flex w-2/6 items-center gap-4">
          <img src={podcaster} className="h-12" alt="Podcaster logo" />
          <Link to={"/"} className="text-2xl font-semibold">
            Podcaster
          </Link>
        </div>
        <div className="w-2/6 hidden lg:flex items-center">
          {navLinks.map((item, index) => {
            return (
              <Link
                key={index}
                to={item.path}
                className="ms-8 transition-all duration-500 hover:font-semibold"
              >
                {item.name}
              </Link>
            );
          })}
        </div>
        <div className="w-2/6 gap-3 hidden lg:flex justify-end items-center">
          {isLoggedIn ? (
            <Link
              to={"/profile"}
              className="signup borde rounded-full px-6 py-3 text-white bg-black"
            >
              Profile
            </Link>
          ) : (
            <div>
              {" "}
              <Link
                to={"/login"}
                className="login border border-black rounded-full px-6 py-3"
              >
                Login
              </Link>
              <Link
                to={"/signup"}
                className="signup ms-3 brder rounded-full px-6 py-4  text-white bg-black"
              >
                SignUp
              </Link>
            </div>
          )}
        </div>
        <div className="w-4/6 flex items-center justify-end lg:hidden">
          <HiBars3BottomLeft
            className="text-3xl font-semibold hover:cursor-pointer"
            onClick={() => setMobileNav(!MobileNav)}
          />
        </div>
      </div>
      <div
        className={`fixed w-full h-screen bg-blue-100 top-0 left-0 transition-all duration-700 z-10 ${
          MobileNav ? "translate-y-[0%] " : "translate-y-[200%] "
        } `}
      >
        <div className="px-10 pt-10 flex items-center justify-end">
          <button>
            <RxCross1
              className="text-3xl"
              onClick={() => setMobileNav(!MobileNav)}
            />
          </button>
        </div>
        <div className="flex flex-col h-full items-center justify-center">
          {navLinks.map((item, index) => {
            return (
              <Link
                onClick={() => setMobileNav(!MobileNav)}
                key={index}
                to={item.path}
                className="mb-10 text-3xl transition-all duration-500 hover:font-semibold"
              >
                {item.name}
              </Link>
            );
          })}

          {isLoggedIn ? (
            <div>
              <Link
                onClick={() => setMobileNav(!MobileNav)}
                className="mb-10 text-3xl transition-all duration-500 hover:font-semibold"
                to={"/profile"}
              >
                Profile
              </Link>
            </div>
          ) : (
            <div>
              {" "}
              <Link
                onClick={() => setMobileNav(!MobileNav)}
                className="mb-10 text-3xl transition-all duration-500 hover:font-semibold"
                to={"/login"}
              >
                Login
              </Link>
              <Link
                onClick={() => setMobileNav(!MobileNav)}
                className="mb-10 text-3xl transition-all duration-500 hover:font-semibold"
                to={"/signup"}
              >
                SignUp
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

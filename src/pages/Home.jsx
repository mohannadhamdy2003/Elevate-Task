import React from "react";
import background from "../assets/images/background.jpg";
import { Outlet } from "react-router-dom";
const Home = () => {
  return (
    <>
      <div
        className="relative min-h-screen bg-cover bg-center"
        style={{ backgroundImage: `url(${background})` }}
      >
        <div className="absolute "></div>
        <div className="relative z-10 min-h-screen flex flex-col items-center gap-4 pt-6">
          {/* the Header */}
          <div
            className="w-full max-w-[1200px] lg:h-[67px] bg-gray-300/80 rounded-2xl 
                flex flex-col sm:flex-row items-center justify-between 
                px-4 sm:px-6 py-3 sm:py-0 gap-2 "
          >
            <p className="text-white text-[18px] sm:text-[20px] font-semibold">
              Elevate
            </p>

            <p className="text-white text-[16px] sm:text-[20px] font-semibold lg:mx-auto">
              Frontend Advanced Bootcamp Task
            </p>
          </div>
          {/* End of Header */}
          <Outlet />
        </div>
      </div>
    </>
  );
};

export default Home;

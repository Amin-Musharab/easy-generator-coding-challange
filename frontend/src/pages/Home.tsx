import React, { useState } from "react";
import { NavLink } from "react-router-dom";

const Home = () => {
  const handleNavigateBack = () => {
    localStorage.removeItem("user");
  };

  return (
    <div className="bg-cs-body-gray h-screen py-[5%] text-white flex flex-col items-center justify-center space-y-2">
      <p>Welcome to the application.</p>
      <NavLink to="/login" onClick={handleNavigateBack}>
        {"<- "}Back
      </NavLink>{" "}
    </div>
  );
};

export default Home;

import React from "react";
import HeroSlider from "./HeroSlider";
import PopularPolicies from "./PopularPolicies";
import LatestBlogs from "./LatestBlogs";

const Home = () => {
  return (
    <div >
      <HeroSlider />
      <PopularPolicies />
      <LatestBlogs />
    </div>
  );
};

export default Home;

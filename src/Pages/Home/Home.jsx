import React from "react";
import HeroSlider from "./HeroSlider";
import PopularPolicies from "./PopularPolicies";
import LatestBlogs from "./LatestBlogs";
import NewsletterSubscription from "./NewsletterSubscription";
import FeaturedAgents from "./FeaturedAgents";
import CustomerReviews from "./CustomerReviews";

const Home = () => {
  return (
    <div >
      <HeroSlider />
      <PopularPolicies />
      <LatestBlogs />
      <CustomerReviews />
      <NewsletterSubscription />
      <FeaturedAgents />
    </div>
  );
};

export default Home;

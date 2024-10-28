import React from "react";
import Sliders from "../components/Slider/Sliders.jsx";
import Categories from "../components/Categories/Categories.jsx";
import Campaigns from "../components/Campaigns/Campaigns.jsx";
import Products from "../components/Products/Products.jsx";
import CampaignSingle from "../components/CampaignSingle/CampaignSingle.jsx";
import Blogs from "../components/Blogs/Blogs.jsx";
import Brands from "../components/Brands/Brands.jsx";

const HomePage = () => {
  return (
    <React.Fragment>
      <Sliders />
      <Categories />
      <Campaigns />
      <Products />
      <CampaignSingle />
      <Blogs />
      <Brands />
    </React.Fragment>
  );
};

export default HomePage;

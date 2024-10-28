import React from "react";
import Headers from "../components/Layout/Header/Header.jsx";
import Sliders from "../components/Slider/Sliders.jsx";
import Categories from "../components/Categories/Categories.jsx";
import Campaigns from "../components/Campaigns/Campaigns.jsx";
import Products from "../components/Products/Products.jsx";
import CampaignSingle from "../components/CampaignSingle/CampaignSingle.jsx";
import Blogs from "../components/Blogs/Blogs.jsx";
import Brands from "../components/Brands/Brands.jsx";
import Policy from "../components/Layout/Policy/Policy.jsx";
import Footer from "../components/Layout/Footer/Footer.jsx";

const HomePage = () => {
  return (
    <React.Fragment>
      <Headers />
      <Sliders />
      <Categories />
      <Campaigns />
      <Products />
      <CampaignSingle />
      <Blogs />
      <Brands />
      <Footer />
    </React.Fragment>
  );
};

export default HomePage;

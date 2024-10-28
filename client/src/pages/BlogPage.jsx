import { Fragment } from "react";
import Header from "../components/Layout/Header/Header";
import Blogs from "../components/Blogs/Blogs";
import Footer from "../components/Layout/Footer/Footer";

const BlogPage = () => {
  return (
    <Fragment>
      <Header />
      <div className="blog-page">
        <Blogs />
      </div>
      <Footer />
    </Fragment>
  );
};

export default BlogPage;

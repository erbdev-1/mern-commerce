import { Fragment } from "react";
import Header from "../components/Layout/Header/Header";
import Policy from "../components/Layout/Policy/Policy";
import Footer from "../components/Layout/Footer/Footer";
import Contact from "../components/Contact/Contact";

const ContactPage = () => {
  return (
    <Fragment>
      <Header />
      <Contact />
      <Footer />
    </Fragment>
  );
};

export default ContactPage;

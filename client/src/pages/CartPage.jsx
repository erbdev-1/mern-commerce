import { Fragment } from "react";
import Cart from "../components/Cart/Cart";
import Footer from "../components/Layout/Footer/Footer";
import Header from "../components/Layout/Header/Header";

const CartPage = () => {
  return (
    <Fragment>
      <Header />
      <Cart />
      <Footer />
    </Fragment>
  );
};

export default CartPage;

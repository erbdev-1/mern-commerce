import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import MainLayout from "./layouts/MainLayout.jsx";
import CartProvider from "./components/context/CartProvider.jsx";
import App from "./App.jsx";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./index.css";

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <CartProvider>
      <MainLayout>
        <App />
      </MainLayout>
    </CartProvider>
  </BrowserRouter>
);

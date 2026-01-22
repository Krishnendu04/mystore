import { Routes, Route } from "react-router-dom";

import Home from "../pages/Home";
import Products from "../Pages/Products";
import ProductDetails from "../Pages/ProductDetails";
import About from "../Pages/About";
import Contact from "../Pages/Contact";
import Checkout from "../Pages/Checkout";
import ProtectedCheckout from "../components/ProtectedCheckout";
export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/products" element={<Products />} />
      <Route path="/about" element={<About />} />
      <Route path="/products/:id" element={<ProductDetails />} />
      <Route path="/contact" element={<Contact />} />
      <Route
        path="/checkout"
        element={
          <ProtectedCheckout>
            <Checkout />
          </ProtectedCheckout>
        }
      />
    </Routes>
  );
}

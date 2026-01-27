import { Routes, Route } from "react-router-dom";

import Home from "../Pages/Home";
import Products from "../Pages/Products";
import ProductDetails from "../Pages/ProductDetails";
import About from "../Pages/About";
import Contact from "../Pages/Contact";
import Checkout from "../Pages/Checkout";
import ProtectedCheckout from "../components/ProtectedCheckout";
import Category from "../Pages/Category";
import Deals from "../Pages/Deals";
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
      <Route path="/category" element={<Category/>}/>
      <Route path="/deals" element={<Deals/>}/>
    </Routes>
  );
}
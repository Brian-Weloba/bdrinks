import "./App.css";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Products from "./components/Products";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { ShoppingCart } from "./components/ShoppingCart";
import Favorites  from "./components/Favorites";
import ProductDetails from "./components/ProductDetails";
import ScrollToTop from "./components/ScrollToTop";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

export default function App() {
  return (
    <div className="flex flex-col h-screen">
      <Router>
        <ScrollToTop />
        <Navbar />
        <ToastContainer
        position="bottom-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
        <nav className="relative">
          <Routes>
            <Route path="/" element={<Products cat={"all"} />} />
            <Route
              path="/category/:pathCategory"
              element={<Products cat={""} />}
            />
            <Route path="/cart" element={<ShoppingCart />} />
            <Route path="/favorites" element={<Favorites />} />
            <Route path="/product/:productId" element={<ProductDetails />} />
          </Routes>
          <Footer />
        </nav>
      </Router>
    </div>
  );
}

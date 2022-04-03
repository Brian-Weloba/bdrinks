import "./App.css";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Products from "./components/Products";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

export default function App() {
  return (
    <div className="flex flex-col h-screen">
      <Router>
        <Navbar />
        <nav className="relative">
          <Routes>
            <Route path="/" element={<Products cat={"all"} />} />
            <Route
              path="/category/:pathCategory"
              element={<Products cat={""} />}
            />
          </Routes>
          <Footer />
        </nav>
      </Router>
    </div>
  );
}

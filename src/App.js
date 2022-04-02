import logo from "./logo.svg";
import "./App.css";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

function App() {
  return (
    <div className="flex flex-col h-screen">
      <Navbar />
      {/* //TODO: add grow to body */}
      <div className="grow" />
      <Footer />
    </div>
  );
}

export default App;

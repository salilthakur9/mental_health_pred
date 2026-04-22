import { useState } from "react";
import Navbar from "./components/Navbar";
import Header from "./components/Header";
import About from "./components/About";
import GridGallery from "./components/GridGallery";
import Assessment from "./components/Assessment";
import ResultSection from "./components/ResultSection";
import Footer from "./components/Footer";

function App() {
  const [result, setResult] = useState(null);

  return (
    <div className="bg-black min-h-screen text-white">
      <Navbar />
      <Header />
      <About />
      <GridGallery />
      <Assessment setResult={setResult} />
      <ResultSection data={result} />
      <Footer />
    </div>
  );
}

export default App;
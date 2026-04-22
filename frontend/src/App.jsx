import { useState } from "react";
import Navbar from "./components/Navbar";
import Header from "./components/Header";
import About from "./components/About";
import Assessment from "./components/Assessment";
import Footer from "./components/Footer";

import ResultLow from "./components/ResultLow";
import ResultModerate from "./components/ResultModerate";
import ResultHigh from "./components/ResultHigh";
import GridGallery from "./components/GridGallery";

function App() {
  const [result, setResult] = useState(null);

  return (
    <div className="bg-black min-h-screen">
      <Navbar />
      <Header />
      <About />
      <GridGallery />
      <Assessment setResult={setResult} />

      {result && (
        <div className="max-w-xl mx-auto px-6">
          {result.prediction === 0 && <ResultLow data={result} />}
          {result.prediction === 1 && <ResultModerate data={result} />}
          {result.prediction === 2 && <ResultHigh data={result} />}
        </div>
      )}

      <Footer />
    </div>
  );
}

export default App;
import { motion } from "framer-motion";

const Header = () => {
  return (
    <div className="relative min-h-screen bg-black text-white flex flex-col items-center justify-center px-6 overflow-hidden">

      <div className="absolute w-[500px] h-[500px] bg-blue-500/20 blur-[120px] rounded-full top-20 left-1/3"></div>

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center z-10 max-w-4xl"
      >

        <p className="text-blue-400 text-sm mb-4 tracking-widest">
          ⚡ AI POWERED MENTAL ANALYSIS
        </p>

        <h1 className="text-5xl md:text-6xl font-bold leading-tight">
          Predict Your{" "}
          <span className="bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent">
            Burnout Level
          </span>{" "}
          Instantly
        </h1>

        <p className="text-slate-400 mt-6 max-w-2xl mx-auto">
          Analyze stress, sleep, and lifestyle patterns using machine learning
          to get real-time burnout predictions and actionable insights.
        </p>

        <div className="flex gap-4 justify-center mt-8 flex-wrap">
          <a href="#try">
            <button className="bg-blue-500 hover:bg-blue-600 px-8 py-3 rounded-full font-medium transition hover:scale-95">
              Start Assessment
            </button>
          </a>

          <a href="#about">
            <button className="border border-slate-600 px-8 py-3 rounded-full hover:bg-slate-800 transition">
              Learn More
            </button>
          </a>
        </div>

        {/* Stats */}
        <div className="flex justify-center gap-10 mt-12 text-sm text-slate-400 flex-wrap">

          <div>
            <p className="text-white text-lg font-semibold">1M+</p>
            <p>Data Points</p>
          </div>

          <div>
            <p className="text-white text-lg font-semibold">77%</p>
            <p>Model Accuracy</p>
          </div>

          <div>
            <p className="text-white text-lg font-semibold">Real-Time</p>
            <p>Prediction</p>
          </div>

        </div>

      </motion.div>

    </div>
  );
};

export default Header;
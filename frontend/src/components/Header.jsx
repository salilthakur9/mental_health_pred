import { motion } from "framer-motion";

const Header = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-center text-white bg-black relative">

      <motion.h1
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-5xl md:text-6xl font-bold"
      >
        Predict Burnout with AI
      </motion.h1>

      <p className="text-slate-400 mt-4 max-w-md">
        Answer a few questions and get instant insights powered by machine learning.
      </p>

      <a href="#try">
        <button className="mt-6 bg-blue-500 hover:bg-blue-600 px-6 py-3 rounded-full">
          Try Now
        </button>
      </a>

    </div>
  );
};

export default Header;
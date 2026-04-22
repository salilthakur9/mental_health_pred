import { motion } from "framer-motion";
import { useEffect, useState } from "react";

const ResultSection = ({ data }) => {
  const [showSuggestions, setShowSuggestions] = useState(false);

  useEffect(() => {
    if (data) {
      setTimeout(() => setShowSuggestions(true), 1200);
    }
  }, [data]);

  if (!data) return null;

  const styles = {
    0: {
      title: "Low Burnout",
      color: "green",
      bg: "bg-green-500/10",
      border: "border-green-500/30",
      glow: "shadow-green-500/20"
    },
    1: {
      title: "Moderate Burnout",
      color: "yellow",
      bg: "bg-yellow-500/10",
      border: "border-yellow-500/30",
      glow: "shadow-yellow-500/20"
    },
    2: {
      title: "High Burnout",
      color: "red",
      bg: "bg-red-500/10",
      border: "border-red-500/30",
      glow: "shadow-red-500/20"
    }
  };

  const current = styles[data.prediction];

  return (
    <div className="bg-black text-white py-20 px-6 flex flex-col items-center">

      <motion.div
        initial={{ opacity: 0, scale: 0.8, y: 40 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className={`w-full max-w-xl p-8 rounded-2xl border ${current.bg} ${current.border} shadow-lg ${current.glow}`}
      >
        <h2 className="text-2xl font-semibold text-center mb-2">
          Your Result
        </h2>

        <p className={`text-center text-3xl font-bold text-${current.color}-400`}>
          {current.title}
        </p>

        <p className="text-slate-400 text-center mt-3">
          Based on your responses, this is your current burnout level.
        </p>
      </motion.div>
      
      {showSuggestions && (
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-xl mt-10 p-6 rounded-2xl bg-slate-900 border border-slate-700"
        >
          <h3 className="text-lg font-semibold mb-4 text-blue-400">
            Suggestions to Improve
          </h3>

          <ul className="space-y-2 text-slate-300">
            {data.suggestions.map((tip, i) => (
              <li key={i}>• {tip}</li>
            ))}
          </ul>
        </motion.div>
      )}

    </div>
  );
};

export default ResultSection;
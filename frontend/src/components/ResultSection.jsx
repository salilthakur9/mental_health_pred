import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const ResultSection = ({ data }) => {

  if (!data) return null;

  const styles = {

    0: {
      title: "Low Burnout",
      text: "text-green-400",
      border: "border-green-500/20",
      glow: "shadow-green-500/10",
      gradient: "from-green-500/20 to-transparent",
      emoji: "✅",
      message:
        "Your mental wellness looks stable. Maintain healthy routines and balance."
    },

    1: {
      title: "Moderate Burnout",
      text: "text-yellow-400",
      border: "border-yellow-500/20",
      glow: "shadow-yellow-500/10",
      gradient: "from-yellow-500/20 to-transparent",
      emoji: "⚠️",
      message:
        "You may be experiencing stress buildup. Recovery habits are recommended."
    },

    2: {
      title: "High Burnout",
      text: "text-red-400",
      border: "border-red-500/20",
      glow: "shadow-red-500/10",
      gradient: "from-red-500/20 to-transparent",
      emoji: "🚨",
      message:
        "Your responses indicate elevated burnout patterns. Prioritize recovery and wellness."
    }

  };

  const current = styles[data.prediction];

  return (
    <div className="bg-black text-white py-24 px-6 flex justify-center">

      <motion.div
        initial={{ opacity: 0, y: 60, scale: 0.9 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.6 }}
        className={`relative overflow-hidden w-full max-w-2xl rounded-3xl border ${current.border} bg-[#0b1220]/70 backdrop-blur-xl shadow-2xl ${current.glow}`}
      >

        <div className={`absolute inset-0 bg-gradient-to-br ${current.gradient} opacity-40`} />

        <div className="relative z-10 p-10">

          <div className="flex items-center justify-center gap-3 mb-4">

            <span className="text-3xl">
              {current.emoji}
            </span>

            <h2 className="text-4xl font-bold">
              AI Burnout Analysis
            </h2>

          </div>

          <div className="text-center mb-6">

            <h3 className={`text-5xl font-bold mb-4 ${current.text}`}>
              {current.title}
            </h3>

            <p className="text-slate-300 text-lg leading-relaxed">
              {current.message}
            </p>

          </div>

          <div className="grid md:grid-cols-3 gap-4 mb-8">

            <div className="bg-black/30 border border-white/5 rounded-2xl p-4 text-center">
              <p className="text-slate-400 text-sm mb-1">
                Prediction
              </p>

              <h4 className={`text-2xl font-bold ${current.text}`}>
                {data.prediction}
              </h4>
            </div>

            <div className="bg-black/30 border border-white/5 rounded-2xl p-4 text-center">
              <p className="text-slate-400 text-sm mb-1">
                Suggestions
              </p>

              <h4 className="text-2xl font-bold text-blue-400">
                {data.suggestions?.length || 0}
              </h4>
            </div>

            <div className="bg-black/30 border border-white/5 rounded-2xl p-4 text-center">
              <p className="text-slate-400 text-sm mb-1">
                AI Status
              </p>

              <h4 className="text-2xl font-bold text-blue-400">
                Active
              </h4>
            </div>

          </div>

          <div className="bg-black/30 border border-white/5 rounded-2xl p-6 mb-8">

            <h3 className="text-xl font-semibold mb-4 text-blue-400">
              Personalized Suggestions
            </h3>

            <ul className="space-y-3">

              {data.suggestions?.map((tip, index) => (

                <li
                  key={index}
                  className="text-slate-300 flex gap-3"
                >

                  <span className="text-blue-400">
                    •
                  </span>

                  {tip}

                </li>

              ))}

            </ul>

          </div>

          <div className="flex flex-col md:flex-row gap-4">

            <Link
              to="/dashboard"
              className="flex-1"
            >

              <button className="w-full py-4 rounded-2xl bg-blue-500 hover:bg-blue-600 transition-all font-semibold">
                Open Dashboard
              </button>

            </Link>

            <button
              onClick={() =>
                window.scrollTo({
                  top: 0,
                  behavior: "smooth"
                })
              }
              className="flex-1 py-4 rounded-2xl border border-white/10 hover:border-blue-400 transition-all font-semibold"
            >
              Retake Assessment
            </button>

          </div>

        </div>

      </motion.div>

    </div>
  );
};

export default ResultSection;
import { motion } from "framer-motion";

const ResultLow = ({ data }) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="bg-green-900 text-white p-6 rounded-xl mt-10"
    >
      <h3 className="text-xl mb-2">Low Burnout ✅</h3>
      {data.suggestions.map((s, i) => (
        <p key={i}>• {s}</p>
      ))}
    </motion.div>
  );
};

export default ResultLow;
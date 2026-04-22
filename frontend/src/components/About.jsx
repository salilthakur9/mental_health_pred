const About = () => {
  return (
    <div id="about" className="bg-black text-white py-20 px-6 text-center">
      <h2 className="text-3xl font-semibold mb-4">About</h2>

      <p className="text-slate-400 max-w-xl mx-auto">
        BurnoutAI uses machine learning (XGBoost) trained on large datasets
        to analyze stress patterns and predict burnout levels.
      </p>
    </div>
  );
};

export default About;
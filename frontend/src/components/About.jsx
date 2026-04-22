export default function About() {
  return (
    <div
      id="about"
      className="bg-black text-white py-24 px-6 flex flex-col items-center"
    >
      <h1 className="text-4xl font-semibold text-center">
        About <span className="text-blue-400">BurnoutAI</span>
      </h1>

      <p className="text-slate-400 text-center mt-4 max-w-xl">
        A smart system designed to analyze student lifestyle patterns and predict
        burnout levels using machine learning and behavioral insights.
      </p>

      <div className="max-w-5xl w-full flex flex-col md:flex-row items-center justify-center gap-10 mt-16">
        
        <img
          className="max-w-sm w-full rounded-2xl border border-white/10 shadow-lg shadow-blue-500/10"
          src="https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=800"
          alt=""
        />

        <div>
          <h2 className="text-2xl font-semibold">
            AI-Powered Mental Health Insights
          </h2>

          <p className="text-slate-400 mt-3 max-w-md">
            Our model is trained on large-scale data to identify patterns in
            stress, sleep, and lifestyle habits, providing accurate burnout
            predictions in real-time.
          </p>

          <div className="flex flex-col gap-8 mt-8">

            <div className="flex items-start gap-4">
              <div className="size-10 flex items-center justify-center bg-blue-500/10 border border-blue-500/20 rounded-lg">
                ⚡
              </div>
              <div>
                <h3 className="text-white font-medium">
                  Real-Time Prediction
                </h3>
                <p className="text-sm text-slate-400">
                  Get instant burnout analysis based on your current lifestyle inputs.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="size-10 flex items-center justify-center bg-blue-500/10 border border-blue-500/20 rounded-lg">
                🧠
              </div>
              <div>
                <h3 className="text-white font-medium">
                  Machine Learning Driven
                </h3>
                <p className="text-sm text-slate-400">
                  Built using XGBoost trained on large datasets for accurate predictions.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="size-10 flex items-center justify-center bg-blue-500/10 border border-blue-500/20 rounded-lg">
                📊
              </div>
              <div>
                <h3 className="text-white font-medium">
                  Personalized Suggestions
                </h3>
                <p className="text-sm text-slate-400">
                  Receive tailored recommendations to improve mental well-being.
                </p>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}
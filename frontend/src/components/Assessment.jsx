import { useState } from "react";
import axios from "axios";

const questions = [
  "Stress level",
  "Sleep quality",
  "Study hours",
  "Screen time",
  "Exam pressure",
  "Physical activity",
  "Family expectation"
];

// 🔥 IMPORTANT: Map UI → Model values
const mapFeatures = (a) => {
  return [
    a[0] * 2,            // stress_level (0–10)
    10 - a[1],           // sleep_hours (inverse)
    a[2] * 2,            // study_hours
    a[3] * 2,            // screen_time
    a[4] * 2,            // exam_pressure
    a[5] * 1.5,          // physical_activity
    a[6] * 2             // family_expectation
  ];
};

const labels = ["Very Low", "Low", "Moderate", "High", "Very High"];

const Assessment = ({ setResult }) => {
  const [answers, setAnswers] = useState(Array(7).fill(null));
  const [loading, setLoading] = useState(false);

  const handleSelect = (qIndex, value) => {
    const updated = [...answers];
    updated[qIndex] = value;
    setAnswers(updated);
  };

  const submit = async () => {
    if (answers.includes(null)) {
      return alert("Please answer all questions");
    }

    try {
      setLoading(true);

      // 🔥 mapping happens here
      const features = mapFeatures(answers);

      const res = await axios.post("http://localhost:5000/predict", {
        features
      });

      setResult(res.data);

    } catch (err) {
      console.error(err);
      alert("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div id="try" className="bg-black text-white py-20 px-6">

      <h2 className="text-3xl text-center mb-10">
        Burnout Assessment
      </h2>

      <div className="max-w-xl mx-auto space-y-8">

        {questions.map((q, i) => (
          <div key={i}>
            <p className="mb-3 font-medium">{q}</p>

            {/* 🔥 Better scale UI */}
            <div className="flex justify-between text-xs text-slate-400 mb-2">
              <span>Low</span>
              <span>High</span>
            </div>

            <div className="flex gap-2">
              {[1, 2, 3, 4, 5].map((val) => (
                <button
                  key={val}
                  onClick={() => handleSelect(i, val)}
                  className={`flex-1 py-2 rounded-lg border text-sm transition-all
                  ${
                    answers[i] === val
                      ? "bg-blue-500 border-blue-500 scale-105 text-white"
                      : "bg-slate-800 border-slate-600 hover:bg-slate-700"
                  }`}
                >
                  {labels[val - 1]}
                </button>
              ))}
            </div>
          </div>
        ))}

        {/* 🔥 Submit */}
        <button
          onClick={submit}
          disabled={loading}
          className="w-full bg-blue-500 py-3 rounded-full hover:scale-95 transition disabled:opacity-50"
        >
          {loading ? "Analyzing..." : "Get Result"}
        </button>

      </div>
    </div>
  );
};

export default Assessment;
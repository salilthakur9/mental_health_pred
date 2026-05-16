import { useState } from "react";
import api from "../services/api";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const questions = [
  "Stress level",
  "Sleep hours",
  "Study hours",
  "Screen time",
  "Exam pressure",
  "Physical activity",
  "Family expectation"
];

const Assessment = ({ setResult }) => {
  const [answers, setAnswers] = useState(Array(7).fill(5));
  const [loading, setLoading] = useState(false);

  const { user } = useAuth();
  const navigate = useNavigate();

  const handleChange = (index, value) => {
    const updated = [...answers];
    updated[index] = Number(value);
    setAnswers(updated);
  };

  const submit = async () => {

    if (!user) {
      navigate("/login");
      return;
    }

    try {

      setLoading(true);

      const res = await api.post("/predict", {
        features: answers
      });

      setResult(res.data);

    } catch (err) {

      console.error(err);

      alert(
        err.response?.data?.message ||
        "Prediction failed"
      );

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

            <p className="mb-2">{q}</p>

            <input
              type="range"
              min="1"
              max="10"
              value={answers[i]}
              onChange={(e) =>
                handleChange(i, e.target.value)
              }
              className="w-full accent-blue-500"
            />

            <div className="flex justify-between text-sm text-slate-400">

              <span>1</span>

              <span className="text-blue-400 font-semibold">
                {answers[i]}
              </span>

              <span>10</span>

            </div>

          </div>
        ))}

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
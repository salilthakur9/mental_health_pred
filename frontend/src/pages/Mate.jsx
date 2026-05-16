import { useState } from "react";
import Navbar from "../components/Navbar";
import api from "../services/api";

function Mate() {
  const [message, setMessage] = useState("");

  const [response, setResponse] = useState("");

  const [recommendations, setRecommendations] = useState([]);

  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!message.trim()) return;

    try {
      setLoading(true);

      setResponse("");

      const res = await api.post("/mate/chat", { message });

      setResponse(res.data.response);

      setRecommendations(res.data.recommendations || []);
    } catch (error) {
      console.error(error);

      alert(error.response?.data?.message || "AI Mate failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white pb-20">
      <Navbar />

      <div className="max-w-7xl mx-auto px-5 pt-32">
        <div className="mb-10">
          <h1 className="text-5xl font-bold mb-4">Personal AI Mate</h1>

          <p className="text-slate-400 text-lg max-w-3xl">
            Share your thoughts, emotions, stress, challenges, or anything on
            your mind. Your AI companion will support you with personalized
            guidance and recommendations.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          <div className="bg-[#0b1220]/70 border border-blue-500/20 rounded-3xl p-6 backdrop-blur-xl">
            <h2 className="text-2xl font-semibold mb-6">
              How are you feeling today?
            </h2>

            <textarea
              rows={12}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Describe your thoughts, stress, emotions, challenges, or anything you want to talk about..."
              className="w-full bg-black/30 border border-white/10 rounded-2xl p-5 outline-none focus:border-blue-500 resize-none text-slate-300"
            />

            <button
              onClick={handleSubmit}
              disabled={loading}
              className="w-full mt-5 py-4 rounded-2xl bg-blue-500 hover:bg-blue-600 transition-all font-semibold disabled:opacity-50"
            >
              {loading ? "Thinking..." : "Talk to AI Mate"}
            </button>
          </div>

          <div className="space-y-6">
            <div className="bg-[#0b1220]/70 border border-blue-500/20 rounded-3xl p-6 backdrop-blur-xl min-h-[350px]">
              <h2 className="text-2xl font-semibold mb-6">AI Response</h2>

              {loading ? (
                <div className="flex items-center justify-center h-[250px] text-slate-400">
                  AI Mate is thinking...
                </div>
              ) : response ? (
                <div className="whitespace-pre-wrap text-slate-300 leading-relaxed">
                  {response}
                </div>
              ) : (
                <div className="flex items-center justify-center h-[250px] text-slate-500 text-center">
                  Your AI companion response will appear here.
                </div>
              )}
            </div>

            <div className="bg-[#0b1220]/70 border border-blue-500/20 rounded-3xl p-6 backdrop-blur-xl">
              <h2 className="text-2xl font-semibold mb-6">
                Recommended For You
              </h2>

              <div className="space-y-4">
                {recommendations.length === 0 ? (
                  <p className="text-slate-400">
                    Recommendations will appear after AI analysis.
                  </p>
                ) : (
                  recommendations.map((item) => (
                    <div
                      key={item._id}
                      className="bg-black/30 border border-white/5 rounded-2xl p-4"
                    >
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="font-semibold text-blue-400">
                          {item.title}
                        </h3>

                        <span className="text-xs bg-blue-500/20 text-blue-300 px-3 py-1 rounded-full">
                          {item.type}
                        </span>
                      </div>

                      <p className="text-slate-300 text-sm mb-4">
                        {item.description}
                      </p>

                      <a
                        href={item.link}
                        target="_blank"
                        rel="noreferrer"
                        className="text-blue-400 text-sm hover:text-blue-300"
                      >
                        Open Resource →
                      </a>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Mate;

import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import api from "../services/api";
import BurnoutChart from "../components/BurnoutChart";

function Dashboard() {
  const [history, setHistory] = useState([]);
  const [recommendations, setRecommendations] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      const historyRes = await api.get("/burnout/history");
      const recommendationRes = await api.get("/recommendations");

      setHistory(historyRes.data.history || []);
      setRecommendations(
        recommendationRes.data.recommendations || []
      );
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const latestBurnout = history[0];

  return (
    <div className="min-h-screen bg-black text-white pb-20">
      <Navbar />

      <div className="max-w-7xl mx-auto px-5 pt-32">

        <div className="mb-10">
          <h1 className="text-5xl font-bold mb-3">
            Mental Wellness Dashboard
          </h1>

          <p className="text-slate-400 text-lg">
            Track your burnout patterns and personalized recommendations
          </p>
        </div>

        {loading ? (
          <div className="text-center py-20 text-slate-400">
            Loading dashboard...
          </div>
        ) : (
          <>
            <div className="grid md:grid-cols-3 gap-6 mb-10">

              <div className="bg-[#0b1220]/70 border border-blue-500/20 rounded-3xl p-6 backdrop-blur-xl">
                <p className="text-slate-400 mb-2">
                  Current Burnout
                </p>

                <h2 className="text-3xl font-bold text-blue-400">
                  {latestBurnout?.level || "No Data"}
                </h2>
              </div>

              <div className="bg-[#0b1220]/70 border border-blue-500/20 rounded-3xl p-6 backdrop-blur-xl">
                <p className="text-slate-400 mb-2">
                  Tests Taken
                </p>

                <h2 className="text-3xl font-bold">
                  {history.length}
                </h2>
              </div>

              <div className="bg-[#0b1220]/70 border border-blue-500/20 rounded-3xl p-6 backdrop-blur-xl">
                <p className="text-slate-400 mb-2">
                  Recommendation Count
                </p>

                <h2 className="text-3xl font-bold">
                  {recommendations.length}
                </h2>
              </div>

            </div>
            <div className="mb-10">
  <BurnoutChart history={history} />
</div>

            <div className="grid lg:grid-cols-2 gap-8">

              <div className="bg-[#0b1220]/70 border border-blue-500/20 rounded-3xl p-6 backdrop-blur-xl">
                <h2 className="text-2xl font-semibold mb-6">
                  Recent Burnout Records
                </h2>

                <div className="space-y-4">

                  {history.length === 0 ? (
                    <p className="text-slate-400">
                      No burnout history found.
                    </p>
                  ) : (
                    history.map((item, index) => (
                      <div
                        key={index}
                        className="bg-black/30 border border-white/5 rounded-2xl p-4"
                      >
                        <div className="flex items-center justify-between mb-2">
                          <h3 className="font-semibold">
                            {item.level}
                          </h3>

                          <span className="text-xs text-slate-400">
                            {new Date(item.createdAt).toLocaleDateString()}
                          </span>
                        </div>

                        <div className="grid grid-cols-2 gap-2 text-sm text-slate-300">
                          <p>Stress: {item.stress}</p>
                          <p>Sleep: {item.sleep}</p>
                          <p>Study: {item.study}</p>
                          <p>Screen: {item.screen}</p>
                        </div>
                      </div>
                    ))
                  )}

                </div>
              </div>

              <div className="bg-[#0b1220]/70 border border-blue-500/20 rounded-3xl p-6 backdrop-blur-xl">
                <h2 className="text-2xl font-semibold mb-6">
                  Personalized Recommendations
                </h2>

                <div className="space-y-4">

                  {recommendations.length === 0 ? (
                    <p className="text-slate-400">
                      No recommendations available.
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
                          className="inline-block text-sm text-blue-400 hover:text-blue-300"
                        >
                          Open Resource →
                        </a>
                      </div>
                    ))
                  )}

                </div>
              </div>

            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default Dashboard;
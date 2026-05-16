import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid
} from "recharts";

function BurnoutChart({ history }) {

  const chartData = [...history]
    .reverse()
    .map((item, index) => ({
      test: index + 1,
      burnout: item.prediction,
      stress: item.stress,
      sleep: item.sleep
    }));

  return (
    <div className="bg-[#0b1220]/70 border border-blue-500/20 rounded-3xl p-6 backdrop-blur-xl">
      <h2 className="text-2xl font-semibold mb-6">
        Burnout Trend Analysis
      </h2>

      <div className="h-[320px]">

        <ResponsiveContainer width="100%" height="100%">

          <LineChart data={chartData}>

            <CartesianGrid
              strokeDasharray="3 3"
              stroke="#1e293b"
            />

            <XAxis
              dataKey="test"
              stroke="#94a3b8"
            />

            <YAxis
              stroke="#94a3b8"
              domain={[0, 2]}
              ticks={[0, 1, 2]}
            />

            <Tooltip />

            <Line
              type="monotone"
              dataKey="burnout"
              stroke="#3b82f6"
              strokeWidth={3}
            />

          </LineChart>

        </ResponsiveContainer>

      </div>

      <div className="flex items-center gap-6 mt-4 text-sm text-slate-400">
        <p>0 → Low</p>
        <p>1 → Moderate</p>
        <p>2 → High</p>
      </div>

    </div>
  );
}

export default BurnoutChart;
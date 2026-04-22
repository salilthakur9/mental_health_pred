const ResultHigh = ({ data }) => {
  return (
    <div className="bg-red-900 text-white p-6 rounded-xl mt-10">
      <h3>High Burnout 🚨</h3>
      {data.suggestions.map((s, i) => (
        <p key={i}>• {s}</p>
      ))}
    </div>
  );
};

export default ResultHigh;
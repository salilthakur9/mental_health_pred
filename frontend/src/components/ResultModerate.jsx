const ResultModerate = ({ data }) => {
  return (
    <div className="bg-yellow-900 text-white p-6 rounded-xl mt-10">
      <h3>Moderate Burnout ⚠️</h3>
      {data.suggestions.map((s, i) => (
        <p key={i}>• {s}</p>
      ))}
    </div>
  );
};

export default ResultModerate;
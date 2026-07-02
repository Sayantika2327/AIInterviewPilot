function Recommendation({ recommendation }) {
  const color =
    recommendation === "Strong Hire"
      ? "text-green-400"
      : recommendation === "Hire"
      ? "text-blue-400"
      : recommendation === "Borderline"
      ? "text-yellow-400"
      : "text-red-400";

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-8 mt-8">

      <h2 className="text-2xl font-bold text-white mb-5">
        Hiring Recommendation
      </h2>

      <h1 className={`text-4xl font-bold ${color}`}>
        {recommendation}
      </h1>

    </div>
  );
}

export default Recommendation;
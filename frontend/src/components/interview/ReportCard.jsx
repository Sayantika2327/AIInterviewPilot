function ReportCard({ report }) {
  if (!report) return null;

  return (
    <>
      <h1 className="text-4xl font-bold text-white">
        Interview Report
      </h1>

      <div className="grid md:grid-cols-2 gap-6 mt-8">

        <div className="bg-slate-900 rounded-xl p-6">
          <h2 className="text-white font-bold">
            Overall Score
          </h2>

          <p className="text-5xl text-green-400 mt-4">
            {report.overall_score}
          </p>
        </div>

        <div className="bg-slate-900 rounded-xl p-6">
          <h2 className="text-white font-bold">
            Technical
          </h2>

          <p className="text-5xl text-blue-400 mt-4">
            {report.technical_score}
          </p>
        </div>

        <div className="bg-slate-900 rounded-xl p-6">
          <h2 className="text-white font-bold">
            Communication
          </h2>

          <p className="text-5xl text-purple-400 mt-4">
            {report.communication_score}
          </p>
        </div>

        <div className="bg-slate-900 rounded-xl p-6">
          <h2 className="text-white font-bold mb-3">
            Strengths
          </h2>

          {report.strengths.map((item, i) => (
            <p
              key={i}
              className="text-green-400 mb-2"
            >
              ✔ {item}
            </p>
          ))}
        </div>

        <div className="bg-slate-900 rounded-xl p-6">
          <h2 className="text-white font-bold mb-3">
            Weaknesses
          </h2>

          {report.weaknesses.map((item, i) => (
            <p
              key={i}
              className="text-red-400 mb-2"
            >
              ✖ {item}
            </p>
          ))}
        </div>

        <div className="bg-slate-900 rounded-xl p-6">
          <h2 className="text-white font-bold mb-3">
            Learning Roadmap
          </h2>

          {report.learning_roadmap.map((item, i) => (
            <p
              key={i}
              className="text-yellow-400 mb-2"
            >
              • {item}
            </p>
          ))}
        </div>

      </div>
    </>
  );
}

export default ReportCard;
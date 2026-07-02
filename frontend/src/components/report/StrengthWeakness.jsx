function StrengthWeakness({
  strengths,
  weaknesses,
}) {
  return (
    <div className="grid md:grid-cols-2 gap-8 mt-8">

      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-8">

        <h2 className="text-2xl font-bold text-green-400 mb-6">
          Strengths
        </h2>

        {strengths.map((item, index) => (
          <div
            key={index}
            className="flex items-start gap-3 mb-4"
          >
            <span className="text-green-400 text-xl">
              ✔
            </span>

            <p className="text-slate-300">
              {item}
            </p>
          </div>
        ))}

      </div>

      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-8">

        <h2 className="text-2xl font-bold text-red-400 mb-6">
          Weaknesses
        </h2>

        {weaknesses.map((item, index) => (
          <div
            key={index}
            className="flex items-start gap-3 mb-4"
          >
            <span className="text-red-400 text-xl">
              ✖
            </span>

            <p className="text-slate-300">
              {item}
            </p>
          </div>
        ))}

      </div>

    </div>
  );
}

export default StrengthWeakness;
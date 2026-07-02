function Roadmap({ roadmap }) {
  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-8 mt-8">

      <h2 className="text-2xl font-bold text-yellow-400 mb-6">
        Learning Roadmap
      </h2>

      {roadmap.map((item, index) => (
        <div
          key={index}
          className="flex items-start gap-4 mb-5"
        >
          <div className="w-8 h-8 rounded-full bg-yellow-500 text-black flex items-center justify-center font-bold">
            {index + 1}
          </div>

          <p className="text-slate-300 text-lg">
            {item}
          </p>
        </div>
      ))}

    </div>
  );
}

export default Roadmap;
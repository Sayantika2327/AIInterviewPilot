function ProgressBar({
  currentQuestion,
  totalQuestions,
}) {
  const progress =
    (currentQuestion / totalQuestions) * 100;

  return (
    <div className="bg-slate-900 rounded-2xl p-6">

      <h2 className="text-xl font-bold text-white">
        Interview Progress
      </h2>

      <div className="mt-6 h-4 bg-slate-800 rounded-full">

        <div
          className="h-4 rounded-full bg-gradient-to-r from-cyan-500 to-blue-600 transition-all duration-500"
          style={{
            width: `${progress}%`,
          }}
        />

      </div>

      <p className="text-slate-400 mt-5">
        Question {currentQuestion} of {totalQuestions}
      </p>

    </div>
  );
}

export default ProgressBar;
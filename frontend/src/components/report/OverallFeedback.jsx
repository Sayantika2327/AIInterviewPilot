function OverallFeedback({ feedback }) {
  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-8 mt-8">

      <h2 className="text-2xl font-bold text-white mb-5">
        Overall Feedback
      </h2>

      <p className="text-slate-300 leading-8 text-lg">
        {feedback}
      </p>

    </div>
  );
}

export default OverallFeedback;
function FeedbackCard({
  score,
  feedback,
  idealAnswer,
}) {

  if (!feedback) return null;

  return (
    <div className="mt-8 bg-slate-900 border border-slate-800 rounded-2xl p-8">

      <h2 className="text-2xl font-bold text-green-400">
        AI Feedback
      </h2>

      <p className="text-white text-lg mt-5">
        Score : {score}/10
      </p>

      <div className="mt-5">

        <h3 className="text-yellow-300 font-bold">
          Feedback
        </h3>

        <p className="text-slate-300 mt-2">
          {feedback}
        </p>

      </div>

      <div className="mt-6">

        <h3 className="text-blue-400 font-bold">
          Ideal Answer
        </h3>

        <p className="text-slate-300 mt-2">
          {idealAnswer}
        </p>

      </div>

    </div>
  );
}

export default FeedbackCard;
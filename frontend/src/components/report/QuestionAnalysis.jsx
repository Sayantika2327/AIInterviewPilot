function QuestionAnalysis({ questions }) {
  return (
    <div className="mt-8">

      <h2 className="text-3xl font-bold text-white mb-8">
        Question-wise Analysis
      </h2>

      {questions.map((item) => (

        <div
          key={item.question_number}
          className="bg-slate-900 border border-slate-800 rounded-2xl p-8 mb-8"
        >

          <div className="flex justify-between items-center mb-6">

            <h3 className="text-2xl font-bold text-blue-400">
              Question {item.question_number}
            </h3>

            <span className="text-green-400 font-bold text-xl">
              {item.score}/10
            </span>

          </div>

          <div className="mb-6">

            <p className="text-slate-400 mb-2">
              Question
            </p>

            <p className="text-white text-lg">
              {item.question}
            </p>

          </div>

          <div className="mb-6">

            <p className="text-slate-400 mb-2">
              Your Answer
            </p>

            <div className="bg-slate-950 rounded-xl p-5">

              <p className="text-slate-300">
                {item.candidate_answer}
              </p>

            </div>

          </div>

          <div className="mb-6">

            <p className="text-slate-400 mb-2">
              Ideal Answer
            </p>

            <div className="bg-slate-950 rounded-xl p-5">

              <p className="text-green-400">
                {item.ideal_answer}
              </p>

            </div>

          </div>

          <div>

            <p className="text-slate-400 mb-2">
              AI Feedback
            </p>

            <div className="bg-slate-950 rounded-xl p-5">

              <p className="text-yellow-300">
                {item.feedback}
              </p>

            </div>

          </div>

        </div>

      ))}

    </div>
  );
}

export default QuestionAnalysis;
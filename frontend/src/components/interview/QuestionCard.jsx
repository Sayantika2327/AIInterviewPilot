function QuestionCard({
  question,
  currentQuestion,
  totalQuestions,
}) {
  return (
    <div className="mt-10 flex flex-col items-center px-6">

      <div className="max-w-3xl w-full">
        <p className="text-xl md:text-2xl font-medium text-white text-center leading-8 break-words">
          {question}
        </p>
      </div>

      <p className="mt-5 text-lg font-semibold text-blue-400">
        Question {currentQuestion} of {totalQuestions}
      </p>

    </div>
  );
}

export default QuestionCard;
function AnswerBox({
  transcript,
  listening,
}) {
  return (
    <div className="mt-12">

      <div className="bg-slate-900 rounded-2xl p-6 border border-slate-800">

        <div className="flex items-center gap-3 mb-5">

          <div
            className={`w-4 h-4 rounded-full ${
              listening
                ? "bg-red-500 animate-pulse"
                : "bg-green-500"
            }`}
          />

          <h2 className="text-xl font-bold text-white">
            Candidate Response
          </h2>

        </div>

        <div className="min-h-[130px] rounded-xl bg-slate-950 p-5">

          <p className="text-slate-300 leading-8 text-lg">

            {transcript
              ? transcript
              : listening
              ? "Listening..."
              : "Waiting for your response..."}

          </p>

        </div>

      </div>

    </div>
  );
}

export default AnswerBox;
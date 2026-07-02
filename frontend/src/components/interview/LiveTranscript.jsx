function LiveTranscript({
  transcript,
  listening,
}) {
  return (
    <div className="bg-slate-900 rounded-2xl p-6 mt-10">

      <div className="flex items-center gap-3 mb-4">

        <div
          className={`w-3 h-3 rounded-full ${
            listening
              ? "bg-red-500 animate-pulse"
              : "bg-green-500"
          }`}
        />

        <h2 className="text-xl font-bold text-white">
          Live Transcript
        </h2>

      </div>

      <div className="min-h-[150px] rounded-xl bg-slate-950 p-5">

        <p className="text-slate-300 text-lg leading-8">

          {transcript
            ? transcript
            : listening
            ? "Listening..."
            : "Press microphone to answer..."}

        </p>

      </div>

    </div>
  );
}

export default LiveTranscript;
function AIAvatar({ listening = false, speaking = false }) {
  return (
    <div className="flex flex-col items-center justify-center">

      {/* Glowing Circle */}
      <div className="relative flex items-center justify-center">

        <div
          className={`w-72 h-72 rounded-full border-4
          ${
            speaking
              ? "border-cyan-400 animate-pulse"
              : "border-violet-500"
          }
          shadow-[0_0_80px_rgba(99,102,241,0.5)]`}
        />

        <div className="absolute text-8xl font-bold bg-gradient-to-r from-cyan-400 to-violet-500 bg-clip-text text-transparent">
          AI
        </div>

      </div>

      {/* Status */}
      <h2 className="text-4xl font-bold text-white mt-8">
        AI Interviewer
      </h2>

      <p className="text-slate-400 mt-2">
        Your AI-powered interview partner
      </p>

      <div className="mt-6 px-6 py-3 rounded-full bg-slate-800">

        <span className="text-blue-400 font-semibold">
          {listening ? "🎤 Listening..." : "🔊 Speaking..."}
        </span>

      </div>

    </div>
  );
}

export default AIAvatar;
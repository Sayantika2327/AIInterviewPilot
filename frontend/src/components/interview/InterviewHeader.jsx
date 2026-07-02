import { Clock, PhoneOff } from "lucide-react";

function InterviewHeader({ time }) {
  return (
    <div className="flex items-center justify-between mb-8">

      <div className="flex items-center gap-5">

        <h1 className="text-3xl font-bold text-white">
          InterviewPilot AI
        </h1>

        <div className="flex items-center gap-2">

          <div className="w-3 h-3 rounded-full bg-green-500 animate-pulse" />

          <span className="text-green-400 font-medium">
            Live Interview
          </span>

        </div>

      </div>

      <div className="flex items-center gap-4">

        <div className="flex items-center gap-2 bg-slate-800 px-5 py-3 rounded-xl">

          <Clock size={20} className="text-white" />

          <span className="text-white font-semibold">
            {time}
          </span>

        </div>

        <button className="flex items-center gap-2 bg-red-600 hover:bg-red-700 px-6 py-3 rounded-xl text-white font-semibold transition">

          <PhoneOff size={18} />

          End Interview

        </button>

      </div>

    </div>
  );
}

export default InterviewHeader;
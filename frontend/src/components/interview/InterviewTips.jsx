import {
  Lightbulb,
  Eye,
  Smile,
} from "lucide-react";

function InterviewTips() {
  return (
    <div className="bg-slate-900 rounded-2xl p-6">

      <h2 className="text-xl text-white font-bold">
        Interview Tips
      </h2>

      <div className="space-y-5 mt-6">

        <div className="flex gap-4">

          <Lightbulb className="text-yellow-400" />

          <p className="text-slate-300">
            Answer confidently and clearly.
          </p>

        </div>

        <div className="flex gap-4">

          <Eye className="text-cyan-400" />

          <p className="text-slate-300">
            Maintain eye contact.
          </p>

        </div>

        <div className="flex gap-4">

          <Smile className="text-green-400" />

          <p className="text-slate-300">
            Stay calm and smile naturally.
          </p>

        </div>

      </div>

    </div>
  );
}

export default InterviewTips;
import { TrendingUp } from "lucide-react";

function StatCard({
  title,
  value,
  icon: Icon,
  color = "bg-blue-600",
}) {
  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 hover:border-blue-500 transition-all duration-300">
      <div className="flex justify-between items-center">
        <div>
          <p className="text-slate-400 text-sm">
            {title}
          </p>

          <h2 className="text-3xl font-bold text-white mt-2">
            {value}
          </h2>
        </div>

        <div
          className={`${color} p-4 rounded-xl`}
        >
          <Icon size={26} className="text-white" />
        </div>
      </div>

      <div className="flex items-center gap-2 mt-6">
        <TrendingUp
          size={16}
          className="text-green-400"
        />

        <span className="text-green-400 text-sm">
          Live
        </span>
      </div>
    </div>
  );
}

export default StatCard;
import { ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

function FeatureCard({
  title,
  description,
  icon: Icon,
  color = "bg-blue-600",
  path,
}) {
  const navigate = useNavigate();

  return (
    <div
      onClick={() => navigate(path)}
      className="cursor-pointer bg-slate-900 border border-slate-800 rounded-2xl p-6 hover:border-blue-500 hover:scale-[1.02] transition-all duration-300"
    >
      <div className={`w-14 h-14 ${color} rounded-xl flex items-center justify-center`}>
        <Icon size={28} className="text-white" />
      </div>

      <h2 className="text-white text-xl font-semibold mt-5">
        {title}
      </h2>

      <p className="text-slate-400 mt-2">
        {description}
      </p>

      <div className="flex items-center gap-2 text-blue-400 mt-6">
        <span>Open</span>
        <ArrowRight size={18} />
      </div>
    </div>
  );
}

export default FeatureCard;
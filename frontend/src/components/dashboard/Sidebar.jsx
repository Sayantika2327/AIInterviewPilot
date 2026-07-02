import {
  LayoutDashboard,
  FileText,
  BarChart3,
  Mic,
  ClipboardList,
  LogOut,
  X,
} from "lucide-react";

import { NavLink, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

function Sidebar({ onClose }) {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("token");
    toast.success("Logged out successfully");
    navigate("/");
  };

  const menu = [
    {
      name: "Dashboard",
      icon: LayoutDashboard,
      path: "/dashboard",
    },
    {
      name: "Resume",
      icon: FileText,
      path: "/resume",
    },
    {
      name: "ATS Analysis",
      icon: BarChart3,
      path: "/ats",
    },
    {
      name: "AI Interview",
      icon: Mic,
      path: "/interview",
    },
    {
      name: "Reports",
      icon: ClipboardList,
      path: "/report",
    },
  ];

  return (
    <aside
      className="
      fixed
      left-0
      top-0
      h-screen
      w-72
      bg-slate-900
      border-r
      border-slate-800
      flex
      flex-col
      justify-between
      z-50
      shadow-2xl
      animate-slide-in
    "
    >
      <div>
        {/* Header */}

        <div className="h-20 border-b border-slate-800 flex items-center justify-between px-6">

          <h1 className="text-xl font-bold text-white">
            🤖 AI Interview Pilot
          </h1>

          <button
            onClick={onClose}
            className="text-slate-400 hover:text-white"
          >
            <X size={24} />
          </button>

        </div>

        {/* Menu */}

        <nav className="mt-8 px-4 space-y-2">

          {menu.map((item) => {
            const Icon = item.icon;

            return (
              <NavLink
                key={item.path}
                to={item.path}
                onClick={onClose}
                className={({ isActive }) =>
                  `flex items-center gap-4 px-4 py-3 rounded-xl transition ${
                    isActive
                      ? "bg-blue-600 text-white"
                      : "text-slate-300 hover:bg-slate-800 hover:text-white"
                  }`
                }
              >
                <Icon size={20} />
                {item.name}
              </NavLink>
            );
          })}

        </nav>
      </div>

      {/* Logout */}

      <div className="p-4">

        <button
          onClick={logout}
          className="w-full flex items-center justify-center gap-3 bg-red-600 hover:bg-red-700 rounded-xl py-3 text-white transition"
        >
          <LogOut size={20} />
          Logout
        </button>

      </div>

    </aside>
  );
}

export default Sidebar;
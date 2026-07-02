import { useEffect, useState } from "react";
import { LogOut, Bell, User, Menu } from "lucide-react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import { getDashboardData } from "../../services/dashboard";

function Navbar({ onMenuClick }) {
  const navigate = useNavigate();

  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const data = await getDashboardData();
        setUser(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchUser();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    toast.success("Logged out successfully");
    navigate("/");
  };

  return (
    <header className="h-20 bg-slate-900 border-b border-slate-800 flex items-center justify-between px-8">

      {/* Left */}
      <div className="flex items-center gap-5">

        <button
          onClick={onMenuClick}
          className="text-white hover:bg-slate-800 p-2 rounded-lg transition"
        >
          <Menu size={28} />
        </button>

        <div>
          <h1 className="text-2xl font-bold text-white">
            AI Interview Pilot
          </h1>

          <p className="text-slate-400 text-sm">
            AI Powered Career Assistant
          </p>
        </div>

      </div>

      {/* Right */}
      <div className="flex items-center gap-6">

        <Bell
          size={22}
          className="text-slate-300 hover:text-white cursor-pointer"
        />

        <div className="flex items-center gap-3 bg-slate-800 px-4 py-2 rounded-xl">

          <div className="bg-blue-600 p-2 rounded-full">
            <User size={18} className="text-white" />
          </div>

          <div>
            <p className="text-white font-medium">
              {user ? user.full_name : "Loading..."}
            </p>

            <p className="text-slate-400 text-sm">
              {user ? user.email : ""}
            </p>
          </div>

        </div>

        <button
          onClick={handleLogout}
          className="flex items-center gap-2 bg-red-600 hover:bg-red-700 px-4 py-2 rounded-lg text-white"
        >
          <LogOut size={18} />
          Logout
        </button>

      </div>

    </header>
  );
}

export default Navbar;
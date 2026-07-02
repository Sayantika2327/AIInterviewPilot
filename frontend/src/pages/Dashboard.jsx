import Navbar from "../components/dashboard/Navbar";
import Sidebar from "../components/dashboard/Sidebar";
import StatCard from "../components/dashboard/StatCard";
import FeatureCard from "../components/dashboard/FeatureCard";
import { useEffect, useState } from "react";
import { getDashboardData } from "../services/dashboard";

import {
  FileText,
  BarChart3,
  Mic,
  ClipboardList,
  CheckCircle,
  Award,
  Target,
  Activity,
} from "lucide-react";

function Dashboard() {
  const [user, setUser] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);

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
  return (
    <div className="flex min-h-screen bg-slate-950">
      {sidebarOpen && (
  <>
    <div
      className="fixed inset-0 bg-black/50 z-40"
      onClick={() => setSidebarOpen(false)}
    />

    <Sidebar
      onClose={() => setSidebarOpen(false)}
    />
  </>
)}

      <div className="flex-1">
        <Navbar
  user={user}
  onMenuClick={() => setSidebarOpen(true)}
/>

        <main className="p-8">

          <div className="mb-10">
            <h1 className="text-4xl font-bold text-white">
              Welcome Back 👋
            </h1>

            <p className="text-slate-400 mt-2">
              Prepare smarter with AI and ace your next interview.
            </p>
          </div>

          {/* Statistics */}

<div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">

  <StatCard
    title="Resume Uploaded"
    value={user?.resume_uploaded ? "Yes ✅" : "No"}
    icon={FileText}
    color="bg-blue-600"
  />

  <StatCard
    title="ATS Score"
    value={
      user?.ats_score > 0
        ? `${user.ats_score}%`
        : "--"
    }
    icon={Award}
    color="bg-green-600"
  />

            <StatCard
              title="Interview Score"
              value={
                user?.interview_score > 0
                  ? `${user.interview_score}%`
                  : "--"
              }
              icon={Target}
              color="bg-purple-600"
            />

  <StatCard
    title="Interviews Taken"
    value={user?.interviews_taken ?? 0}
    icon={Activity}
    color="bg-orange-600"
  />

</div>
          {/* Quick Actions */}

          <h2 className="text-2xl font-bold text-white mt-12 mb-6">
            Quick Actions
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">

            <FeatureCard
              title="Resume Upload"
              description="Upload your latest resume."
              icon={FileText}
              color="bg-blue-600"
              path="/resume"
            />

            <FeatureCard
              title="ATS Analysis"
              description="Analyze ATS compatibility."
              icon={BarChart3}
              color="bg-green-600"
              path="/ats"
            />

            <FeatureCard
              title="AI Interview"
              description="Start a mock interview."
              icon={Mic}
              color="bg-purple-600"
              path="/interview"
            />

            <FeatureCard
              title="Reports"
              description="View interview reports."
              icon={ClipboardList}
              color="bg-orange-600"
              path="/report"
            />

          </div>

          {/* Recent Activity */}

          

        </main>
      </div>
    </div>
  );
}

export default Dashboard;
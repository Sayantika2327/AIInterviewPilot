import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import Navbar from "../components/dashboard/Navbar";
import Sidebar from "../components/dashboard/Sidebar";

function ATS() {
  const navigate = useNavigate();

const [analysis, setAnalysis] = useState(null);

useEffect(() => {
  const savedAnalysis = localStorage.getItem("atsAnalysis");

  if (savedAnalysis) {
    setAnalysis(JSON.parse(savedAnalysis));
  }
}, []);

  if (!analysis) {
    return (
      <div className="flex min-h-screen bg-slate-950">
        <Sidebar />

        <div className="flex-1">
          <Navbar />

          <main className="p-8 max-w-6xl mx-auto">

            <h1 className="text-4xl font-bold text-white">
              ATS Analysis
            </h1>

            <p className="text-red-400 mt-8">
No ATS report found. Please analyze your resume first.
</p>

            <button
              onClick={() => navigate("/resume")}
              className="mt-6 px-6 py-3 bg-blue-600 rounded-xl text-white"
            >
              Go Back
            </button>

          </main>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-slate-950">
      <Sidebar />

      <div className="flex-1">
        <Navbar />

        <main className="p-8 max-w-6xl mx-auto">

          <h1 className="text-4xl font-bold text-white">
            ATS Analysis
          </h1>

          <p className="text-slate-400 mt-2">
            Resume successfully analyzed.
          </p>

          <div className="grid md:grid-cols-2 gap-6 mt-10">

            {/* ATS Score */}

            <div className="bg-slate-900 rounded-2xl p-6 border border-slate-800">

              <h2 className="text-xl text-white font-bold">
                ATS Score
              </h2>

              <p className="text-6xl font-bold text-green-400 mt-5">
                {analysis.ats_score}%
              </p>

            </div>

            {/* Matched Skills */}

            <div className="bg-slate-900 rounded-2xl p-6 border border-slate-800">

              <h2 className="text-xl text-white font-bold mb-4">
                Matched Skills
              </h2>

              {analysis.matched_skills.map((skill, index) => (
                <p
                  key={index}
                  className="text-green-400 mb-2"
                >
                  ✔ {skill}
                </p>
              ))}

            </div>

            {/* Missing Skills */}

            <div className="bg-slate-900 rounded-2xl p-6 border border-slate-800">

              <h2 className="text-xl text-white font-bold mb-4">
                Missing Skills
              </h2>

              {analysis.missing_skills.length === 0 ? (
                <p className="text-green-400">
                  🎉 No Missing Skills
                </p>
              ) : (
                analysis.missing_skills.map((skill, index) => (
                  <p
                    key={index}
                    className="text-red-400 mb-2"
                  >
                    ✖ {skill}
                  </p>
                ))
              )}

            </div>

            {/* Suggestions */}

            <div className="bg-slate-900 rounded-2xl p-6 border border-slate-800">

              <h2 className="text-xl text-white font-bold mb-4">
                Suggestions
              </h2>

              {analysis.suggestions.length === 0 ? (
                <p className="text-green-400">
                  Excellent Resume 🎉
                </p>
              ) : (
                analysis.suggestions.map((item, index) => (
                  <p
                    key={index}
                    className="text-yellow-300 mb-2"
                  >
                    • {item}
                  </p>
                ))
              )}

            </div>

          </div>

          <div className="flex justify-end mt-10">

            <button
              onClick={() => navigate("/interview")}
              className="px-8 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold transition"
            >
              🎤 Start AI Interview
            </button>

          </div>

        </main>
      </div>
    </div>
  );
}

export default ATS;
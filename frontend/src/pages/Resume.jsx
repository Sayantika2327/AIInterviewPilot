import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { UploadCloud } from "lucide-react";
import toast from "react-hot-toast";

import Navbar from "../components/dashboard/Navbar";
import Sidebar from "../components/dashboard/Sidebar";

import {
  uploadResume,
  analyzeResume,
} from "../services/resume";

function Resume() {
  const navigate = useNavigate();

  const [resume, setResume] = useState(null);
  const [jobDescription, setJobDescription] = useState("");
  const [loading, setLoading] = useState(false);

  const handleAnalyze = async () => {
    if (!resume) {
      toast.error("Please upload your resume.");
      return;
    }

    if (!jobDescription.trim()) {
      toast.error("Please enter the job description.");
      return;
    }

    try {
      setLoading(true);

      await uploadResume(resume);

      const result = await analyzeResume(jobDescription);

      toast.success("Resume analyzed successfully!");

// Save the latest ATS analysis
localStorage.setItem(
  "atsAnalysis",
  JSON.stringify(result)
);

// Save the Job Description (optional)
localStorage.setItem(
  "jobDescription",
  jobDescription
);

// Open ATS Analysis page
navigate("/ats");

    } catch (error) {
      console.error(error);

      toast.error(
        error.response?.data?.detail ||
        "Analysis failed."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen bg-slate-950">
      <Sidebar />

      <div className="flex-1">

        <Navbar />

        <main className="p-8 max-w-6xl mx-auto">

          <h1 className="text-4xl font-bold text-white">
            Resume Analysis
          </h1>

          <p className="text-slate-400 mt-2">
            Upload your resume and paste the job description to get an ATS score.
          </p>

          {/* Upload Resume */}

          <div className="mt-10 bg-slate-900 border border-slate-800 rounded-2xl p-8">

            <h2 className="text-2xl font-bold text-white mb-6">
              Upload Resume
            </h2>

            <label className="flex flex-col items-center justify-center border-2 border-dashed border-slate-700 rounded-2xl h-72 cursor-pointer hover:border-blue-500 transition">

              <UploadCloud
                size={70}
                className="text-blue-500"
              />

              <p className="text-white text-xl mt-5">
                Click to Upload Resume
              </p>

              <p className="text-slate-400 mt-2">
                PDF only • Max 5 MB
              </p>

              <input
                type="file"
                accept=".pdf"
                className="hidden"
                onChange={(e) =>
                  setResume(e.target.files[0])
                }
              />

            </label>

            {resume && (
              <div className="mt-5 bg-slate-800 border border-slate-700 rounded-xl p-4">

                <p className="text-green-400 font-semibold">
                  ✓ Resume Selected
                </p>

                <p className="text-slate-300 mt-1">
                  {resume.name}
                </p>

              </div>
            )}

          </div>

          {/* Job Description */}

          <div className="mt-10 bg-slate-900 border border-slate-800 rounded-2xl p-8">

            <h2 className="text-2xl font-bold text-white mb-6">
              Job Description
            </h2>

            <textarea
              rows={12}
              value={jobDescription}
              onChange={(e) =>
                setJobDescription(e.target.value)
              }
              placeholder="Paste the complete Job Description here..."
              className="w-full rounded-xl bg-slate-800 border border-slate-700 p-5 text-white resize-none outline-none focus:border-blue-500"
            />

            <div className="flex justify-end mt-8">

              <button
                onClick={handleAnalyze}
                disabled={loading}
                className="px-8 py-3 rounded-xl bg-green-600 hover:bg-green-700 disabled:opacity-60 text-white font-semibold transition"
              >
                {loading
                  ? "Analyzing..."
                  : "🚀 Analyze Resume"}
              </button>

            </div>

          </div>

        </main>

      </div>
    </div>
  );
}

export default Resume;
import { useEffect, useState, useRef } from "react";
import { useReactToPrint } from "react-to-print";

import Navbar from "../components/dashboard/Navbar";
import Sidebar from "../components/dashboard/Sidebar";

import ScoreCards from "../components/report/ScoreCards";
import OverallFeedback from "../components/report/OverallFeedback";
import Recommendation from "../components/report/Recommendation";
import StrengthWeakness from "../components/report/StrengthWeakness";
import Roadmap from "../components/report/Roadmap";
import QuestionAnalysis from "../components/report/QuestionAnalysis";
import DownloadReportButton from "../components/report/DownloadReportButton";

import { getLatestReport } from "../services/interview";

function Report() {
  const [report, setReport] = useState(null);
  const [loading, setLoading] = useState(true);

  // Reference to the report section
  const reportRef = useRef(null);

  // Print handler
  const handlePrint = useReactToPrint({
    contentRef: reportRef,
    documentTitle: "AI_Interview_Report",
  });

  useEffect(() => {
    loadReport();
  }, []);

  const loadReport = async () => {
    try {
      const data = await getLatestReport();
      console.log("Latest Report:", data);
      setReport(data);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center">
        <h1 className="text-white text-3xl">
          🤖 Generating AI Report...
        </h1>
      </div>
    );
  }

  if (!report) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center">
        <h1 className="text-white text-2xl">
          No completed interview found.
        </h1>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-slate-950">

      <Sidebar />

      <div className="flex-1">

        <Navbar />

        <main
          ref={reportRef}
          className="max-w-7xl mx-auto p-8 bg-slate-950"
        >

          <div className="flex justify-between items-center mb-10">

            <h1 className="text-4xl font-bold text-white">
              AI Interview Report
            </h1>

            <DownloadReportButton
              onDownload={handlePrint}
            />

          </div>

          <ScoreCards
            overall={report.overall_score}
            technical={report.technical_score}
            communication={report.communication_score}
            confidence={report.confidence_score}
            problemSolving={report.problem_solving_score}
          />

          <OverallFeedback
            feedback={report.overall_feedback}
          />

          <Recommendation
            recommendation={report.hiring_recommendation}
          />

          <StrengthWeakness
            strengths={report.strengths}
            weaknesses={report.weaknesses}
          />

          <Roadmap
            roadmap={report.learning_roadmap}
          />

          <QuestionAnalysis
            questions={report.question_analysis}
          />

        </main>

      </div>

    </div>
  );
}

export default Report;
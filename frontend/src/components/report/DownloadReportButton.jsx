import { Download } from "lucide-react";

function DownloadReportButton({ onDownload }) {
  return (
    <button
      onClick={onDownload}
      className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-5 py-3 rounded-xl transition"
    >
      <Download size={20} />
      Download PDF
    </button>
  );
}

export default DownloadReportButton;
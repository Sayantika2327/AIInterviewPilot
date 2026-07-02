import api from "./api";

// Start Interview
export const startInterview = async (jobDescription) => {
  const response = await api.post("/interview/start", {
    job_description: jobDescription,
  });

  return response.data;
};

// Submit Answer + Get Next Question
export const nextQuestion = async (
  interviewId,
  answer
) => {
  const response = await api.post("/interview/next", {
    interview_id: interviewId,
    answer,
  });

  return response.data;
};

// Get Report by Interview ID
export const getInterviewReport = async (
  interviewId
) => {
  const response = await api.post("/interview/report", {
    interview_id: interviewId,
  });

  return response.data;
};

// ✅ Get Latest Completed Interview Report
export const getLatestReport = async () => {
  const response = await api.get(
    "/interview/latest-report"
  );

  return response.data;
};
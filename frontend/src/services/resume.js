import api from "./api";


export const uploadResume = async (file) => {
  const formData = new FormData();

  formData.append("file", file);

  const response = await api.post(
    "/resume/upload",
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );

  return response.data;
};

export const analyzeResume = async (jobDescription) => {
  const response = await api.post(
    "/resume/analyze",
    {
      job_description: jobDescription,
    }
  );

  return response.data;
};
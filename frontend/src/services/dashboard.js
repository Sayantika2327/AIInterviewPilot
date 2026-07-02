import api from "./api";

export const getDashboardData = async () => {
  const response = await api.get("/users/me");
  return response.data;
};
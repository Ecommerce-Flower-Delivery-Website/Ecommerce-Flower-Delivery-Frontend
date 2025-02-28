import axios from "axios";

export const api = axios.create({
  baseURL: import.meta.env.VITE_PUBLIC_API_BASE_URL + "/api/v1",
});

api.interceptors.request.use((config) => {
  const token = JSON.parse(localStorage.getItem("token") || "null");
  config.headers.Authorization = `Bearer ${token}`;
  return config;
});

api.interceptors.response.use(
  (response) => {
    console.log(response);
    return response;
  },
  (error) => {
    console.log(error);

    const { response } = error;
    if (response?.status === 401) {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      // window.location.reload();
    } else if (response?.status === 404) {
      //Show not found
    }

    throw error;
  }
);

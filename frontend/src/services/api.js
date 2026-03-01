import axios from "axios";

const BASE_URL = "http://localhost:8000/api";

const axiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});


axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
   
    config.headers.Authorization = `Token ${token}`;
  }
  return config;
});


export const api = {
  auth: {
    login: (credentials) => 
      axiosInstance.post("/accounts/login/", credentials).then(res => res.data),
  },

  projects: {
    getAll: () => 
      axiosInstance.get("/projects/").then(res => res.data),
    
    getById: (id) => 
      axiosInstance.get(`/projects/${id}/`).then(res => res.data),

    like: (id) => 
      axiosInstance.post(`/projects/${id}/like/`).then(res => res.data),
  },

  resources: {
    getDownloadUrl: (id) => `${BASE_URL}/generic/download/${id}/`,
    upload: (formData) =>
      axiosInstance.post("/generic/upload/", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      }).then(res => res.data),
  }
};


export default axiosInstance;
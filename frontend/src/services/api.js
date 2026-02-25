import axios from "axios";

const BASE_URL = "http://localhost:8000/api";

// This is the Axios engine
const axiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// This replaces your manual getAuthHeaders()
// It automatically grabs the token before every request
axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    // We use 'Token' because that's what your Django backend expects
    config.headers.Authorization = `Token ${token}`;
  }
  return config;
});

// We keep the name 'api' so your components don't break!
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

// Also export the instance as default just in case your friend needs it
export default axiosInstance;
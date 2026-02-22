const BASE_URL = "http://localhost:8000/api";

const handleResponse = async (response) => {
  if (!response.ok) {
    if (response.status === 401) {
       console.warn("Unauthorized: Please log in.");
    }
    const error = await response.json().catch(() => ({}));
    throw new Error(error.message || `Error ${response.status}`);
  }
  return response.json();
};

const getAuthHeaders = () => {
  const token = localStorage.getItem("token"); 
  return token ? { "Authorization": `Token ${token}` } : {};
};

export const api = {
  auth: {
    login: (credentials) => 
      fetch(`${BASE_URL}/accounts/login/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(credentials),
      }).then(handleResponse),
  },

  projects: {
    getAll: () => 
      fetch(`${BASE_URL}/projects/`, {
        headers: { ...getAuthHeaders() }
      }).then(handleResponse),
    
    getById: (id) => 
      fetch(`${BASE_URL}/projects/${id}/`, {
        headers: { ...getAuthHeaders() }
      }).then(handleResponse),

    like: (id) => 
      fetch(`${BASE_URL}/projects/${id}/like/`, {
        method: "POST",
        headers: { 
          ...getAuthHeaders(),
          "Content-Type": "application/json" 
        },
      }).then(handleResponse),
  },

  resources: {
    getDownloadUrl: (id) => `${BASE_URL}/generic/download/${id}/`,
    upload: (formData) =>
      fetch(`${BASE_URL}/generic/upload/`, {
        method: "POST",
        headers: { ...getAuthHeaders() },
        body: formData,
      }).then(handleResponse),
  }
};
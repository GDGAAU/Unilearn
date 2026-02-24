import axios from "axios";

const API_BASE_URL = "http://localhost:5000/api/auth"; 

export const authService = {
  login: async (email, password) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/login`, { email, password });
      return response.data; 
    } catch (error) {
      throw new Error(error.response?.data?.message || "Invalid credentials");
    }
  },

  register: async ({ name, email, password }) => {
    if (!name || !email || !password) {
      throw new Error("Name, email, and password are required");
    }
    try {
      const response = await axios.post(`${API_BASE_URL}/register`, { name, email, password });
      return response.data; 
    } catch (error) {
      throw new Error(error.response?.data?.message || "Registration failed");
    }
  },

  
  forgotPassword: async (email) => {
    if (!email) {
      throw new Error("Email is required");
    }
    try {
      const response = await axios.post(`${API_BASE_URL}/forgot-password`, { email });
      return response.data; 
    } catch (error) {
      throw new Error(error.response?.data?.message || "Failed to send reset link");
    }
  },
};
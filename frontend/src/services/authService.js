import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000/api/auth'; //to be  replaced with  actual backend URL

export const authService = {
    login: async (email, password) => {
        try {
            const response = await axios.post(`${API_BASE_URL}/login`, { email, password });
            return response.data; 
        } catch (error) {
            throw new Error(error.response?.data?.message || "Invalid credentials");
        }
    },

    // Added so that signup page can save real users
    register: async (userData) => {
        try {
            const response = await axios.post(`${API_BASE_URL}/register`, userData);
            return response.data;
        } catch (error) {
            throw new Error(error.response?.data?.message || "Registration failed");
        }
    }
};
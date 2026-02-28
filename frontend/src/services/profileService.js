import api from './api';
const profileService = {
  
  getProfile: async (id) => {
    try {
      const response = await api.get(`/accounts/profiles/${id}/`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching profile ID ${id}:`, error.message);
      throw error;
    }
  },

  getStudentResources: async () => {
    try {
      const response = await api.get('/resources/');
      return response.data;
    } catch (error) {
      console.error("Error fetching resources:", error.message);
      throw error;
    }
  },

  getStudentProjects: async () => {
    try {
      const response = await api.get('/projects/');
      return response.data;
    } catch (error) {
      console.error("Error fetching projects:", error.message);
      throw error;
    }
  }
};

export default profileService;
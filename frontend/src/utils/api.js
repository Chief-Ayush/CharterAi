import axios from "axios";

const API_BASE_URL = "http://localhost:4000";

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Auth API calls
export const authAPI = {
  login: async (email, password) => {
    const response = await api.post("/api/auth/login", { email, password });
    return response.data;
  },

  signup: async (userData) => {
    const response = await api.post("/api/auth/signup", userData, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response.data;
  },

  signupWithFiles: async (formData) => {
    const response = await api.post("/api/auth/signup", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  },
};

// Document API calls
export const documentAPI = {
  upload: async (formData) => {
    // Get user from localStorage
    const userStr = localStorage.getItem("charterAiUser");
    const user = userStr ? JSON.parse(userStr) : null;

    if (!user) {
      throw new Error("User not authenticated");
    }

    // Add userId to formData
    formData.append("userId", user._id);

    const response = await api.post("/api/documents/upload", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
        "x-user-id": user._id,
      },
    });
    return response.data;
  },

  getAll: async (filters = {}) => {
    const userStr = localStorage.getItem("charterAiUser");
    const user = userStr ? JSON.parse(userStr) : null;

    if (!user) {
      throw new Error("User not authenticated");
    }

    const response = await api.get("/api/documents", {
      params: filters,
      headers: {
        "x-user-id": user._id,
      },
    });
    return response.data;
  },

  getById: async (id) => {
    const userStr = localStorage.getItem("charterAiUser");
    const user = userStr ? JSON.parse(userStr) : null;

    if (!user) {
      throw new Error("User not authenticated");
    }

    const response = await api.get(`/api/documents/${id}`, {
      headers: {
        "x-user-id": user._id,
      },
    });
    return response.data;
  },

  updateStatus: async (id, status) => {
    const userStr = localStorage.getItem("charterAiUser");
    const user = userStr ? JSON.parse(userStr) : null;

    if (!user) {
      throw new Error("User not authenticated");
    }

    const response = await api.patch(
      `/api/documents/${id}/status`,
      { reviewStatus: status },
      {
        headers: {
          "x-user-id": user._id,
        },
      }
    );
    return response.data;
  },

  delete: async (id) => {
    const userStr = localStorage.getItem("charterAiUser");
    const user = userStr ? JSON.parse(userStr) : null;

    if (!user) {
      throw new Error("User not authenticated");
    }

    const response = await api.delete(`/api/documents/${id}`, {
      headers: {
        "x-user-id": user._id,
      },
    });
    return response.data;
  },
};

export default api;

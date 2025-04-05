import { create } from "zustand";
import axios from "axios";

axios.defaults.withCredentials = true;

const useAuthStore = create((set) => ({
  user: null,
  isLoading: false,
  isAuthenticated: false,
  isCheckingAuth: false,
  login: async (email, password) => {
    set({ isLoading: true });
    try {
      const res = await axios.post("http://localhost:3000/api/v1/auth/login", {
        email,
        password,
      });
      set({ user: res.data.user, isAuthenticated: true });
      return res;
    } catch (error) {
      console.log(error.message);
      return error;
    } finally {
      set({ isLoading: false });
    }
  },

  signup: async (name, email, password) => {
    set({ isLoading: true });
    try {
      const res = await axios.post("http://localhost:3000/api/v1/auth/signup", {
        name,
        email,
        password,
      });
      set({ user: res.data.user, isAuthenticated: true });
      return res;
    } catch (error) {
      console.log(error);
      return error;
    } finally {
      set({ isLoading: false });
    }
  },

  check: async () => {
    set({ isCheckingAuth: true, isLoading: true });
    try {
      const res = await axios.post("http://localhost:3000/api/v1/verify/check");
      set({ user: res.data.user, isAuthenticated: true });
    } catch (error) {
      console.error("Error checking auth:", error);
    } finally {
      set({ isCheckingAuth: false, isLoading: false });
    }
  },

  upload: async (file, documentName) => {
    set({ isLoading: true });
    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("name", documentName);

      const res = await axios.post(
        "http://localhost:3000/api/v1/document/upload",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        },
      );
      return res.data;
    } catch (error) {
      console.error("Error uploading document:", error);
      throw error;
    } finally {
      set({ isLoading: false });
    }
  },

  requestCredict: async (requestedCredits, reason) => {
    set({ isLoading: true });
    try {
      const res = await axios.post(
        "http://localhost:3000/api/v1/credit/request",
        {
          requestedCredits,
          reason,
        },
      );
      console.log(res);
    } catch (error) {
      console.log(error);
    } finally {
      set({ isLoading: false });
    }
  },

  getAllPendingRequests: async () => {
    set({ isLoading: true });
    try {
      const res = await axios.get(
        "http://localhost:3000/api/v1/credit/admin/pending",
      );
      console.log(res);
      return res;
    } catch (error) {
      console.log(error);
      return error;
    } finally {
      set({ isLoading: false });
    }
  },

  fetchUser: async (id) => {
    set({ isLoading: true });
    try {
      const res = await axios.post("http://localhost:3000/api/v1/user/", {
        id,
      });
      console.log("Fetched user:", res.data);
      set({ user: res.data });
      return res.data;
    } catch (error) {
      console.error("Error fetching user:", error);
      return null;
    } finally {
      set({ isLoading: false });
    }
  },

  matchDocument: async (sourceDocumentId, targetDocumentIds) => {
    set({ isLoading: true });
    try {
      const res = await axios.post(
        "http://localhost:3000/api/v1/document/match",
        {
          sourceDocumentId,
          targetDocumentIds,
        },
      );
      console.log(res);
      return res;
    } catch (error) {
      console.log(error);
      return error;
    } finally {
      set({ isLoading: false });
    }
  },

  getAnalytics: async () => {
    set({ isLoading: true });
    try {
      const res = await axios.get(
        "http://localhost:3000/api/v1/admin/analytics",
      );
      return res;
    } catch (error) {
      return error;
    } finally {
      set({ isLoading: false });
    }
  },

  approveCredict: async (requestId, status) => {
    set({ isLoading: true });
    try {
      const res = await axios.post(
        "http://localhost:3000/api/v1/credit/admin/process",
        {
          requestId,
          status,
        },
      );
      console.log(res);
    } catch (error) {
      console.log(error);
      return error;
    } finally {
      set({ isLoading: false });
    }
  },
  approveCredict: async (requestId, status) => {
    try {
      const res = await axios.post(
        "http://localhost:3000/api/v1/credit/admin/process",
        {
          requestId,
          status,
        },
      );
      console.log(res);
    } catch (error) {
      console.log(error);
      return error;
    }
  },
  logout: async () => {
    try {
      const res = await axios.post("http://localhost:3000/api/v1/auth/logout");
    } catch (error) {}
  },
}));

export default useAuthStore;

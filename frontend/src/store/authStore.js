import { create } from "zustand";
import axios from "axios";

axios.defaults.withCredentials = true;

const useAuthStore = create((set) => ({
  user: null,
  isAuthenticated: false,
  login: async (email, password) => {
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
    }
  },
  signup: async (name, email, password) => {
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
    }
  },
  check: async () => {
    try {
      const res = await axios.post("http://localhost:3000/api/v1/verify/check");
      console.log(res);
      set({ user: res.data.user, isAuthenticated: true });
    } catch (error) {
      console.error("Error checking auth:", error);
    }
  },
  upload: async (file, documentName) => {
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
    }
  },
  requestCredict: async (requestedCredits, reason) => {
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
    }
  },
  getAllPendingRequests: async () => {
    try {
      const res = await axios.get(
        "http://localhost:3000/api/v1/credit/admin/pending",
      );
      console.log(res);
    } catch (error) {
      console.log(error);
      return error;
    }
  },
  fetchUser: async (id) => {
    try {
      const res = await axios.post(`http://localhost:3000/api/v1/user/`,{id});
      console.log("Fetched user:", res.data);
      set({ user: res.data });
      return res.data;
    } catch (error) {
      console.error("Error fetching user:", error);
      return null;
    }
  },
  matchDocument:async(sourceDocumentId,targetDocumentIds)=>{
    try {
        const res=await axios.post("hhtp://localhost:3000/api/v1/document/match",{
            sourceDocumentId,
            targetDocumentIds
        });
        console.log(res);
    } catch (error) {
        console.log(error);
        return error;
    }
  },
  getAnalytics:async()=>{
        try {
            const res=await axios.get("http://localhost:3000/api/v1/admin/analytics");
            return res
        } catch (error) {
            return error;
        }
  },
  approveCredict:async(requestId,status)=>{
        try {
            const res=await axios.post("http://localhost:3000/api/v1/credit/admin/process",{
                requestId,
                status});
            console.log(res);
        } catch (error) {
            console.log(error);
            return error;
        }
  }
}));

export default useAuthStore;

import {create} from "zustand";
import axios from "axios";

axios.defaults.withCredentials = true;

const useAuthStore=create((set)=>({
    user:null,
    isAuthenticated:false,
    login:async (email,password)=>{
        try {
            const res=await axios.post("http://localhost:3000/api/v1/auth/login",{
                email,
                password
            });
            set({user:res.data.user,isAuthenticated:true});
            return res;
        } catch (error) {
            console.log(error.message);
            return error;
        }
    },
    signup:async(name,email,password)=>{
        try {
            const res=await axios.post("http://localhost:3000/api/v1/auth/signup",{
                name,
                email,
                password
            });
            set({user:res.data.user,isAuthenticated:true});
            return res;
        } catch (error) {
            console.log(error);
        }
    },
    check:async()=>{
        try {
            const res=await axios.post("http://localhost:3000/api/v1/verify/check");
            set({user:res.data.user,isAuthenticated:true});
        } catch (error) {
            console.error("Error checking auth:", error);
        }
    },
    upload: async (file, documentName) => {
        try {
          const formData = new FormData();
          formData.append('file', file);
          formData.append('name', documentName);
          
          const res = await axios.post("http://localhost:3000/api/v1/document/upload", 
            formData,
            {
              headers: {
                'Content-Type': 'multipart/form-data'
              }
            }
          );
          
          return res.data;
        } catch (error) {
          console.error("Error uploading document:", error);
          throw error;
        }
      },
}));

export default useAuthStore;
import { create } from "zustand";
import axios from "axios";
import baseUrl from "../config.jsx"; 

const useAuthStore = create((set)=>({
    isAuthenticated:false,
    isLoading:false,
    name:"",
    userId:"",
    email:"", 

    fetchUser : async()=>{
        set({isLoading:true});

        try{
            const {data} = await axios.get(`${baseUrl}/auth/checkAuth`, {
                withCredentials:true
            });

            const {_id, name, email} = data;
            set({
                isAuthenticated:true,
                isLoading:false,
                name,
                userId:_id,
                email
            });
            console.log("user name is", name);
        }
        catch(err){
            console.log("Error while fetching the data in the fetch method:", err);
            set({ isLoading: false, isAuthenticated: false });
        }
    },

    logOut: async()=>{
        set({
            isAuthenticated:false,
            isLoading:false,
            userId:"",
            name:"",
            email:"",
        });
    }
}));

export default useAuthStore;
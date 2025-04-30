import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
// import { RootState } from "../store";
// import { IUser } from "../../types/auth.interface";
import { RootState } from "../store";
// import { RootState } from "../store"; // Import RootState to get the token from Redux
// import { IUser } from "@/models/user.interface";
// import { RootState } from "./store";
// import { IUser } from "../models/user.interface";
// console.log("import.meta.env.VITE_BACKEND_URL", import.meta.env.VITE_BACKEND_URL);

const baseQuery = fetchBaseQuery({
    // baseUrl: "http://localhost:5000/api/v1/auth",
    baseUrl: `${import.meta.env.VITE_BACKEND_URL}/api/v1/project`,
    credentials: "include",
    prepareHeaders: (headers, { getState }) => {
        const token = (getState() as RootState).auth?.user?.token || ""; 
        if (token) {
            headers.set("Authorization", `Bearer ${token}`);
        }
        return headers;
    },
});

//  .post("/send-otp-register", authController.requestRegistrationOTP)
//     .post("/verify-register", authController.verifyRegistrationOTP)
//     .post("/register", authController.registerUser)
// Create API service
export const projectApi = createApi({
    reducerPath: "projectApi",
    baseQuery,
    tagTypes: ["project"],

    endpoints: (builder) => ({
      
        createProject: builder.mutation<{ message: string }, {name:string}>({
            query: (data) => ({
                url: "/",
                method: "POST",
                body:data
            }),
            invalidatesTags:["project"]
        }),


    
        
        fetchAllProjects: builder.query<{ message: string; result: any }, void>({
            query: () => ({
                url: "/",
                method: "GET",
            
            }),
            providesTags:["project"],
            transformResponse(data: { message: string; result: any }) {
          
                
                return data; 
            },
        }),

     

        
    }),
});

// Export Hooks
export const {
    useFetchAllProjectsQuery,
    useCreateProjectMutation
} = projectApi;

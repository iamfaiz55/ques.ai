import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
// import { RootState } from "../store";
import { IUser } from "../../types/auth.interface";
// import { RootState } from "../store"; // Import RootState to get the token from Redux
// import { IUser } from "@/models/user.interface";
// import { RootState } from "./store";
// import { IUser } from "../models/user.interface";

const baseQuery = fetchBaseQuery({
    // baseUrl: "http://localhost:5000/api/v1/auth",
    baseUrl: `${import.meta.env.VITE_BACKEND_URL}/api/v1/auth`,
    credentials: "include",
    // prepareHeaders: (headers, { getState }) => {
    //     const token = (getState() as RootState).auth?.user?.token || ""; 
    //     if (token) {
    //         headers.set("Authorization", `Bearer ${token}`);
    //     }
    //     return headers;
    // },
});

//  .post("/send-otp-register", authController.requestRegistrationOTP)
//     .post("/verify-register", authController.verifyRegistrationOTP)
//     .post("/register", authController.registerUser)
// Create API service
export const authApi = createApi({
    reducerPath: "authApi",
    baseQuery,
    endpoints: (builder) => ({
        signIn: builder.mutation<{ message: string; result:IUser}, {email:string, password:string }>({
            query: (userData) => ({
                url: "/login",
                method: "POST",
                body: userData,
            }),
            transformResponse(data: { message: string; result:IUser }) {
                localStorage.setItem("user", JSON.stringify(data.result));
                return data; // ✅ Ensure the response is returned
            },
            transformErrorResponse: (error: { status: number; data: { message: string } }) => error.data.message,
        }),

        signOut: builder.mutation<{ message: string }, void>({
            query: () => ({
                url: "/sign-out",
                method: "POST",
            }),
        }),


    
        
        register: builder.mutation<{ message: string; result: IUser }, { name: string; password:string, email:string }>({
            query: (userData) => ({
                url: "/register",
                method: "POST",
                body: userData,
            }),
            transformResponse(data: { message: string; result: IUser }) {
          
                
                return data; // ✅ Ensure the response is returned
            },
        }),

         googleLogin: builder.mutation<{ message: string; result:  IUser  }, { idToken:string }>({
                    query: (userData) => ({
                        url: "/google-login",
                        method: "POST",
                        body: userData, 
                    }),
                    transformResponse: (data: { message: string, result: IUser  }) => data,
                }),

        
    }),
});

// Export Hooks
export const {
    useSignInMutation, 
    useRegisterMutation,
    useSignOutMutation
} = authApi;

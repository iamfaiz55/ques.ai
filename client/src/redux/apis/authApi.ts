import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { IUser } from "../../types/auth.interface";


const baseQuery = fetchBaseQuery({
    baseUrl: `${import.meta.env.VITE_BACKEND_URL}/api/v1/auth`,
    credentials: "include",

});


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
          
                
                return data; 
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

export const {
    useSignInMutation, 
    useRegisterMutation,
    useSignOutMutation
} = authApi;

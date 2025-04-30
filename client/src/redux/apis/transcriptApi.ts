import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { RootState } from "../store";

export interface ITranscript {
    name:string
    _id?:string
    createdAt?:Date
    project?:string
transcript:string
}

const baseQuery = fetchBaseQuery({
    baseUrl: `${import.meta.env.VITE_BACKEND_URL}/api/v1/transcript`,
    credentials: "include",
    
    prepareHeaders: (headers, { getState }) => {
        const token = (getState() as RootState).auth?.user?.token || ""; 
        if (token) {
            headers.set("Authorization", `Bearer ${token}`);
        }
        return headers;
    },
});

export const transcriptApi = createApi({
    reducerPath: "transcriptApi",
    baseQuery,
    tagTypes: ["transcript"],

    endpoints: (builder) => ({
      

        fetchTranscriptFromYoutube: builder.mutation<{ message: string, result:any }, {youtubeUrl:string, projectId:string, name:string}>({
            query: (data) => ({
                url: "/",
                method: "POST",
                body:data
            }),
            invalidatesTags: ["transcript"],

        }),
    
        getAllTranscripts: builder.query<{ message: string; result:ITranscript[] }, string>({
            query: (id) => ({
                url: `/all/${id}`,
                method: "GET",
            }),
            providesTags: ["transcript"],
        }),

         getSingleTranscript: builder.query<{ message: string; result:  ITranscript  }, string>({
             query: (id) => ({
                 url: `/${id}`,
                 method: "GET",
             }),
             providesTags: ["transcript"],
        }),
         getTranscripts: builder.query<{ message: string; result:  ITranscript[]  }, void>({
             query: () => ({
                 url: `/projects-all`,
                 method: "GET",
             }),
             providesTags: ["transcript"],
        }),

        
    }),
});

// Export Hooks
export const {
    useFetchTranscriptFromYoutubeMutation,
   useGetAllTranscriptsQuery,
   useGetSingleTranscriptQuery,
   useGetTranscriptsQuery
} = transcriptApi;

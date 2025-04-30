import { configureStore } from "@reduxjs/toolkit";
import { authApi } from "./apis/authApi";
import { transcriptApi } from "./apis/transcriptApi";
import { projectApi } from "./apis/projectApi";
import authSlice  from "./slices/authSlice";
// import { authApi } from "./authApi";





const reduxStore = configureStore({
  reducer: {
    [authApi.reducerPath]: authApi.reducer,
    [transcriptApi.reducerPath]: transcriptApi.reducer,
    [projectApi.reducerPath]: projectApi.reducer,
    auth:authSlice
  

  
  },
  middleware: (getDefaultMiddleware:any) =>
    getDefaultMiddleware().concat(
      authApi.middleware,
      transcriptApi.middleware,
      projectApi.middleware,
      
  
    )
})


export type RootState = ReturnType<typeof reduxStore.getState>
export type AppDispatch = typeof reduxStore.dispatch

export default reduxStore


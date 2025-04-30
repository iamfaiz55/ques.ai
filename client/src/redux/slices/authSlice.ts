import { createSlice } from "@reduxjs/toolkit";
// import { IUser } from "../../models/user.interface";
// import { authApi } from "../authApi";
import { IUser } from "../../types/auth.interface";
import { authApi } from "../apis/authApi";

// Define initial state structure
interface AuthState {
    user: IUser | null;
    
    sessionExpiredOpen: boolean;
}

// Safely get user data from localStorage
const getUserFromLocalStorage = (): IUser | null => {
    try {
        const user = localStorage.getItem("user");
        return user ? JSON.parse(user) : null;
    } catch (error) {
        console.error("Error parsing user from localStorage:", error);
        return null;
    }
};


// Define initial state
const initialState: AuthState = {
    user: getUserFromLocalStorage(),
    
    sessionExpiredOpen: false,
};

// Create Redux slice
const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        logoutUser: (state) => {
            state.user = null;
            localStorage.removeItem("user");
        },
        openSessionExpiredModal: (state) => {
            state.sessionExpiredOpen = true;
        },
        addDataFor: (state) => {
            state.sessionExpiredOpen = false;
        },
    },
    extraReducers: (builder) =>
        builder
            .addMatcher(authApi.endpoints.signIn.matchFulfilled, (state, { payload }) => {
                localStorage.setItem("user", JSON.stringify(payload.result));
                state.user = payload.result;
                // state.token = payload.result.token || null; // Ensure token is stored
            })
            .addMatcher(authApi.endpoints.googleLogin.matchFulfilled, (state, { payload }) => {
                localStorage.setItem("user", JSON.stringify(payload.result));
                state.user = payload.result;
                // state.token = payload.result.token || null;
            })
          
            .addMatcher(authApi.endpoints.signOut.matchFulfilled, (state) => {
                state.user = null;
                // state.token = null;
                localStorage.removeItem("user");
            })
           
});

// Export actions
// export const { logoutUser, openSessionExpiredModal } = authSlice.actions;

// Export reducer
export default authSlice.reducer;

// Export type
export type { AuthState };

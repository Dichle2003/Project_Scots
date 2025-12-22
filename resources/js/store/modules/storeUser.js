import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../../api";
// Hàm async thunk gọi API login
export const loginAsync = createAsyncThunk(
    "users/loginAsync",
    async ({ email, password }, thunkAPI) => {
        try {
            const response = await api.post("/login", { email, password });
            if (!response.status) {
                return thunkAPI.rejectWithValue(data.message || "Login failed");
            }
            return response.data; 
        } catch (err) {
            return thunkAPI.rejectWithValue(
                err.response?.data?.message || "Server error"
            );
        }
    }
);
const user = createSlice({
    name: 'users',
   initialState: {
  user: localStorage.getItem("user")
    ? JSON.parse(localStorage.getItem("user"))
    : null,
  token: localStorage.getItem("token"),
  isAuthenticated: !!localStorage.getItem("token"),
  loading: false,
  error: null,
},
    reducers:{
        logout: (state) => {
            state.user = null;
            state.token = null;
            state.isAuthenticated = false;
            localStorage.removeItem("token");
            localStorage.removeItem("user");
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(loginAsync.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(loginAsync.fulfilled, (state, action) => {
                state.loading = false;
                const { access_token, user } = action.payload;
                state.user = user;
                state.token = access_token;
                state.isAuthenticated = true;

                // Lưu token vào localStorage
                localStorage.setItem("token", access_token);
                localStorage.setItem("user",JSON.stringify(user));

            })
            .addCase(loginAsync.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
})
export const { login, logout } = user.actions;
export default user.reducer;

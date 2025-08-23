import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { request } from "../lib/client";

export const refreshMe = createAsyncThunk("auth/refreshMe", async (_, thunkAPI) => {
  try {
    const res = await request("/api/auth/me", { method: "GET" });
    return res.user || null;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.payload || { error: "Failed to fetch user" });
  }
});

export const login = createAsyncThunk("auth/login", async ({ email, password }, thunkAPI) => {
  try {
    const res = await request("/api/auth/login", {
      method: "POST",
      body: { email, password },
      headers: { "Content-Type": "application/json" }
    });
    if (res.ok && res.user) {
      return res.user;
    } else {
      return thunkAPI.rejectWithValue(res.error || { error: "Login failed" });
    }
  } catch (error) {
    return thunkAPI.rejectWithValue(error.payload || { error: "Login failed" });
  }
});

export const signup = createAsyncThunk("auth/signup", async ({ name, email, password }, thunkAPI) => {
  try {
    return await request("/api/auth/signup", {
      method: "POST",
      body: { name, email, password },
      headers: { "Content-Type": "application/json" }
    });
  } catch (error) {
    return thunkAPI.rejectWithValue(error.payload || { error: "Signup failed" });
  }
});

export const resendVerification = createAsyncThunk("auth/resendVerification", async (email, thunkAPI) => {
  try {
    return await request("/api/auth/resend-verification", {
      method: "POST",
      body: { email },
      headers: { "Content-Type": "application/json" }
    });
  } catch (error) {
    return thunkAPI.rejectWithValue(error.payload || { error: "Failed to resend verification" });
  }
});

export const logout = createAsyncThunk("auth/logout", async (_, thunkAPI) => {
  try {
    await request("/api/auth/logout", { method: "POST" });
    return null;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.payload || { error: "Logout failed" });
  }
});

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: null,
    initializing: true,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(refreshMe.fulfilled, (state, action) => {
        state.user = action.payload;
        state.initializing = false;
      })
      .addCase(refreshMe.rejected, (state) => {
        state.user = null;
        state.initializing = false;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.user = action.payload;
        state.initializing = false;
        state.error = null;
      })
      .addCase(login.rejected, (state, action) => {
        state.user = null;
        state.initializing = false;
        state.error = action.payload?.error || "Login failed";
      })
      .addCase(signup.fulfilled, () => {
        // signup doesn't log in user directly,
        // do nothing with state
      })
      .addCase(logout.fulfilled, (state) => {
        state.user = null;
      });
  },
});

export default authSlice.reducer;
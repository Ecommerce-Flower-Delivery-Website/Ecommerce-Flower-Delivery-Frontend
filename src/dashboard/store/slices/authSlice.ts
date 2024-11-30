import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import { z } from "zod";
import { validateSchemas } from "../../../lib/zod";
import { api } from "../../../lib/ajax/api";

type AuthState = {
  token: string | null;
  user: User | null;
  loading: boolean;
  error: string | null;
};

const initialState: AuthState = {
  token: localStorage.getItem("token"),
  user: JSON.parse(localStorage.getItem("user") || "null"),
  loading: false,
  error: null,
};

export type SignUpFormType = z.infer<typeof validateSchemas.signUp>;
export type LoginFormType = z.infer<typeof validateSchemas.login>;

export const signUpUser = createAsyncThunk(
  "auth/signUpUser",
  async (values: SignUpFormType, { rejectWithValue }) => {
    try {
      const result = await validateSchemas.signUp.safeParseAsync(values);
      if (!result.success) {
        throw new Error(result.error.errors[0].message);
      }
      const res = await api.post("/register", {
        ...result.data,
      });
      toast.success("Signed up successfully");
      return res.data.data;
    } catch (error) {
      handleApiError(error);
      return rejectWithValue(error instanceof Error ? error.message : "Error");
    }
  }
);
export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async (values: LoginFormType, { rejectWithValue }) => {
    try {
      const result = await validateSchemas.login.safeParseAsync(values);
      if (!result.success) {
        throw new Error(result.error.errors[0].message);
      }
      const res = await api.post("/login", result.data);
      toast.success("login successfully");
      return res.data;
    } catch (error) {
      handleApiError(error);
      return rejectWithValue(error instanceof Error ? error.message : "Error");
    }
  }
);
export const logOutUser = createAsyncThunk(
  "auth/logOutUser",
  async (_values, { rejectWithValue }) => {
    try {
      const res = await api.post("/logout");
      return res.data;
    } catch (error) {
      handleApiError(error);
      return rejectWithValue(error instanceof Error ? error.message : "Error");
    }
  }
);

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(signUpUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(signUpUser.fulfilled, (state, action) => {
        state.loading = false;
        state.token = action.payload.token;
        state.user = action.payload.user;
        localStorage.setItem("token", action.payload.token);
        localStorage.setItem("user", JSON.stringify(action.payload.user));
      })
      .addCase(signUpUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.token = action.payload.token;
        state.user = action.payload.user;
        localStorage.setItem("token", action.payload.token);
        localStorage.setItem("user", JSON.stringify(action.payload.user));
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
    builder
      .addCase(logOutUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(logOutUser.fulfilled, (state) => {
        state.loading = false;
        state.token = null;
        state.user = null;
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        window.location.reload();
      })
      .addCase(logOutUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const authSliceReducer = authSlice.reducer;

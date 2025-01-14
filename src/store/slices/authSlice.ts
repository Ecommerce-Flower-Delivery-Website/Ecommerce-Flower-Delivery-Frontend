import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import { z } from "zod";
import { validateSchemas } from "../../lib/zod";
import { api } from "../../lib/ajax/api";
import { handleApiError } from "../../lib/utils";

type AuthState = {
  token: string | null;
  user: User | null;
  isPending: boolean;
  isPendingResend?:boolean;
  error: string | null;
};

const initialState: AuthState = {
  token: null,
  user: null,
  isPending: false,
  isPendingResend:false,
  error: null,
};

export type CreateUserType = z.infer<typeof validateSchemas.createUser>;
export type LoginFormType = z.infer<typeof validateSchemas.login>;
export type ForgotPasswordType = z.infer<typeof validateSchemas.Forgot_Password>;
export type resendVerifyCodeType = z.infer<typeof validateSchemas.ResendVerifyCode>;
export type CompareVerificationType = z.infer<typeof validateSchemas.CompareVerification>;

export const signUpUser = createAsyncThunk(
  "auth/signUpUser",
  async (values: CreateUserType, { rejectWithValue }) => {
    console.log(values,"sdsadfafdsfs")
    try {
      const result = await validateSchemas.signup.safeParseAsync(values);
      if (!result.success) {
        throw new Error(result.error.errors[0].message);
      }
      const res = await api.post("/auth/register", {
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
      const res = await api.post("/auth/login", result.data);
      toast.success("login successfully");
      return res.data;
    } catch (error) {
      handleApiError(error);
      return rejectWithValue(error instanceof Error ? error.message : "Error");
    }
  }
);
export const loginAdmin = createAsyncThunk(
  "auth/loginAdmin",
  async (values: LoginFormType, { rejectWithValue }) => {
    try {
      console.log(values);
      const result = await validateSchemas.login.safeParseAsync(values);
      if (!result.success) {
        throw new Error(result.error.errors[0].message);
      }
      const res = await api.post("/auth/login_admin", result.data);
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

export const forgotPassword = createAsyncThunk(
  "auth/forgotPassword",
  async (values: ForgotPasswordType, { rejectWithValue }) => {
    try {
      const result = await validateSchemas.Forgot_Password.safeParseAsync(values);
      if (!result.success) {
        throw new Error(result.error.errors[0].message);
      }
      const res = await api.post("/auth/forgot_password", result.data);
      toast.success("your password was sent to your email successfully");
      return res.data;
    } catch (error) {
      handleApiError(error);
      return rejectWithValue(error instanceof Error ? error.message : "Error");
    }
  }
);

export const compareVeificationCode = createAsyncThunk(
  "auth/compareVeificationCode",
  async (values:CompareVerificationType  , { rejectWithValue }) => {
    try {
      const result = await validateSchemas.CompareVerification.safeParseAsync(values);
      if (!result.success) {
        throw new Error(result.error.errors[0].message);
      }
      const res = await api.post("/auth/verify_compare", result.data);
      toast.success("your email is confirmed successfully");
      return res.data;
    } catch (error) {
      handleApiError(error);
      return rejectWithValue(error instanceof Error ? error.message : "Error");
    }
  }
);

export const resendVerifyCode = createAsyncThunk(
  "auth/resendVerifyCode",
  async (values: resendVerifyCodeType, { rejectWithValue }) => {
    try {
      const result = await validateSchemas.ResendVerifyCode.safeParseAsync(values);
      if (!result.success) {
        throw new Error(result.error.errors[0].message);
        
      }
      const res = await api.post("/auth/resend_verify_code", result.data);
      toast.success("your password was sent to your email successfully");
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
        state.isPending = true;
        state.error = null;
      })
      .addCase(signUpUser.fulfilled, (state, action) => {
        state.isPending = false;
        // state.token = action.payload.token;
        state.user = action.payload.user;
        // localStorage.setItem("token", action.payload.token);
        localStorage.setItem("user", JSON.stringify(action.payload.user));
      })
      .addCase(signUpUser.rejected, (state, action) => {
        state.isPending = false;
        state.error = action.payload as string;
      });
    builder
      .addCase(loginUser.pending, (state) => {
        state.isPending = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.isPending = false;
        state.token = action.payload.token;
        state.user = action.payload.user;
        localStorage.setItem("token", action.payload.token);
        localStorage.setItem("user", JSON.stringify(action.payload.user));
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.isPending = false;
        state.error = action.payload as string;
      });
    builder
      .addCase(loginAdmin.pending, (state) => {
        state.isPending = true;
        state.error = null;
      })
      .addCase(loginAdmin.fulfilled, (state, action) => {
        state.isPending = false;
        state.token = action.payload.data.token;
        state.user = action.payload.data.user;
        localStorage.setItem("token", action.payload.data.token);
        localStorage.setItem("user", JSON.stringify(action.payload.data.user));
      })
      .addCase(loginAdmin.rejected, (state, action) => {
        state.isPending = false;
        state.error = action.payload as string;
      });
      builder
      .addCase(forgotPassword.pending, (state) => {
        state.isPending = true;
        state.error = null;
      })
      .addCase(forgotPassword.fulfilled, (state) => {
        state.isPending = false;
      })
      .addCase(forgotPassword.rejected, (state, action) => {
        state.isPending = false;
        state.error = action.payload as string;
      });
      builder
      .addCase(compareVeificationCode.pending, (state) => {
        state.isPending = true;
        state.error = null;
      })
      .addCase(compareVeificationCode.fulfilled, (state,action) => {
        state.isPending = false;
        state.token = action.payload.token;
        state.user = action.payload.user;
        localStorage.setItem("token", action.payload.token);
        localStorage.setItem("user", JSON.stringify(action.payload.user));
        
      })
      .addCase(compareVeificationCode.rejected, (state, action) => {
        state.isPending = false;
        state.error = action.payload as string;
      });
      builder
      .addCase(resendVerifyCode.pending, (state) => {
        state.isPendingResend = true;
        state.error = null;
      })
      .addCase(resendVerifyCode.fulfilled, (state) => {
        state.isPendingResend = false;
      })
      .addCase(resendVerifyCode.rejected, (state, action) => {
        state.isPendingResend = false;
        state.error = action.payload as string;
      });
    builder
      .addCase(logOutUser.pending, (state) => {
        state.isPending = true;
        state.error = null;
      })
      .addCase(logOutUser.fulfilled, (state) => {
        state.isPending = false;
        state.token = null;
        state.user = null;
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        window.location.reload();
      })
      .addCase(logOutUser.rejected, (state, action) => {
        state.isPending = false;
        state.error = action.payload as string;
      });
  },
});

export const authSliceReducer = authSlice.reducer;

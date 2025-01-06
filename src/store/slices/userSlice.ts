import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { AxiosError } from "axios";
import { toast } from "react-toastify";
import { z } from "zod";
import { api } from "../../lib/ajax/api";
import { validateSchemas } from "../../lib/zod";

// Define types
type TUserAdd = z.infer<typeof validateSchemas.createUser>;
type TUserUpdate = Partial<z.infer<typeof validateSchemas.editUser>>;

type TInitialState = {
  users: TUsersFromBackend;
  loading: boolean;
  error: string | null;
  pagination: {
    totalOrders: number;
    totalPages: number;
    currentPage: number;
    pageSize: number;
  };
};

const initialState: TInitialState = {
  users: [],
  loading: false,
  error: null,
  pagination: {
    totalOrders: 0,
    totalPages: 0,
    currentPage: 1,
    pageSize: 1,
  },
};

// Utility function for handling API errors
const handleError = (error: unknown, defaultMessage: string): string => {
  if (error instanceof AxiosError && error.response?.data?.message) {
    return error.response.data.message;
  }
  return defaultMessage;
};

// Async thunks
const getUsers = createAsyncThunk(
  "user/getUsers",
  async (values: { page: number; limit: number }, { rejectWithValue }) => {
    try {
      const response = await api.get(`/users`, {
        params: values,
      });
      return response.data;
    } catch (error) {
      const message = handleError(error, "Failed to fetch users");
      toast.error(message);
      return rejectWithValue(message);
    }
  }
);

const deleteUser = createAsyncThunk<string, string>(
  "user/deleteUser",
  async (userId, { rejectWithValue }) => {
    try {
      await api.delete(`/users/${userId}`);
      toast.success("User deleted successfully");
      return userId;
    } catch (error) {
      const message = handleError(error, "Failed to delete user");
      toast.error(message);
      return rejectWithValue(message);
    }
  }
);

const addUser = createAsyncThunk<TUserFromBackend, TUserAdd>(
  "user/addUser",
  async (userData, { rejectWithValue }) => {
    try {
      const response = await api.post(`/auth/register`, userData);
      toast.success("User added successfully");
      return response.data.data.user;
    } catch (error) {
      const message = handleError(error, "Failed to add user");
      toast.error(message);
      return rejectWithValue(message);
    }
  }
);

const updateUser = createAsyncThunk<
  TUserFromBackend,
  { userId: string; userData: TUserUpdate }
>("user/updateUser", async ({ userId, userData }, { rejectWithValue }) => {
  try {
    const response = await api.patch(`/users/${userId}`, userData);
    toast.success("User updated successfully");
    return response.data.data;
  } catch (error) {
    const message = handleError(error, "Failed to update user");
    toast.error(message);
    return rejectWithValue(message);
  }
});

// Slice
const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Handle getUsers
      .addCase(getUsers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.users = action.payload.data.users;
        state.pagination = action.payload.data.pagination;
      })
      .addCase(getUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      // Handle deleteUser
      .addCase(deleteUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteUser.fulfilled, (state, action) => {
        state.loading = false;
        state.users = state.users.filter((user) => user._id !== action.payload);
      })
      .addCase(deleteUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      // Handle addUser
      .addCase(addUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addUser.fulfilled, (state, action) => {
        state.loading = false;
        state.users.push(action.payload);
      })
      .addCase(addUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      // Handle updateUser
      .addCase(updateUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.users.findIndex(
          (user) => user._id === action.payload._id
        );
        if (index !== -1) {
          state.users[index] = action.payload;
        }
      })
      .addCase(updateUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

// Exports
export { addUser, deleteUser, getUsers, updateUser };
export type { TUserFromBackend, TUsersFromBackend };
export default userSlice.reducer;

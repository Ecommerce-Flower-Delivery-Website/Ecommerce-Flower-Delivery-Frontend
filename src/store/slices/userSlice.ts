import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { AxiosError } from "axios";
import { toast } from "react-toastify";
import { z } from "zod";
import { api } from "../../lib/ajax/api";
import { validateSchemas } from "../../lib/zod";
import { handleApiError } from "../../lib/utils";

export type TUserFromBackend = {
  _id: string;
  name: string;
  email: string;
  phone: string;
  isAdmin: boolean;
  createdAt: string; 
  updatedAt: string; 
  __v: number; 
  isReminder: boolean;
  subscribe_id: string;
}

// Define types
type TUserUpdate = Partial<z.infer<typeof validateSchemas.editUser>>;

type TInitialState = {
  users: TUserFromBackend[];
  loading: boolean;
  error: string | null;
  pagination: {
    totalUsers: number;
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
    totalUsers: 0,
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
      handleApiError(error); 
      const message = handleError(error, "Failed to fetch users");
      return rejectWithValue(message);
    }
  }
);

const deleteUser = createAsyncThunk(
  "user/deleteUser",
  async (userId : string, { rejectWithValue }) => {
    try {
      await api.delete(`/users/${userId}`);
      return userId;
    } catch (error) {
      handleApiError(error); 
      const message = handleError(error, "Failed to delete user");
      return rejectWithValue(message);
    }
  }
);

const addUser = createAsyncThunk(
  "user/addUser",
  async (userData, { rejectWithValue }) => {
    try {
      const response = await api.post(`/auth/register`, userData);
      return response.data.data.user;
    } catch (error) {
      handleApiError(error); 
      const message = handleError(error, "Failed to add user");
      return rejectWithValue(message);
    }
  }
);

const updateUser = createAsyncThunk(
  "user/updateUser",
  async (
    values: { userId: string; userData: TUserUpdate },
    { rejectWithValue }
  ) => {
    try {
      const response = await api.patch(
        `/users/${values.userId}`,
        values.userData
      );
      return response.data.data.user;
    } catch (error) {
      handleApiError(error); 
      const message = handleError(error, "Failed to update user");
      return rejectWithValue(message);
    }
  }
);

// Slice
const userSlice = createSlice({
  name: "users",
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

         // Update the pagination state
         const totalUsers = state.pagination.totalUsers - 1; // Decrement total users
         const totalPages = Math.max(1, Math.ceil(totalUsers / state.pagination.pageSize)); // Recalculate total pages
 
         // Adjust current page if necessary
         if (state.pagination.currentPage > totalPages) {
           state.pagination.currentPage = totalPages; // If current page is greater than the new total pages, set it to the last page
         }
 
         // Update pagination state
         state.pagination = {
           ...state.pagination,
           totalUsers,
           totalPages,
         };

         toast.success("User deleted successfully");
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
        
        toast.success("User added successfully");
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

        toast.success("User updated successfully");
      })
      .addCase(updateUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

// Exports
export { addUser, deleteUser, getUsers, updateUser };
export default userSlice.reducer;
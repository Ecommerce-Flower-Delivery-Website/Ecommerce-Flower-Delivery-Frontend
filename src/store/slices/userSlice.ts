import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios, { AxiosError } from "axios";
import { toast } from "react-toastify";
import { z } from "zod";
import { validateSchemas } from "../../lib/zod";

const BASE_URL = import.meta.env.VITE_PUBLIC_API_BASE_URL;

type TUserAdd = z.infer<typeof validateSchemas.createUser>;

type TUserUpdate = Partial<typeof validateSchemas.editUser>;

type TInitialState = {
  users: TUsersFromBackend;
  loading: boolean;
  error: string | null;
};

const initialState: TInitialState = {
  users: [],
  loading: false,
  error: null,
};

const getUsers = createAsyncThunk<TUsersFromBackend, void>(
  "user/getUsers",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${BASE_URL}/api/v1/users`);

      return response.data.data.users;
    } catch (error) {
      console.log(error);

      let message = "Failed to fetch users";

      if (error instanceof AxiosError && error.response?.data?.message)
        message = error.response?.data?.message;

      toast.error(message);

      return rejectWithValue(message);
    }
  }
);

const deleteUser = createAsyncThunk<string, string>(
  "user/deleteUser",
  async (userId, { rejectWithValue }) => {
    try {
      await axios.delete(`${BASE_URL}/api/v1/users/${userId}`);

      toast.success("User deleted successfully");

      return userId; // Return the userId for further processing
    } catch (error) {
      console.log(error);

      let message = "Failed to delete user";

      if (error instanceof AxiosError && error.response?.data?.message)
        message = error.response?.data?.message;

      toast.error(message);

      return rejectWithValue(message);
    }
  }
);

const addUser = createAsyncThunk<TUserFromBackend, TUserAdd>(
  "user/addUser",
  async (userData, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${BASE_URL}/api/v1/auth/register`,
        userData
      );

      toast.success("User added successfully");

      return response.data.data.user;
    } catch (error) {
      console.log(error);

      let message = "Failed to delete user";

      if (error instanceof AxiosError && error.response?.data?.message)
        message = error.response?.data?.message;

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
    const response = await axios.patch(
      `${BASE_URL}/api/v1/users/${userId}`,
      userData
    );

    toast.success("User updated successfully");

    return response.data.data.user;
  } catch (error) {
    console.log(error);

    let message = "Failed to delete user";

    if (error instanceof AxiosError && error.response?.data?.message)
      message = error.response?.data?.message;

    toast.error(message);

    return rejectWithValue(message);
  }
});

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // Handle getUsers
    builder
      .addCase(getUsers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.users = action.payload;
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
      .addCase(
        addUser.fulfilled,
        (state, action: PayloadAction<TUserFromBackend>) => {
          state.loading = false;
          state.users.push(action.payload); // Add the new user to the users array
        }
      )
      .addCase(addUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      // Handle updateUser
      .addCase(updateUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        updateUser.fulfilled,
        (state, action: PayloadAction<TUserFromBackend>) => {
          state.loading = false;
          const index = state.users.findIndex(
            (user) => user._id === action.payload._id
          );
          if (index !== -1) {
            state.users[index] = action.payload;
          }
        }
      )
      .addCase(updateUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export { getUsers, deleteUser, addUser, updateUser };
export type { TUserFromBackend };
export default userSlice.reducer;

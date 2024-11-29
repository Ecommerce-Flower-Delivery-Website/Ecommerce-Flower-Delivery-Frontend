import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type User = {
  _id: string;
  name: string;
  email: string;
  subscriptions: string[];
  verified: boolean;
  createdAt: Date | string;
};

type UserState = {
  users: User[];
};

const initialState: UserState = {
  users: [],
};

const userSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    createUser: (state, action: PayloadAction<User>) => {
      state.users.push(action.payload);
    },
    updateUser: (
      state,
      action: PayloadAction<{ _id: string; data: Partial<User> }>
    ) => {
      const index = state.users.findIndex(
        (user) => user._id === action.payload._id
      );
      if (index !== -1) {
        state.users[index] = { ...state.users[index], ...action.payload.data };
      }
    },
    removeUser: (state, action: PayloadAction<string>) => {
      state.users = state.users.filter((user) => user._id !== action.payload);
    },
  },
});

export const { createUser, updateUser, removeUser } = userSlice.actions;
export default userSlice.reducer;

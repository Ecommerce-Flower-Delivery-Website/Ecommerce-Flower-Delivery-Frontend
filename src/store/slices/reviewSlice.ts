import axios, { AxiosError } from "axios";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { handleApiError } from "../../lib/utils";

const API_BASE_URL = import.meta.env.VITE_PUBLIC_API_BASE_URL;
const API_VERSION = import.meta.env.VITE_PUBLIC_API_VERSION;
const API_URL = `${API_BASE_URL}/api/${API_VERSION}`;

export type TReviewFromBackEnd = {
  _id: "string";
  name: "string";
  text: "string";
  shouldShow: "string";
  createdAt: "string";
  updatedAt: "string";
  __v: "number";
};

type TInitialState = {
  reviews: TReviewFromBackEnd[];
  loading: boolean;
  error: string | null;
  pagination: {
    totalReviews: number;
    totalPages: number;
    currentPage: number;
    pageSize: number;
  };
};

const initialState: TInitialState = {
  reviews: [],
  loading: false,
  error: null,
  pagination: {
    totalReviews: 0,
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

export const getReviews = createAsyncThunk(
  "review/getReviews",
  async (
    paginationInfo: { page: number; limit: number },
    { rejectWithValue }
  ) => {
    try {
      const { page, limit } = paginationInfo;
      const response = await axios.get(`${API_URL}/review`, {
        params: {
          page: page,
          limit: limit,
        },
      });

      return response.data.data;
    } catch (error) {
      handleApiError(error);
      const generalMessage = "failed to get review";
      return rejectWithValue(handleError(error, generalMessage));
    }
  }
);

export const addReview = createAsyncThunk(
  "review/addReview",
  async (
    values: { name: string; text: string; shouldShow: boolean },
    { rejectWithValue }
  ) => {
    try {
      const response = await axios.post(`${API_URL}/review`, values);

      return response.data.data;
    } catch (error) {
      handleApiError(error);
      const generalMessage = "failed to add review";
      return rejectWithValue(handleError(error, generalMessage));
    }
  }
);

export const editReview = createAsyncThunk(
  "review/editReview", // Corrected action type
  async (
    {
      id,
      reviewInfo,
    }: {
      id: string;
      reviewInfo: { name: string; text: string; shouldShow: boolean };
    },
    { rejectWithValue }
  ) => {
    try {
      const response = await axios.put(`${API_URL}/review/${id}`, reviewInfo);
      console.log(response.data.data);
      
      return response.data.data;
    } catch (error) {
      handleApiError(error);
      const generalMessage = "failed to edit review";
      return rejectWithValue(handleError(error, generalMessage));
    }
  }
);

export const deleteReview = createAsyncThunk(
  "review/deleteReview",
  async (id: string, { rejectWithValue }) => {
    try {
      await axios.delete(`${API_URL}/review/${id}`);
      return id;
    } catch (error) {
      handleApiError(error);
      const generalMessage = "failed to delete review";
      return rejectWithValue(handleError(error, generalMessage));
    }
  }
);

// Slice
const reviewSlice = createSlice({
  name: "review",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Handle getReviews
      .addCase(getReviews.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getReviews.fulfilled, (state, action) => {
        state.loading = false;
        state.reviews = action.payload.reviews;
        state.pagination = action.payload.pagination;
      })
      .addCase(getReviews.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      // Handle deleteReview
      .addCase(deleteReview.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteReview.fulfilled, (state, action) => {
        state.loading = false;
        state.reviews = state.reviews.filter(
          (review) => review._id !== action.payload
        );
      })
      .addCase(deleteReview.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      // Handle addReview
      .addCase(addReview.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addReview.fulfilled, (state, action) => {
        state.loading = false;
        state.reviews.push(action.payload);
      })
      .addCase(addReview.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      // Handle editReview (with corrected action type)
      .addCase(editReview.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(editReview.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.reviews.findIndex(
          (review) => review._id === action.payload._id
        );
        if (index !== -1) {
          state.reviews[index] = action.payload;
        }
      })
      .addCase(editReview.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

const reviewReducer = reviewSlice.reducer;
export default reviewReducer;

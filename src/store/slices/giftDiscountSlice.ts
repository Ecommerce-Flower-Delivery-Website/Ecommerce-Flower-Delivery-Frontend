
  import axios from "axios";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { handleApiError } from "../../lib/utils";
import { toast } from "react-toastify";
import { parseErrorMessage } from "../../utils/helper";

const API_BASE_URL = import.meta.env.VITE_PUBLIC_API_BASE_URL;
const API_VERSION = import.meta.env.VITE_PUBLIC_API_VERSION;
const API_URL = `${API_BASE_URL}/api/${API_VERSION}`;

export type TGiftDiscount = {
  _id: string;
  codeGift: string;
  discountGift: number;
  createdAt: string;
  updatedAt: string;
  __v: number;
};

type TInitialState = {
  giftDiscounts: TGiftDiscount[];
  loading: boolean;
  error: string | null;
  pagination: {
    totalGiftDiscounts: number;
    totalPages: number;
    currentPage: number;
    pageSize: number;
  };
};

const initialState: TInitialState = {
  giftDiscounts: [],
  loading: false,
  error: null,
  pagination: {
    totalGiftDiscounts: 0,
    totalPages: 0,
    currentPage: 1,
    pageSize: 10,
  },
};

export const getGiftDiscounts = createAsyncThunk(
  "giftDiscount/getGiftDiscounts",
  async (
    paginationInfo: { page: number; limit: number },
    { rejectWithValue }
  ) => {
    try {
      const { page, limit } = paginationInfo;
      const response = await axios.get(`${API_URL}/giftDiscounts`, {
        params: {
          page,
          limit,
        },
      });
      
      return response.data.data;
    } catch (error) {
      handleApiError(error);
      const generalMessage = "Failed to fetch gift discounts";
      return rejectWithValue(parseErrorMessage(error, generalMessage));
    }
  }
);

export const addGiftDiscount = createAsyncThunk(
  "giftDiscount/addGiftDiscount",
  async (
    values: { codeGift: string; discountGift: number },
    { rejectWithValue }
  ) => {
    try {
      
      const response = await axios.post(`${API_URL}/giftDiscounts`, values);
      return response.data.data.giftDiscount;
    } catch (error) {
      handleApiError(error);
      const generalMessage = "Failed to add gift discount";
      return rejectWithValue(parseErrorMessage(error, generalMessage));
    }
  }
);

export const updateGiftDiscount = createAsyncThunk(
  "giftDiscount/updateGiftDiscount",
  async (
    {
      id,
      values,
    }: {
      id: string;
      values: { codeGift: string; discountGift: number };
    },
    { rejectWithValue }
  ) => {
    try {
      const response = await axios.put(`${API_URL}/giftDiscounts/${id}`, values);
      return response.data.data.giftDiscount;
    } catch (error) {
      handleApiError(error);
      const generalMessage = "Failed to update gift discount";
      return rejectWithValue(parseErrorMessage(error, generalMessage));
    }
  }
);

export const deleteGiftDiscount = createAsyncThunk(
  "giftDiscount/deleteGiftDiscount",
  async (id: string, { rejectWithValue }) => {
    try {
      await axios.delete(`${API_URL}/giftDiscounts/${id}`);
      return id;
    } catch (error) {
      handleApiError(error);
      const generalMessage = "Failed to delete gift discount";
      return rejectWithValue(parseErrorMessage(error, generalMessage));
    }
  }
);

const giftDiscountSlice = createSlice({
  name: "giftDiscount",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getGiftDiscounts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getGiftDiscounts.fulfilled, (state, action) => {
        state.loading = false;
        state.giftDiscounts = action.payload.giftDiscounts;        
        state.pagination = action.payload.pagination;
      })
      .addCase(getGiftDiscounts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(addGiftDiscount.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addGiftDiscount.fulfilled, (state, action) => {
        state.loading = false;        
        state.giftDiscounts.push(action.payload);
        toast.success("Gift discount added successfully");
      })
      .addCase(addGiftDiscount.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(updateGiftDiscount.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateGiftDiscount.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.giftDiscounts.findIndex(
          (discount) => discount._id === action.payload._id
        );
        if (index !== -1) {
          state.giftDiscounts[index] = action.payload;
        }
        toast.success("Gift discount updated successfully");
      })
      .addCase(updateGiftDiscount.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(deleteGiftDiscount.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteGiftDiscount.fulfilled, (state, action) => {
        state.loading = false;
        state.giftDiscounts = state.giftDiscounts.filter(
          (discount) => discount._id !== action.payload
        );
        toast.success("Gift discount deleted successfully");
      })
      .addCase(deleteGiftDiscount.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

const giftDiscountReducer = giftDiscountSlice.reducer;
export default giftDiscountReducer;


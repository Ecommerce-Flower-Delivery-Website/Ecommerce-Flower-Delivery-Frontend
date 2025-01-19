import  { AxiosError } from "axios";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { handleApiError } from "../../lib/utils";
import { toast } from "react-toastify";
import { api } from "../../lib/ajax/api";
const API_VERSION = import.meta.env.VITE_PUBLIC_API_VERSION;
const API_URL = `${import.meta.env.API_BASE_URL}/api/${API_VERSION}`;

interface Product {
  priceAfterDiscount: string;
  discount?: string;
  quantity: string;
  id: string;
  title: string;
  price: number;
  stock: number;
  description: string;
  image?: string;
  category_id: number;
  accessory_id: number;
  created_at: string;
  updated_at: string;
}

export type TCategoryFromBackEnd = {
  _id: string;
  title: string;
  image: string;
  description: string;
  createdAt: string;
  updatedAt: string;
  products: Product[];
  __v: number;
};

export type TCatergoryAdd = Omit<
  TCategoryFromBackEnd,
  "_id" | "createdAt" | "updatedAt" | "__v" | "image"
> & { image: File };

export type TCatergoryUpdate = Partial<TCatergoryAdd>;

type TInitialState = {
  categories: TCategoryFromBackEnd[];
  category: TCategoryFromBackEnd;
  loading: boolean;
  error: string | null;
  pagination: {
    totalCategories: number;
    totalPages: number;
    currentPage: number;
    pageSize: number;
  };
};

const initialState: TInitialState = {
  categories: [],
  category: {
    _id: "",
    title: "",
    image: "",
    description: "",
    createdAt: "",
    updatedAt: "",
    products: [],
    __v: 0,
  },
  loading: false,
  error: null,
  pagination: {
    totalCategories: 0,
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

export const getCategories = createAsyncThunk(
  "category/getCategories",
  async (
    paginationInfo: { page?: number; limit?: number },
    { rejectWithValue }
  ) => {
    try {
      const { page, limit } = paginationInfo;
      const response = await api.get(`/category`, {
        params: {
          page: page,
          limit: limit,
        },
      });

      return response.data.data;
    } catch (error) {
      handleApiError(error);
      const generalMessage = "failed to get categories";
      return rejectWithValue(handleError(error, generalMessage));
    }
  }
);
export const addCategory = createAsyncThunk(
  "category/addCategory",
  async (values: TCatergoryAdd, { rejectWithValue }) => {
    try {
      const response = await api.post(`/category`, values);

      return response.data.data.category;
    } catch (error) {
      handleApiError(error);
      const generalMessage = "failed to add category";
      return rejectWithValue(handleError(error, generalMessage));
    }
  }
);

export const editCategory = createAsyncThunk(
  "category/editCategory",
  async (
    { id, categoryInfo }: { id: string; categoryInfo: TCatergoryUpdate },
    { rejectWithValue }
  ) => {
    try {
      const response = await api.put(`/category/${id}`, categoryInfo);
      return response.data.data.updatedCategory;
    } catch (error) {
      handleApiError(error);
      const generalMessage = "failed to edit category";
      return rejectWithValue(handleError(error, generalMessage));
    }
  }
);

export const deleteCategory = createAsyncThunk(
  "category/deleteCategory",
  async (id: string, { rejectWithValue }) => {
    try {
      await api.delete(`/category/${id}`);
      return id;
    } catch (error) {
      handleApiError(error);
      const generalMessage = "failed to delete category";
      return rejectWithValue(handleError(error, generalMessage));
    }
  }
);
export const getCategory = createAsyncThunk(
  "category/getCategory",
  async (id: string, { rejectWithValue }) => {
    try {
      const response = await api.get(`/category/${id}`);
      if (response.status === 201 || response.status === 200) {
        console.log(response.data.data);
        return response.data.data;
      }
    } catch (error) {
      handleApiError(error);
      return rejectWithValue(error instanceof Error ? error.message : "Error");
    }
  }
);

const categorySlice = createSlice({
  name: "category",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Handle getCategories
      .addCase(getCategories.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getCategories.fulfilled, (state, action) => {
        state.loading = false;
        state.categories = action.payload.categories;
        state.pagination = action.payload.pagination;
      })
      .addCase(getCategories.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      // handle get category
      .addCase(getCategory.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getCategory.fulfilled, (state, action) => {
        state.loading = false;
        state.category = action.payload.category;
      })
      .addCase(getCategory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      // Handle addCategory
      .addCase(addCategory.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addCategory.fulfilled, (state, action) => {
        state.loading = false;
        state.categories.push(action.payload);

        toast.success("Category added successfully");
      })
      .addCase(addCategory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      // Handle deleteCategory
      .addCase(deleteCategory.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteCategory.fulfilled, (state, action) => {
        state.loading = false;
        state.categories = state.categories.filter(
          (category) => category._id !== action.payload
        );

        // Update the pagination state
        const totalCategories = state.pagination.totalCategories - 1; // Decrement total categories
        const totalPages = Math.max(
          1,
          Math.ceil(totalCategories / state.pagination.pageSize)
        ); // Recalculate total pages

        // Adjust current page if necessary
        if (state.pagination.currentPage > totalPages) {
          state.pagination.currentPage = totalPages; // If current page exceeds new total pages, set it to the last page
        }

        // Update pagination state
        state.pagination = {
          ...state.pagination,
          totalCategories,
          totalPages,
        };

        toast.success("Category deleted successfully");
      })
      .addCase(deleteCategory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      // Handle editCategory
      .addCase(editCategory.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(editCategory.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.categories.findIndex(
          (category) => category._id === action.payload._id
        );
        if (index !== -1) {
          state.categories[index] = action.payload;
        }

        toast.success("Category updated successfully");
      })
      .addCase(editCategory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

const categoryReducer = categorySlice.reducer;
export default categoryReducer;

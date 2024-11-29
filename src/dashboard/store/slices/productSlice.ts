import { api } from "@/lib/ajax/api";
import { handleApiError } from "@/lib/helpers";
import { validateSchemas } from "@/lib/zod";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

export type ProductType = {
  name: string;
  price: string;
  image_url: string;
  created_at: string;
  updated_at: string;
};
export type ProductUpdateType = {
  name: string;
  price: string;
  image: string | null;
  created_at: string;
  updated_at: string;
};

type ProductStateType = {
  loading: boolean;
  error: string | null;
  products: (ProductType & { id: string })[];
  product?: ProductType & { id: string };
  events: {
    delete: {
      loading: boolean;
      error: string | null;
    };
    update: {
      loading: boolean;
      error: string | null;
    };
    create: {
      loading: boolean;
      error: string | null;
    };
  };
};
const initialState: ProductStateType = {
  products: [],
  loading: false,
  error: null,
  events: {
    delete: {
      error: null,
      loading: false,
    },
    update: {
      error: null,
      loading: false,
    },
    create: {
      error: null,
      loading: false,
    },
  },
};

export const createProductThunk = createAsyncThunk(
  "product/createProductThunk",
  async (values: ProductType, { rejectWithValue }) => {
    try {
      const result = await validateSchemas.createProduct.safeParseAsync(values);
      if (!result.success) {
        throw new Error(result.error.errors[0].message);
      }
      const res = await api.post("/items", result.data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      return res.data;
    } catch (error) {
      handleApiError(error);
      return rejectWithValue(error instanceof Error ? error.message : "Error");
    }
  }
);
export const updateProductThunk = createAsyncThunk(
  "product/updateProductThunk",
  async (values: ProductUpdateType & { id: string }, { rejectWithValue }) => {
    try {
      const result = await validateSchemas.editProduct.safeParseAsync(values);
      if (!result.success) {
        throw new Error(result.error.errors[0].message);
      }
      const res = await api.post(
        `/items/${values.id}`,
        { _method: "PUT", ...result.data },
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      return res.data;
    } catch (error) {
      handleApiError(error);
      return rejectWithValue(error instanceof Error ? error.message : "Error");
    }
  }
);
export const deleteProductThunk = createAsyncThunk(
  "product/deleteProductThunk",
  async (values: { id: string }, { rejectWithValue }) => {
    try {
      const res = await api.delete(`/items/${values.id}`);
      return res.data;
    } catch (error) {
      handleApiError(error);
      return rejectWithValue(error instanceof Error ? error.message : "Error");
    }
  }
);
export const getAllProductThunk = createAsyncThunk(
  "product/getAllProductThunk",
  async (_values, { rejectWithValue }) => {
    try {
      const res = await api.get("/items");
      return res.data;
    } catch (error) {
      handleApiError(error);
      return rejectWithValue(error instanceof Error ? error.message : "Error");
    }
  }
);
export const getProductThunk = createAsyncThunk(
  "product/getProductThunk",
  async (values: { id: string }, { rejectWithValue }) => {
    try {
      const res = await api.get(`/items/${values.id}}`);
      return res.data;
    } catch (error) {
      handleApiError(error);
      return rejectWithValue(error instanceof Error ? error.message : "Error");
    }
  }
);
export const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createProductThunk.pending, (state) => {
        state.events.create.loading = true;
        state.events.create.error = null;
      })
      .addCase(createProductThunk.fulfilled, (state, action) => {
        state.events.create.loading = false;
        toast.success(action.payload.message || "Product created successfully");
      })
      .addCase(createProductThunk.rejected, (state, action) => {
        state.events.create.loading = false;
        state.events.create.error = action.payload as string;
      });
    builder
      .addCase(deleteProductThunk.pending, (state) => {
        state.events.delete.loading = true;
        state.events.delete.error = null;
      })
      .addCase(deleteProductThunk.fulfilled, (state, action) => {
        state.events.delete.loading = false;
        const index = state.products.findIndex(
          (product) => product.id === action.meta.arg.id
        );
        if (index === -1) {
          toast.error("Product not found");
        } else {
          state.products.splice(index, 1);
          toast.success(action.payload.message);
        }
      })
      .addCase(deleteProductThunk.rejected, (state, action) => {
        state.events.delete.loading = false;
        state.events.delete.error = action.payload as string;
      });
    builder
      .addCase(updateProductThunk.pending, (state) => {
        state.events.update.loading = true;
        state.events.update.error = null;
      })
      .addCase(updateProductThunk.fulfilled, (state, action) => {
        state.events.update.loading = false;
        const index = state.products.findIndex(
          (product) => product.id === action.meta.arg.id
        );
        if (index === -1) {
          toast.error("Product not found");
        } else {
          const oldProduct = state.products[index];
          state.products[index] = {
            ...oldProduct,
            name: action.meta.arg.name,
            price: action.meta.arg.price,
            created_at: action.meta.arg.created_at,
            updated_at: new Date().toDateString(),
            image_url: URL.createObjectURL(
              action.meta.arg.image as unknown as File
            )
              ? URL.createObjectURL(action.meta.arg.image as unknown as File)
              : oldProduct.image_url,
          };
          toast.success(action.payload.message);
        }
      })
      .addCase(updateProductThunk.rejected, (state, action) => {
        state.events.update.loading = false;
        state.events.update.error = action.payload as string;
      });
    builder
      .addCase(getAllProductThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAllProductThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload;
      })
      .addCase(getAllProductThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
    builder
      .addCase(getProductThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getProductThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.product = action.payload;
      })
      .addCase(getProductThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const productReducer = productSlice.reducer;

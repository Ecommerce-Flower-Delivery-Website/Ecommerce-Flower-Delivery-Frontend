import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { api } from "../../lib/ajax/api";
import { handleApiError } from "../../lib/utils";
import { toast } from "react-toastify";

interface Product {
    id: string;
    title: string;
    price: number;
    stock : number;
    description : string;
    image? : string;
    category_id? : number;
    accessory_id : number;
    created_at: string;
    updated_at: string;
}


interface ProductState {
    products: Product[];
    product: {
        id: string;
        title: string;
        price: number;
        stock : number;
        description : string;
        image : string;
        category_id : number;
        accessory_id : number;
        created_at: string;
        updated_at: string;
    }
    loading: boolean;
    error: null | string;
}

const initialState : ProductState = {
    products: [],
    product : {
        id: "",
        title: "",
        price: 0,
        stock : 0,
        description : "",
        image : "",
        category_id : 0,
        accessory_id : 0,
        created_at: "",
        updated_at: ""
    },
    loading: false,
    error: null
};

export const getProducts = createAsyncThunk(
    'product/getProducts',
    async (_, { rejectWithValue }) => {
        try{
            const response = await api.get('/product');
            if (response.status === 201 || response.status === 200) {
                return response.data.data;
            }
        }catch(error){
            handleApiError(error);
            return rejectWithValue(error instanceof Error ? error.message : "Error");
        }
    }
);


export const addProducts = createAsyncThunk(
    'product/addProducts',
    async (data : FormData, { rejectWithValue }) => {
        try{
            const response = await api.post('/product',data);
            if (response.status === 201 || response.status === 200) {
                toast.success("Product added successfully");
                return response.data.data;
            }
        }catch(error){
            handleApiError(error);
            return rejectWithValue(error instanceof Error ? error.message : "Error");
        }
    }
);

export const getProduct = createAsyncThunk(
    'product/getProduct',
    async (id : string | undefined, { rejectWithValue }) => {
        try{
            const response = await api.get(`/product/${id}`);
            if (response.status === 201 || response.status === 200) {
                return response.data.data;
            }
        }catch(error){
            handleApiError(error);
            return rejectWithValue(error instanceof Error ? error.message : "Error");
        }
    }
);

export const deleteProduct = createAsyncThunk(
    'product/deleteProduct',
    async (id : string, { rejectWithValue }) => {
        try{
            const response = await api.delete(`/product/${id}`,);
            if (response.status === 201 || response.status === 200) {
                toast.success("Product deleted successfully");
                return response.data;
            }
        }catch(error){
            handleApiError(error);
            return rejectWithValue(error instanceof Error ? error.message : "Error");
        }
    }
);

interface updateParameters {
    data: FormData;
    id: string | undefined;
}

export const updateProduct = createAsyncThunk<
    void,
    updateParameters,
    { rejectValue: string }
>(
    'product/updateProduct',
    async ({data,id}, { rejectWithValue }) => {
        try{
            const response = await api.put(`/product/${id}`,data);
            if (response.status === 201 || response.status === 200) {
                toast.success("Product updated successfully");
                return response.data;
            }
        }catch(error){
            handleApiError(error);
            return rejectWithValue(error instanceof Error ? error.message : "Error");
        }
    }
);






const ProductSlice = createSlice({
    name: 'product',
    initialState,
    reducers : {},
    extraReducers: (builder) => {
        builder
        .addCase(getProducts.pending, (state) => {
            state.loading = true;
        })
        .addCase(getProducts.fulfilled, (state , action) => {
            state.loading = false;
            state.products = action.payload;
        })
        .addCase(getProducts.rejected, (state,action) => {
            state.error = action.payload as string;
        })
        builder
        .addCase(addProducts.pending, (state) => {
            state.loading = true;
        })
        .addCase(addProducts.fulfilled, (state , action) => {
            state.loading = false;
            state.products = action.payload;
        })
        .addCase(addProducts.rejected, (state,action) => {
            state.error = action.payload as string;
        })
        .addCase(getProduct.pending, (state) => {
            state.loading = true;
        })
        .addCase(getProduct.fulfilled, (state , action) => {
            state.loading = false;
            state.product = action.payload;
        })
        .addCase(getProduct.rejected, (state,action) => {
            state.error = action.payload as string;
        })
        .addCase(updateProduct.pending, (state) => {
            state.loading = true;
        })
        .addCase(updateProduct.fulfilled, (state) => {
            state.loading = false;
        })
        .addCase(updateProduct.rejected, (state,action) => {
            state.error = action.payload as string;
        })
    }
})

export default ProductSlice.reducer;
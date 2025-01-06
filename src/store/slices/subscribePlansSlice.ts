import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { api } from "../../lib/ajax/api";
import { handleApiError } from "../../lib/utils";
import { toast } from "react-toastify";
import { SubscribePlan } from "../../types/subscribePlansType";




interface SubscribePlanStates {
    subscribePlansData: SubscribePlan[];
    loading: boolean;
    error: null | string;
}

const initialState : SubscribePlanStates = {
    subscribePlansData: [],
    loading: false,
    error: null
};

export const getSubscribePlans = createAsyncThunk(
    'subscribe_plans/getSubscribePlans',
    async (_, { rejectWithValue }) => {
        try{
            const response = await api.get('/subscribe');
            if (response.status === 201 || response.status === 200) {
                return response.data.data;
            }
        }catch(error){
            handleApiError(error);
            return rejectWithValue(error instanceof Error ? error.message : "Error");
        }
    }
);


export const addSubscribePlan = createAsyncThunk(
    'subscribe_plans/addSubscribePlan',
    async (data : FormData, { rejectWithValue }) => {
        try{
            const response = await api.post('/subscribe',data);
            if (response.status === 201 || response.status === 200) {
                toast.success("Subscribe Plan added successfully");
                return response.data.data;
            }
        }catch(error){
            handleApiError(error);
            return rejectWithValue(error instanceof Error ? error.message : "Error");
        }
    }
);


export const deleteSubsciblePlan = createAsyncThunk(
    'subscribe_plans/deleteSubsciblePlan',
    async (id : string, { rejectWithValue }) => {
        try{
            const response = await api.delete(`/subscribe/${id}`,);
            if (response.status === 201 || response.status === 200) {
                toast.success("Subscribe Plan  deleted successfully");
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

export const updateSubscribePlan = createAsyncThunk<
    void,
    updateParameters,
    { rejectValue: string }>(
    'subscribe_plans/updateSubscribePlan',
    async ({data,id}, { rejectWithValue }) => {
        try{
            const response = await api.put(`/subscribe/${id}`,data);
            if (response.status === 201 || response.status === 200) {
                toast.success("Subscribe Plan updated successfully");
                return response.data;
            }
        }catch(error){
            handleApiError(error);
            return rejectWithValue(error instanceof Error ? error.message : "Error");
        }
    }
);






const SubscribePlanSlice = createSlice({
    name: 'subscribe_plans',
    initialState,
    reducers : {},
    extraReducers: (builder) => {
        builder
        .addCase(getSubscribePlans.pending, (state) => {
            state.loading = true;
        })
        .addCase(getSubscribePlans.fulfilled, (state , action) => {
            state.loading = false;
            state.subscribePlansData = action.payload;
        })
        .addCase(getSubscribePlans.rejected, (state,action) => {
            state.error = action.payload as string;
        })
        builder
        .addCase(addSubscribePlan.pending, (state) => {
            state.loading = true;
        })
        .addCase(addSubscribePlan.fulfilled, (state ) => {
            state.loading = false;
            // state.subscribePlansData = action.payload;
        })
        .addCase(addSubscribePlan.rejected, (state,action) => {
            state.error = action.payload as string;
        })
        .addCase(updateSubscribePlan.pending, (state) => {
            state.loading = true;
        })
        .addCase(updateSubscribePlan.fulfilled, (state) => {
            state.loading = false;
        })
        .addCase(updateSubscribePlan.rejected, (state,action) => {
            state.error = action.payload as string;
        })
    }
})

export default SubscribePlanSlice.reducer;
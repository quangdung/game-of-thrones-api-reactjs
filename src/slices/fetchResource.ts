import axios from 'axios';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import { API_DATA_URL } from '../constants';
import { Resource, ResourceState } from '../global/interfaces';

export const fetchResource = createAsyncThunk<Resource, void>('api/fetchResource',
    async () => {
        const response = await axios.get<Resource>(API_DATA_URL);
        return response.data;
    }
);

const initialState: ResourceState = {
    data: null,
    isLoading: false,
    error: null,
}

const fetchResourceSlice = createSlice({
    name: 'resource',
    initialState: initialState,
    reducers: {},
    extraReducers: builder => builder
        .addCase(fetchResource.fulfilled, (state, action) => {
            state.data = action.payload;
            state.isLoading = false;
            state.error = null;
        })
        .addCase(fetchResource.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.payload as string;
        })
});

export const resourceData = (state: { resource: ResourceState }) => state.resource.data;
export default fetchResourceSlice.reducer;
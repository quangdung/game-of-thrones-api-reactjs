import axios from 'axios';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import { API_DATA_URL } from '../constants';

export const fetchResource = createAsyncThunk('api/fetchResource', async () => {
    const response = await axios.get(API_DATA_URL);
    return response.data;
});

const initialState = {
    data: [],
    isLoading: false,
    error: null,
}

const fetchResourceSlice = createSlice({
    name: 'fetchResource',
    initialState: initialState,
    reducers: {},
    extraReducers: {
        // Fetch resources
        [fetchResource.fulfilled]: (state, action) => {
            state.isLoading = false;
            state.data = action.payload;
        },
        [fetchResource.rejected]: (state, action) => {
            state.isLoading = false;
            state.error = action.error.message;
        }
    },
});

export default fetchResourceSlice.reducer;
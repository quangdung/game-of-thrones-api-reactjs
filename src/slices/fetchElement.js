import axios from 'axios';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const fetchElement = createAsyncThunk('api/fetchElement', async (url) => {
    const response = await axios.get(url);
    return response.data;
});

const initialState = {
    data: [],
    isLoading: false,
    error: null,
}

const fetchElementSlice = createSlice({
    name: 'fetchElement',
    initialState: initialState,
    reducers: {},
    extraReducers: {
        // Fetch single element
        [fetchElement.pending]: (state) => {
            state.isLoading = true;
            state.data = null;
            state.error = null;
        },
        [fetchElement.fulfilled]: (state, action) => {
            state.isLoading = false;
            state.data = action.payload;
        },
        [fetchElement.rejected]: (state, action) => {
            state.isLoading = false;
            state.error = action.error.message;
        }
    },
});

export default fetchElementSlice.reducer;
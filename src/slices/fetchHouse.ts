import axios from 'axios';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import { House, RequestPayload } from '../global/interfaces';

export const fetchHouse = createAsyncThunk<House, RequestPayload, { rejectValue: string }
>('api/fetchHouse',
    async (payload, { rejectWithValue }) => {
        try {
            const response = await axios.get<House>(payload.url);
            return response.data;
        } catch (error) {
            return rejectWithValue('Failed to fetch data');
        }
    }
);

interface HouseState {
    data: House | null;
    isLoading: boolean;
    error: string | null;
};

const fetchHouseSlice = createSlice({
    name: 'house',
    initialState: { data: null, isLoading: false, error: null } as HouseState,
    reducers: {},
    extraReducers: builder => builder
        .addCase(fetchHouse.pending, (state) => {
            state.isLoading = true;
            state.data = null;
            state.error = null;
        })
        .addCase(fetchHouse.fulfilled, (state, action) => {
            state.isLoading = false;
            state.data = action.payload;
        })
        .addCase(fetchHouse.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.error.message as string;
        })
});

export const houseData = (state: { house: HouseState }) => state.house.data;
export default fetchHouseSlice.reducer;
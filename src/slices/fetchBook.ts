import axios from 'axios';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import { Book, RequestPayload } from '../global/interfaces';

export const fetchBook = createAsyncThunk<Book, RequestPayload, { rejectValue: string }
>('api/fetchBook',
    async (payload, { rejectWithValue }) => {
        try {
            const response = await axios.get<Book>(payload.url);
            return response.data;
        } catch (error) {
            return rejectWithValue('Failed to fetch data');
        }
    }
);

interface BookState {
    data: Book | null;
    isLoading: boolean;
    error: string | null;
};

const fetchBookSlice = createSlice({
    name: 'book',
    initialState: { data: null, isLoading: false, error: null } as BookState,
    reducers: {},
    extraReducers: builder => builder
        .addCase(fetchBook.pending, (state) => {
            state.isLoading = true;
            state.data = null;
            state.error = null;
        })
        .addCase(fetchBook.fulfilled, (state, action) => {
            state.isLoading = false;
            state.data = action.payload;
        })
        .addCase(fetchBook.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.error.message as string;
        })
});

export const bookData = (state: { book: BookState }) => state.book.data;
export default fetchBookSlice.reducer;
import axios from 'axios';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import {
    API_DATA_URL,
    PAGINATION_LINK,
    PAGINATION_PAGE_SIZE,
    PAGINATION_PAGE_TEXT,
    PAGINATION_PAGE_SIZE_TEXT
} from '../constants';

export const fetchElements = createAsyncThunk(
    'api/fetchElements',
    async (endpoint) => {
        const queryString = endpoint.includes(PAGINATION_PAGE_TEXT)
            ? `&${PAGINATION_PAGE_SIZE_TEXT}=${PAGINATION_PAGE_SIZE}` : '';

        const response = await axios.get(`${API_DATA_URL}/${endpoint}${queryString}`);

        // Set pagination
        const link = response.headers.get('Link').split(',');
        const pagination = {};

        for (let linkIndex of PAGINATION_LINK) {
            const index = link.findIndex(e => e.includes(linkIndex));
            pagination[linkIndex] = index > -1 ?
                link[index].split(';')[0].trim().replace(/(?:^<)|(?:>$)/g, '') : null;
        }

        const lastPage = pagination.last ? parseInt(pagination.last.split('page=')[1].split('&')[0]) : 1;
        const onLastPage = pagination.first && pagination.prev && pagination.last ? lastPage : 1;
        const actualPage = pagination.next ? parseInt(pagination.next.split('page=')[1].split('&')[0]) - 1 : onLastPage;

        pagination.lastPage = lastPage;
        pagination.actualPage = actualPage;

        return [response.data, pagination];
    }
);

const initialState = {
    data: null,
    pagination: { first: null, prev: null, next: null, last: null, lastPage: null, actualPage: null },
    isLoading: false,
    error: null,
}

const fetchElementsSlice = createSlice({
    name: 'fetchElements',
    initialState: initialState,
    reducers: {},
    extraReducers: {
        // Fetch list of books, characters, houses
        [fetchElements.fulfilled]: (state, action) => {
            state.isLoading = false;
            state.data = action.payload[0];
            state.pagination = action.payload[1];
        },
        [fetchElements.rejected]: (state, action) => {
            state.isLoading = false;
            state.error = action.error.message;
        }
    },
});

export default fetchElementsSlice.reducer;
import axios from 'axios';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import { ElementSimple, RequestEndpointPayload, PaginationInterface } from '../global/interfaces';
import { elementToElementSimple } from '../utils';

import {
    API_DATA_URL,
    PAGINATION_LINK,
    PAGINATION_PAGE_SIZE,
    PAGINATION_PAGE_TEXT,
    PAGINATION_PAGE_SIZE_TEXT
} from '../constants';


export const fetchElements = createAsyncThunk<
    [ElementSimple[], PaginationInterface], RequestEndpointPayload, { rejectValue: string }
>('api/fetchElements', async ({ endpoint }, { rejectWithValue }) => {
    try {
        const queryString: string = endpoint.includes(PAGINATION_PAGE_TEXT)
            ? `&${PAGINATION_PAGE_SIZE_TEXT}=${PAGINATION_PAGE_SIZE[0]}` : '';

        const response = await axios.get(`${API_DATA_URL}/${endpoint}${queryString}`);
        
        const pagination: PaginationInterface = {
            first: '', prev: null, next: null, last: '',
            lastPage: 0, actualPage: 0
        };

        // Set pagination
        const link = response.headers.link.split(',');

        for (const linkIndex of PAGINATION_LINK) {
            const index = link.findIndex((e: string) => e.includes(linkIndex));
            switch (linkIndex) {
                case 'first':
                    pagination.first = index > -1
                        ? link[index].split(';')[0].trim().replace(/(?:^<)|(?:>$)/g, '') : '';
                    break;
                case 'prev':
                    pagination.prev = index > -1
                        ? link[index].split(';')[0].trim().replace(/(?:^<)|(?:>$)/g, '') : null;
                    break;
                case 'next':
                    pagination.next = index > -1
                        ? link[index].split(';')[0].trim().replace(/(?:^<)|(?:>$)/g, '') : null;
                    break;
                case 'last':
                    pagination.last = index > -1
                        ? link[index].split(';')[0].trim().replace(/(?:^<)|(?:>$)/g, '') : '';
                    break;
            }
        }

        const lastPage = pagination.last ? parseInt(pagination.last.split('page=')[1].split('&')[0]) : 1;
        const onLastPage = pagination.first && pagination.prev && pagination.last ? lastPage : 1;
        const actualPage = pagination.next ? parseInt(pagination.next.split('page=')[1].split('&')[0]) - 1 : onLastPage;

        pagination.lastPage = lastPage;
        pagination.actualPage = actualPage;

        return [elementToElementSimple(response.data), pagination];
    } catch (error) {
        return rejectWithValue('Failed to fetch data');
    }
});

interface FetchElementsState {
    data: ElementSimple[] | null;
    pagination: PaginationInterface;
    isLoading: boolean;
    error: string | null;
};

const initialState: FetchElementsState = {
    data: null,
    pagination: { first: '', prev: null, next: null, last: '', lastPage: 0, actualPage: 0 },
    isLoading: false,
    error: null,
}

const fetchElementsSlice = createSlice({
    name: 'fetchElements',
    initialState: initialState,
    reducers: {},
    extraReducers: builder => builder
        // Fetch list of books, characters, houses
        .addCase(fetchElements.fulfilled, (state, action) => {
            state.isLoading = false;
            state.data = action.payload[0];
            state.pagination = action.payload[1];
        })
        .addCase(fetchElements.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.error.message as string;
        })
});

export const elementsData = (state: { elements: FetchElementsState }) => state.elements.data;
export const elementsPagination = (state: { elements: FetchElementsState }) => state.elements.pagination;
export default fetchElementsSlice.reducer;
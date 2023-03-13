import axios from 'axios';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

import { ElementSimple, Book, Character, House } from '../global/interfaces';
import { elementToElementSimple } from '../utils';

import {
  API_BOOKS_URL, API_CHARACTERS_URL, API_HOUSES_URL,
  BOOKS_FILTER_STRING,
  CHARACTERS_FILTER_STRING,
  HOUSES_FILTER_STRING,
  PAGE_SIZE_SEARCH
} from '../constants';

const keepNewResults = (results: ElementSimple[], newResults: ElementSimple[]) => {
  return newResults.filter(r => results.find(e => e.url === r.url) === undefined);
};

export const search = createAsyncThunk<ElementSimple[], string, { rejectValue: string }
>('data/search', async (searchTerm) => {
  const results: ElementSimple[] = [];

  for (const filter of BOOKS_FILTER_STRING) {
    const response = await axios.get<Book[]>(`${API_BOOKS_URL}?${filter}=${searchTerm}${PAGE_SIZE_SEARCH}`);
    if (response.data.length > 0) {
      results.push(...keepNewResults(results, elementToElementSimple(response.data)));
    }
  }

  for (const filter of CHARACTERS_FILTER_STRING) {
    const response = await axios.get<Character[]>(`${API_CHARACTERS_URL}?${filter}=${searchTerm}${PAGE_SIZE_SEARCH}`);
    if (response.data.length > 0) {
      results.push(...keepNewResults(results, elementToElementSimple(response.data)));
    }
  }

  for (const filter of HOUSES_FILTER_STRING) {
    const response = await axios.get<House[]>(`${API_HOUSES_URL}?${filter}=${searchTerm}${PAGE_SIZE_SEARCH}`);
    if (response.data.length > 0) {
      results.push(...keepNewResults(results, elementToElementSimple(response.data)));
    }
  }

  return results;
});

interface SearchState {
  query: string | null;
  results: ElementSimple[] | null;
  status: string;
  error: string | null;
}

const initialState: SearchState = {
  query: null,
  results: null,
  status: 'info',
  error: null,
};

const searchSlice = createSlice({
  name: 'search',
  initialState: initialState,
  reducers: {
    search: (state, action: PayloadAction<string>) => {
      state.query = action.payload;
    },
  },
  extraReducers: builder => builder
    .addCase(search.pending, (state) => {
      state.status = 'loading';
    })
    .addCase(search.fulfilled, (state, action) => {
      state.status = 'success';
      state.results = action.payload;
    })
    .addCase(search.rejected, (state, action) => {
      state.status = 'error';
      state.error = action.error.message as string;
    })
});

export const searchData = (state: { search: SearchState }) => state.search.results;
export const searchStatusData = (state: { search: SearchState }) => state.search.status;
export const { search: setSearchQuery } = searchSlice.actions;
export default searchSlice.reducer;

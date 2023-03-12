import axios from 'axios';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import {
  API_BOOKS_URL, API_CHARACTERS_URL, API_HOUSES_URL,
  BOOKS_FILTER_STRING,
  CHARACTERS_FILTER_STRING,
  HOUSES_FILTER_STRING,
  PAGE_SIZE_SEARCH
} from '../constants';

const keepNewResults = (results, newResults) => {
  return newResults.filter(r => results.find(e => e.url === r.url) === undefined);
};

export const search = createAsyncThunk('characters/search', async (searchTerm) => {
  let results = [];

  for (const filter of BOOKS_FILTER_STRING) {
    const response = await axios.get(`${API_BOOKS_URL}?${filter}=${searchTerm}${PAGE_SIZE_SEARCH}`);
    if (response.data.length > 0) {
      results.push(...keepNewResults(results, response.data));
    }
  }

  for (const filter of CHARACTERS_FILTER_STRING) {
    const response = await axios.get(`${API_CHARACTERS_URL}?${filter}=${searchTerm}${PAGE_SIZE_SEARCH}`);
    if (response.data.length > 0) {
      results.push(...keepNewResults(results, response.data));
    }
  }

  for (const filter of HOUSES_FILTER_STRING) {
    const response = await axios.get(`${API_HOUSES_URL}?${filter}=${searchTerm}${PAGE_SIZE_SEARCH}`);
    if (response.data.length > 0) {
      results.push(...keepNewResults(results, response.data));
    }
  }

  return results;
}
);

const initialState = {
  query: null,
  results: null,
  status: 'info',
  error: null,
};

const searchSlice = createSlice({
  name: 'search',
  initialState: initialState,
  reducers: {
    search: (state, action) => {
      state.query = action.payload;
    },
  },
  extraReducers: {
    [search.pending]: (state) => {
      state.status = 'loading';
    },
    [search.fulfilled]: (state, action) => {
      state.status = 'success';
      state.results = action.payload;
    },
    [search.rejected]: (state, action) => {
      state.status = 'error';
      state.error = action.error.message;
    }
  }
});

export const { search: setSearchQuery } = searchSlice.actions;
export default searchSlice.reducer;

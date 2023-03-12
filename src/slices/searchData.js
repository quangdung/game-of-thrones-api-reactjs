import axios from 'axios';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

export const search = createAsyncThunk(
  'characters/search',
  async (searchTerm) => {
    console.log('searchTerm:', searchTerm);

    const response = await axios.get(`https://anapioficeandfire.com/api/characters?name=${searchTerm}`);
    return response.data;
  }
);

const initialState = {
  query: null,
  results: null,
  status: null,
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
      state.searchResults = action.payload;
    },
    [search.rejected]: (state, action) => {
      state.status = 'error';
      state.error = action.error.message;
    }
  }
});

export const { search: setSearchQuery } = searchSlice.actions;
export default searchSlice.reducer;

import axios from 'axios';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import { Character, RequestPayload } from '../global/interfaces';

export const fetchCharacter = createAsyncThunk<Character, RequestPayload, { rejectValue: string }
>('api/fetchCharacter',
    async (payload, { rejectWithValue }) => {
        try {
            const response = await axios.get<Character>(payload.url);
            return response.data;
        } catch (error) {
            return rejectWithValue('Failed to fetch data');
        }
    }
);

interface CharacterState {
    data: Character | null;
    isLoading: boolean;
    error: string | null;
};

const fetchCharacterSlice = createSlice({
    name: 'book',
    initialState: { data: null, isLoading: false, error: null } as CharacterState,
    reducers: {},
    extraReducers: builder => builder
        .addCase(fetchCharacter.pending, (state) => {
            state.isLoading = true;
            state.data = null;
            state.error = null;
        })
        .addCase(fetchCharacter.fulfilled, (state, action) => {
            state.isLoading = false;
            state.data = action.payload;
        })
        .addCase(fetchCharacter.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.error.message as string;
        })
});

export const characterData = (state: { character: CharacterState }) => state.character.data;
export default fetchCharacterSlice.reducer;
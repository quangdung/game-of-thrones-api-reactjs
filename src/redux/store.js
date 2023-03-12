import { configureStore, createSlice } from '@reduxjs/toolkit';

const initialState = {
    selectedElement: null
};

const appSlice = createSlice({
    name: 'iceandfire',
    initialState,
    reducers: {
        selectElement(state, action) {
            console.log('store:', action.payload)
            state.selectedElement = action.payload;
        }
    }
});

const store = configureStore({
    reducer: appSlice.reducer,
});

export const { selectElement } = appSlice.actions;

export default store;

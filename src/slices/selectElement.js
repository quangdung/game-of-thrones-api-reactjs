/**
 * Handle element selection in :
 *  - The list of elements
 *  - The search result list
 * Then display the selected element details in another component
 */
import { createSlice } from '@reduxjs/toolkit';

const selectSlice = createSlice({
    name: 'select',
    initialState: {
        element: null
    },
    reducers: {
        selectElement(state, action) {
            console.log('store:', action.payload)
            state.element = action.payload;
        }
    }
});

export const { selectElement } = selectSlice.actions;
export default selectSlice.reducer;
/**
 * Handle element selection in :
 *  - The list of elements
 *  - The search result list
 * Then display the selected element details in another component
 */
import { createSlice } from '@reduxjs/toolkit';

import { ElementSimple } from '../global/interfaces';

export interface SelectElementState {
    element: ElementSimple | null;
}

const selectSlice = createSlice({
    name: 'select',
    initialState: { element: null } as SelectElementState,
    reducers: {
        selectElement(state, action) {
            state.element = action.payload;
        }
    }
});

export const selectedElementData = (state: { selectElement: SelectElementState }) => state.selectElement.element;
export const { selectElement } = selectSlice.actions;
export default selectSlice.reducer;
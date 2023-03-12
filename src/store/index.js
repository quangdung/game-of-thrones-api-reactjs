import { configureStore } from '@reduxjs/toolkit';

import fetchResourceReducer from '../slices/fetchResource';
import fetchElementsReducer from '../slices/fetchElements';
import fetchElementReducer from '../slices/fetchElement';
import searchReducer from '../slices/searchData';
import selectReducer from '../slices/selectElement';

const rootReducer = {
    resource: fetchResourceReducer,
    elements: fetchElementsReducer,
    element: fetchElementReducer,
    search: searchReducer,
    selectElement: selectReducer,
};

const store = configureStore({
    reducer: rootReducer,
});

export default store;
import { configureStore } from '@reduxjs/toolkit';

import fetchResourceReducer, { resourceData } from '../slices/fetchResource';
import fetchElementsReducer, { elementsData, elementsPagination } from '../slices/fetchElements';

import fetchBookReducer, { bookData } from '../slices/fetchBook';
import fetchCharacterReducer, { characterData } from '../slices/fetchCharacter';
import fetchHouseReducer, { houseData } from '../slices/fetchHouse';

import searchReducer, { searchData, searchStatusData } from '../slices/searchData';
import selectReducer, { selectedElementData } from '../slices/selectElement';

export const DataSelector = {
    resource: resourceData,

    elements: elementsData,
    pagination: elementsPagination,

    book: bookData,
    character: characterData,
    house: houseData,

    search: searchData,
    status: searchStatusData,

    selectedElement: selectedElementData,
};

const rootReducer = {
    resource: fetchResourceReducer,

    elements: fetchElementsReducer,

    book: fetchBookReducer,
    character: fetchCharacterReducer,
    house: fetchHouseReducer,

    search: searchReducer,
    selectElement: selectReducer,
};

const store = configureStore({
    reducer: rootReducer,
});

export default store;
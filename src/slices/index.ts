import { fetchResource } from './fetchResource';
import { fetchElements } from './fetchElements';
import { fetchBook } from './fetchBook';
import { fetchCharacter } from './fetchCharacter';
import { fetchHouse } from './fetchHouse';
import { search } from './searchData';
import { selectElement } from './selectElement';

export const actions = {
    fetchResource, fetchElements,
    fetchBook, fetchCharacter, fetchHouse,
    search,
    selectElement
};
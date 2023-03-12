import { fetchResource } from './fetchResource';
import { fetchElements } from './fetchElements';
import { fetchElement } from './fetchElement';
import { search } from '../slices/searchData';
import { selectElement } from '../slices/selectElement';

export const actions = {
    fetchResource, fetchElements, fetchElement,
    search,
    selectElement
};
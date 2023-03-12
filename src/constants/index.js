/**
 * Can also use environment variables
 */
// Resource.js
export const API_DATA_URL = 'https://anapioficeandfire.com/api';

// Search.js
export const API_BOOKS_URL = `${API_DATA_URL}/books`;
export const API_CHARACTERS_URL = `${API_DATA_URL}/characters`;
export const API_HOUSES_URL = `${API_DATA_URL}/houses`;
export const KEY_EXCLUDED = [ // These keys contain only URLs
        'url',
        'characters', 'povCharacters', // books
        'books', 'povBooks', // characters
        'currentLord', 'heir', 'overlord', 'cadetBranches', 'swornMembers' // houses
    ]

// PaginationData.js
export const PAGINATION_LINK = ['first', 'prev', 'next', 'last'];
export const PAGINATION_PAGE_SIZE = 10;


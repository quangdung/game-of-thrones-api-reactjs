/**
 * Can also use environment variables
 */
// Login.tsx
export const PROFILE_IMAGE_URL = 'https://www.gravatar.com/avatar/?d=mp';

// Resource.js
export const API_DATA_URL = 'https://anapioficeandfire.com/api';

// PaginationData.js
export const PAGINATION_LINK = ['first', 'prev', 'next', 'last'];
export const PAGINATION_PAGE_SIZE = [10, 15, 20];
export const PAGINATION_PAGE_TEXT = 'page';
export const PAGINATION_PAGE_SIZE_TEXT = 'pageSize';

// Item
export const BOOK_TYPE = 'book';
export const CHARACTER_TYPE = 'character';
export const HOUSE_TYPE = 'house';

// // SearchData.js
export const PAGE_SIZE_SEARCH = `&${PAGINATION_PAGE_SIZE_TEXT}=15`;

export const API_BOOKS_URL = `${API_DATA_URL}/books`;
export const API_CHARACTERS_URL = `${API_DATA_URL}/characters`;
export const API_HOUSES_URL = `${API_DATA_URL}/houses`;

export const BOOKS_FILTER_STRING = ['name',
    // 'fromReleaseDate', 'toReleaseDate' // TODO: The API return all books if the date is not valid
];
export const CHARACTERS_FILTER_STRING = ['name',
    // 'gender', // Need to be male/Male/female/Female
    'culture', 'born', 'died'
];
// TODO: to apply later
// export const CHARACTERS_FILTER_BOOLEAN = ['isAlive'] 
export const HOUSES_FILTER_STRING = ['name', 'region', 'words'];
// TODO: to apply later
// export const HOUSES_FILTER_BOOLEAN = ['hasWords', 'hasTitles',
//     'hasSeats', 'hasDiedOut', 'hasAncestralWeapons']; 

// Excluded these keys if we want to search inside the content of elements
// export const KEY_EXCLUDED = [ // These keys contain only URLs
//     'url',
//     'characters', 'povCharacters', // books
//     'books', 'povBooks', // characters
//     'currentLord', 'heir', 'overlord', 'cadetBranches', 'swornMembers' // houses
// ]



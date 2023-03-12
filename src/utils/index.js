/**
 * Extracts the resource type from the URL
 * @param {An element detail URL} url 
 * @returns book, character, house
 */
export const getResouceType = (url) => {
    const urlArray = url.split('/');
    const resourceType = urlArray[urlArray.length - 2];
    return resourceType.slice(0, -1);
}

/**
 * Converts an array to a string
 * @param {An array} array
 * @returns A string
 * @example arrayToString(['a', 'b', 'c']) => 'a, b, c'
 */
export const arrayToString = (array) => {
    return array.map((e, index) => (e + (index < array.length - 1 ? ', ' : '')));
}
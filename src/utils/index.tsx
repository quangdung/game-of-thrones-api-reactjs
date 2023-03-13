import { ElementSimple } from '../global/interfaces';

/**
 * Extracts the resource type from the URL
 * @param {string} url 
 * @returns book, character, house
 */
export const getResouceType: (url: string) => string = (url) => {
    const urlArray = url.split('/');
    const resourceType = urlArray[urlArray.length - 2];
    return resourceType.slice(0, -1);
}

/**
 * Converts an array to a string
 * @param {string[]} array
 * @returns A string
 * @example arrayToString(['a', 'b', 'c']) => 'a, b, c'
 */
export const arrayToString: (array: string[]) => string = (array) => {
    return array.join(', ');
}

/**
 * Converts an element from the API to an element with only the properties url, name and alias
 * @param e An element from the API
 * @returns {ElementSimple} An element with only the properties url, name and alias
 */
export const elementToElementSimple: (e: any) => ElementSimple[] = (
    (e: any) => (e.map((e: any) => ({
        url: e.url, name: e.name, alias: e.aliases ? e.aliases[0] : null
    })))
);

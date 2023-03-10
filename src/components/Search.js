import React, { useState, useEffect } from 'react';

import Item from './Item';
import Element from './Element';

import fetchData from '../utility/fetchData';

const searchInData = (data, toFind) => {
    let found = [];
    const keysExcluded = [ // These keys contain only URLs
        'url',
        'characters', 'povCharacters', // books
        'books', 'povBooks', // characters
        'currentLord', 'heir', 'overlord', 'cadetBranches', 'swornMembers' // houses
    ]

    for (let item of data) {
        const keys = Object.keys(item).filter(key => !keysExcluded.includes(key));

        for (let key of keys) {
            if (Array.isArray(item[key])) {
                if (item[key].findIndex(e => e.toLowerCase().includes(toFind.toLowerCase())) > -1) {
                    found.push(item);
                    break;
                }
            }
            else if (item[key].toString().toLowerCase().includes(toFind.toLowerCase())) {
                found.push(item);
                break;
            }
        }
    };

    return found;
}

function Search() {
    const [books, setBooks] = useState([]);
    const [characters, setCharacters] = useState([]);
    const [houses, setHouses] = useState([]);
    // const [data, setData] = useState([]);

    const [searchTerm, setSearchTerm] = useState('');
    const [found, setFound] = useState([]);

    const [item, setItem] = useState(null);

    useEffect(() => {
        setFound([]);
        setSearchTerm('');

        fetchData('https://anapioficeandfire.com/api/books', setBooks);
        fetchData('https://anapioficeandfire.com/api/characters', setCharacters);
        fetchData('https://anapioficeandfire.com/api/houses', setHouses);

        // let allData = [];
        // const books = fetchData('https://anapioficeandfire.com/api/books');
        // console.log('books:', books)
        // allData.push(...books);
        // const characters = fetchData('https://anapioficeandfire.com/api/characters');
        // allData.push(...characters);
        // const houses = fetchData('https://anapioficeandfire.com/api/houses');
        // allData.push(...houses);
        // setData(allData);
    }, []);

    const handleSearchTermChange = (event) => {
        const toFind = event.target.value;

        setSearchTerm(toFind);
        if (toFind.length >= 3) {
            let result = [];

            const booksFound = searchInData(books, toFind);
            if (booksFound && booksFound.length) {
                console.log('found book:', booksFound);
                result.push(...booksFound);
                console.log('result:', result);
            }

            const charactersFound = searchInData(characters, toFind);
            if (charactersFound && charactersFound.length) {
                console.log('found characters:', charactersFound);
                result.push(...charactersFound);
                console.log('result:', result);
            }

            const housesFound = searchInData(houses, toFind);
            if (housesFound && housesFound.length) {
                console.log('found houses:', housesFound);
                result.push(...housesFound);
                console.log('result:', result);
            }

            // let result = searchInData(data, toFind);

            setFound(result);
            setItem(null);
        };
    };

    return (
        <div>
            <h2>Search</h2>
            <div>
                <input
                    type="text"
                    placeholder="Type more than 3 characters to search..."
                    value={searchTerm}
                    onChange={handleSearchTermChange}
                />
            </div>
            <Element elements={found} setDataSelected={setItem} />
            <Item item={item} />
        </div>
    );
}

export default Search;


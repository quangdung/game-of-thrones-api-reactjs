import React, { useState, useEffect } from 'react';

import Item from './Item';
import Element from './Element';

import fetchData from '../utility/fetchData';

function Search() {
    const [books, setBooks] = useState([]);
    const [characters, setCharacters] = useState([]);
    const [houses, setHouses] = useState([]);

    const [searchTerm, setSearchTerm] = useState('');
    const [found, setFound] = useState([]);

    const [item, setItem] = useState(null);

    useEffect(() => {
        setFound([]);
        setSearchTerm('');

        fetchData('https://anapioficeandfire.com/api/books', setBooks);
        fetchData('https://anapioficeandfire.com/api/characters', setCharacters);
        fetchData('https://anapioficeandfire.com/api/houses', setHouses);
    }, []);

    const handleSearchTermChange = (event) => {
        const toFind = event.target.value;

        setSearchTerm(toFind);
        if (toFind.length >= 3) {
            let result = [];

            const booksFound = books.filter(e =>
                e.name.toLowerCase().includes(toFind.toLowerCase()));
            if (booksFound && booksFound.length) {
                console.log('found book:', booksFound);
                result.push(...booksFound);
                console.log('result:', result);
            }

            const charactersFound = characters.filter(e =>
                e.name.toLowerCase().includes(toFind.toLowerCase()));
            if (charactersFound && charactersFound.length) {
                console.log('found characters:', charactersFound);
                result.push(...charactersFound);
                console.log('result:', result);
            }

            const housesFound = houses.filter(e =>
                e.name.toLowerCase().includes(toFind.toLowerCase()));
            if (housesFound && housesFound.length) {
                console.log('found houses:', housesFound);
                result.push(...housesFound);
                console.log('result:', result);
            }

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
                    placeholder="Search by name"
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


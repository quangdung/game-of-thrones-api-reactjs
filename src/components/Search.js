import React, { useEffect, useState, useRef } from 'react';

import { Button, Col, Form, Overlay, Row } from 'react-bootstrap';

import Item from './Item';
import Element from './Element';

import fetchData from '../utility/fetchData';

import {
    API_BOOKS_URL,
    API_CHARACTERS_URL,
    API_HOUSES_URL,
    KEY_EXCLUDED
} from '../constants';

const searchInData = (data, toFind) => {
    let found = [];

    for (let item of data) {
        const keys = Object.keys(item).filter(key => !KEY_EXCLUDED.includes(key));

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

    const [searchTerm, setSearchTerm] = useState('');
    const [found, setFound] = useState([]);

    const [item, setItem] = useState(null);

    const target = useRef(null);

    useEffect(() => {
        setFound([]);
        setSearchTerm('');

        fetchData(API_BOOKS_URL, setBooks);
        fetchData(API_CHARACTERS_URL, setCharacters);
        fetchData(API_HOUSES_URL, setHouses);

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
            <Form>
                <Row>
                    <Col>
                        <Form.Control
                            type="text"
                            placeholder="Type more than 3 characters..."
                            value={searchTerm}
                            onChange={handleSearchTermChange}
                            ref={target}
                        />
                    </Col>
                    <Col>
                        <Button disabled variant="outline-success">Search</Button>
                    </Col>
                </Row>
            </Form>
            {!item && <Overlay target={target.current} show={found.length > 0} placement="bottom">
                {props => (
                    <div
                        {...props}
                    // style={{
                    //     backgroundColor: 'rgba(255, 100, 100, 0.85)',
                    //     padding: '2px 10px',
                    //     color: 'white',
                    //     borderRadius: 3,
                    //     ...props.style,
                    // }}
                    >
                        <Element elements={found} setDataSelected={setItem} />
                    </div>
                )}
            </Overlay>}
            <Item item={item} />
        </div>
    );
}

export default Search;


import React from 'react';
import { useSelector } from 'react-redux';
import { Table } from 'react-bootstrap';

import { DataSelector } from '../store';
import { arrayToString } from '../utils';


const ElementCharacter = () => {
    const item = useSelector(DataSelector.character);

    return (<div> {item && <div>
        <h3>CHARACTER: {(item.name ? item.name : item.aliases)}</h3>
        <Table striped bordered hover>
            <tbody>
                <tr><td>Name</td><td>{item.name}</td></tr>
                <tr><td>Gender</td><td>{item.gender}</td></tr>
                <tr><td>Culture</td><td>{item.culture}</td></tr>
                <tr><td>Born</td><td>{item.born}</td></tr>
                <tr><td>Died</td><td>{item.died}</td></tr>
                <tr><td>Titles</td><td>{item.titles && arrayToString(item.titles)}</td></tr>
                <tr><td>Aliases</td><td>{item.aliases && arrayToString(item.aliases)}</td></tr>
                <tr><td>Father (URL)</td><td>{item.father}</td></tr>
                <tr><td>Mother (URL)</td><td>{item.mother}</td></tr>
                <tr><td>Spouse (URL)</td><td>{item.spouse}</td></tr>
                <tr><td>Number of allegiances</td><td>{item.allegiances.length}</td></tr>
                <tr><td>Number of books</td><td>{item.books.length}</td></tr>
                <tr><td>Number of POV-books</td><td>{item.povBooks.length}</td></tr>
                <tr><td>TV series</td><td>{item.tvSeries && arrayToString(item.tvSeries)}</td></tr>
                <tr><td>Played by</td><td>{item.playedBy}</td></tr>
            </tbody>
        </Table></div>}
    </div>)
}

export default ElementCharacter;

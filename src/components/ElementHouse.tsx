import React from 'react';
import { useSelector } from 'react-redux';
import { Table } from 'react-bootstrap';

import { DataSelector } from '../store';

import { arrayToString } from '../utils';

const ElementHouse = () => {
    const item = useSelector(DataSelector.house);

    return (<div> {item && <div>
        <h3>HOUSE: {item.name}</h3>
        <Table striped bordered hover>
            <tbody>
                <tr><td>Name</td><td>{item.name}</td></tr>
                <tr><td>Region</td><td>{item.region}</td></tr>
                <tr><td>Coat of arms</td><td>{item.coatOfArms}</td></tr>
                <tr><td>Words</td><td>{item.words}</td></tr>
                <tr><td>Titles</td><td>{item.titles && arrayToString(item.titles)}</td></tr>
                <tr><td>Seats</td><td>{item.seats && arrayToString(item.seats)}</td></tr>
                <tr><td>Current lord (URL)</td><td>{item.currentLord}</td></tr>
                <tr><td>Heir (URL)</td><td>{item.heir}</td></tr>
                <tr><td>Overlord (URL)</td><td>{item.overlord}</td></tr>
                <tr><td>Founded</td><td>{item.founded}</td></tr>
                <tr><td>Founder (URL)</td><td>{item.founder}</td></tr>
                <tr><td>Died out</td><td>{item.diedOut}</td></tr>
                <tr><td>Ancestral weapons</td><td>{item.ancestralWeapons && arrayToString(item.ancestralWeapons)}</td></tr>
                <tr><td>Number of cade branches</td><td>{item.cadetBranches.length}</td></tr>
                <tr><td>Number of sworn members</td><td>{item.swornMembers.length}</td></tr>
            </tbody>
        </Table></div>}
    </div>)
}

export default ElementHouse;

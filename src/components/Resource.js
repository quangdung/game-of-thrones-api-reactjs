import React, { useState, useEffect } from 'react';
import Element from './Element';
import Item from './Item';

import fetchData from '../utility/fetchData';

import "../styles/style.css";

function Resource() {
  const [resources, setResources] = useState([]);
  const [resourceSelected, setResourceSelected] = useState(null);

  const [elements, setElements] = useState(null);

  const [item, setItem] = useState(null);

  useEffect(() => {
    fetchData('https://anapioficeandfire.com/api/', setResources);
  }, []);

  const onResourceClick = (resource) => {
    setResourceSelected(resource);
    setItem(null);

    console.log('resource selected:', resource);
    fetch(`https://anapioficeandfire.com/api/${resource}`)
      .then(response => response.json())
      .then(data => {
        console.log(resource, ':', data.length);
        setElements(data);
      });
  }

  return (
    <div className="container">
      <h1>Game of Thrones</h1>
      <div className="json-display">
        <ul>
          {Object.keys(resources).map(item => (
            <li
              key={item}
              onClick={() => onResourceClick(item)}
            >{item.charAt(0).toUpperCase() + item.slice(1)}</li>
          ))}
        </ul>
        {resourceSelected && <h2>{resourceSelected.toUpperCase()}</h2>}
        <Element elements={elements} setDataSelected={setItem} />
        <Item item={item} />
      </div>
    </div>
  );
}

export default Resource;
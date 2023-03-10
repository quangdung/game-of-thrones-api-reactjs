import React, { useState, useEffect } from 'react';
import Element from './Element';
import Item from './Item';

function Resource() {
  const [resources, setResources] = useState([]);
  const [resourceSelected, setResourceSelected] = useState(null);

  const [elements, setElements] = useState(null);

  const [item , setItem] = useState(null);

  const fetchResource = () => {
    fetch('https://anapioficeandfire.com/api/')
      .then(response => response.json())
      .then(data => {
        console.log('data keys:', Object.keys(data));
        setResources(data);
      });
  };

  useEffect(() => {
    fetchResource()
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
    <div>
      <ul>
        {Object.keys(resources).map(item => (
          <li
            key={item}
            onClick={() => onResourceClick(item)}
          >{item.charAt(0).toUpperCase() + item.slice(1)}</li>
        ))}
      </ul>
      {resourceSelected && <p>{resourceSelected.toUpperCase()}</p>}
      <Element elements={elements} setItem={setItem} />
      <Item item={item} />
    </div>
  );
}

export default Resource;
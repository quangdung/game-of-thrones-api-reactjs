import React, { useState, useEffect } from 'react';

import Alert from 'react-bootstrap/Alert';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import ListGroup from 'react-bootstrap/ListGroup';
import Row from 'react-bootstrap/Row';

import Element from './Element';
import Item from './Item';

import fetchData from '../utility/fetchData';

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
    <div>
      <Container>
        <Row>
          <Col></Col>
          <Col md={8}>
            <Alert variant="info">
              <Alert.Heading className="text-center">
                <h1>Game of Thrones</h1>
              </Alert.Heading>
              <hr />
              <p>
                A a quick overview over all Game of thrones resources like houses, characters and books.
                Click on a resource to see all the elements of that resource, 
                or use the search bar to search for a specific element.
              </p>
            </Alert>
          </Col>
          <Col></Col>
        </Row>

        <Row>
          <Col xs={4}>
            <Row>
              <ListGroup>
                <ListGroup.Item variant='info'><h3>Resource</h3></ListGroup.Item>
                {Object.keys(resources).map(item => (
                  <ListGroup.Item
                    key={item}
                    action
                    {...(resourceSelected === item && { active: true })}
                    onClick={() => onResourceClick(item)}
                  >{item.charAt(0).toUpperCase() + item.slice(1)}
                  </ListGroup.Item>
                ))}
              </ListGroup>
            </Row>

            <Row>
              {resourceSelected && <h2>{resourceSelected.toUpperCase()}</h2>}
              <Element elements={elements} setDataSelected={setItem} />
            </Row>
          </Col>
          <Col xs={1}></Col>
          <Col>
            <Item item={item} />
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default Resource;
import React, { useState, useEffect } from 'react';

import { Alert, Col, Container, ListGroup, Row } from 'react-bootstrap';

import Element from './Element';
import Item from './Item';
import PaginationData from './PaginationData';

import fetchData from '../utility/fetchData';

import { API_DATA_URL } from '../constants';

function Resource() {
  const [resources, setResources] = useState([]); // API 1st level
  const [resourceSelected, setResourceSelected] = useState(null);

  const [elements, setElements] = useState(null); // API 2nd level
  const [pagination, setPagination] = useState(null); // API 2nd level

  const [item, setItem] = useState(null); // API 3rd level

  useEffect(() => {
    fetchData(API_DATA_URL, setResources);
  }, []);

  const onResourceClick = (resource) => {
    setResourceSelected(resource);
    setItem(null);

    fetchData(`${API_DATA_URL}/${resource}`, setElements, setPagination);
  }

  const onPaginationClick = (page) => {
    fetchData(page, setElements, setPagination);
  }

  return (
    <Container>
      <Row>
        <Col></Col>
        <Col md={8}>
          <Alert variant="info" className="text-center">
            <Alert.Heading>
              <h1>Game of Thrones</h1>
            </Alert.Heading>
            <hr />
            <h5>A quick overview over all Game of thrones resources like houses, characters and books</h5>
            <p>
              Click on a resource to see all the elements of that resource,
              or use the search bar to search for a specific element
            </p>
          </Alert>
        </Col>
        <Col></Col>
      </Row>

      <Row>
        <Col md={4}>
          {resources && (
            <ListGroup>
              <ListGroup.Item variant='primary'><h3>Resources</h3></ListGroup.Item>
              {Object.keys(resources).map(item => (
                <ListGroup.Item
                  key={item}
                  action
                  {...(resourceSelected === item && { active: true })}
                  onClick={() => onResourceClick(item)}
                ><b>{item.charAt(0).toUpperCase() + item.slice(1)}</b>
                </ListGroup.Item>
              ))}
            </ListGroup>)}
          <br />
          <br />
          {elements
            && <PaginationData
              pagination={pagination}
              setItemUrl={onPaginationClick}
            />}
          <Element elements={elements} setDataSelected={setItem} />
        </Col>
        <Col xs={1}></Col>
        <Col><Item item={item} /></Col>
      </Row>
    </Container>
  );
}

export default Resource;
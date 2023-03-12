import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Alert, Col, Container, ListGroup, Row } from 'react-bootstrap';

import Element from './Element';
import Item from './Item';
import PaginationData from './PaginationData';

import { actions } from '../slices';

function Resource() {
  const [resourceSelected, setResourceSelected] = useState(null);

  const dispatch = useDispatch();

  const resources = useSelector(state => state.resource.data); // API 1st level

  useEffect(() => {
    dispatch(actions.fetchResource());
  }, [dispatch]);

  const onResourceClick = (resource) => {
    setResourceSelected(resource);
    dispatch(actions.fetchElements(resource));
    dispatch(actions.selectElement(null)); // Hide element details when change resource
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
          <PaginationData />
          <Element />
        </Col>
        <Col xs={1}></Col>
        <Col><Item /></Col>
      </Row>
    </Container>
  );
}

export default Resource;
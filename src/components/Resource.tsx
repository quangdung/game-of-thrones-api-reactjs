import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Alert, Col, Container, ListGroup, Row } from 'react-bootstrap';

import Element from './Element';
import ElementsList from './ElementsList';
import PaginationData from './PaginationData';

import { actions } from '../slices';
import { DataSelector } from '../store';

const Resource = () => {
  const [resourceSelected, setResourceSelected] = useState('');

  const dispatch = useDispatch();

  const resources = useSelector(DataSelector.resource);

  useEffect(() => {
    dispatch(actions.fetchResource() as any);
  }, [dispatch]);

  const onResourceClick = (resource: string) => {
    setResourceSelected(resource);
    dispatch(actions.fetchElements({ endpoint: resource }) as any);
    dispatch(actions.selectElement(null) as any); // Hide element details when change resource
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
              <ListGroup.Item variant='primary'><h3>Select a resource</h3></ListGroup.Item>
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
          <ElementsList />
        </Col>
        <Col xs={1}></Col>
        <Col><Element /></Col>
      </Row>
    </Container>
  );
}

export default Resource;
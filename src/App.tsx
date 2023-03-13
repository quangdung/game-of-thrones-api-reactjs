import React, { useContext } from 'react';

import { Col, Container, Row } from 'react-bootstrap';

import Resource from "./components/Resource";
import Search from "./components/Search";
import Login from "./components/Login";

import { AuthContext } from "./auth";
import { User } from "./global/interfaces";

const App = () => {
  const { user } = useContext(AuthContext) as { user: User };

  return (
    <div>
      {!user && <Login />}
      {user && (
        <Container>
          <Row>
            <Col><Login /></Col>
            <Col></Col>
            <Col className='mt-2'><Search /></Col>
          </Row>
        </Container>
      )}
      {user && (<Resource />)}
    </div>
  );
};

export default App;

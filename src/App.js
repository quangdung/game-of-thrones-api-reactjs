import { useContext } from 'react';

import { Col, Container, Row } from 'react-bootstrap';

import Resource from "./components/Resource";
import Search from "./components/Search";
import Login from "./components/Login";

import { AuthContext } from "./utility/authContext";

function App() {
  const { user } = useContext(AuthContext);

  return (
    <div>
      {!user && <Login />}
      {user && (
        <Container>
          <Row>
            <Col><Login /></Col>
            <Col className='mt-2'><Search /></Col>
          </Row>
        </Container>
      )}
      {user && (<Resource />)}
    </div>
  );
};

export default App;

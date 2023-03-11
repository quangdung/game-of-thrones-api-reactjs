import React, { useContext } from 'react';

import { Button, Col, Container, Form, Row } from 'react-bootstrap';

import { AuthContext } from '../utility/authContext';

function Login() {
    const { user, handleLogin, handleLogout } = useContext(AuthContext);

    const handleLoginFormSubmit = (event) => {
        event.preventDefault();
        const { username, password } = event.target.elements;
        handleLogin(username.value, password.value);
    };

    const handleLogoutButtonClick = () => handleLogout();

    return (<div>
        {user ? (
            <div>
                <p>Hello, {user.username}</p>
                <button onClick={handleLogoutButtonClick}>Log out</button>
            </div>
        ) : (<Container>
            <Row>
                <Col md></Col>
                <Col md>
                    <Form onSubmit={handleLoginFormSubmit}>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Username</Form.Label>
                            <Form.Control type="text" name="username" placeholder="Enter username" />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicPassword">
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password" name="password" placeholder="Enter password" />
                        </Form.Group>

                        <Button variant="primary" type="submit">
                            Log in
                        </Button>
                    </Form>
                </Col>
                <Col md></Col>
            </Row>
        </Container>
        )
        }
    </div>
    );
}

export default Login;

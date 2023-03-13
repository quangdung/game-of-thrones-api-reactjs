import React, { useContext } from 'react';
import { Button, Col, Container, Figure, Form, Row } from 'react-bootstrap';

import { AuthContext } from '../auth';
import { AuthContextType } from '../global/interfaces';
import { PROFILE_IMAGE_URL } from '../constants';

const Login = () => {
    const { user, handleLogin, handleLogout } = useContext(AuthContext) as AuthContextType;
    
    const handleLoginFormSubmit: React.FormEventHandler<HTMLFormElement> = (event) => {
        event.preventDefault();
        const target = event.target as typeof event.target & {
            username: { value: string };
            password: { value: string };
          };

        handleLogin(target.username.value, target.password.value);
    };

    const handleLogoutButtonClick = () => handleLogout();

    return (<div>
        {user ? (
            <div><Figure>
                <Figure.Image src={PROFILE_IMAGE_URL} height={30} width={40} />
            </Figure> Hello, {user.username} <Button
                variant="secondary" size='sm' onClick={handleLogoutButtonClick}>Log out</Button>
            </div>
        ) : (<Container>
            <Row className='mt-5'>
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

                        <Button variant="primary" type="submit">Log in</Button>
                    </Form>
                </Col>
                <Col md></Col>
            </Row>
        </Container>
        )}
    </div>);
}

export default Login;
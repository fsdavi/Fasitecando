import React, { useState, FormEvent } from 'react';
import Particles from 'react-particles-js';
import { Form, Button, Card, Modal, Alert } from 'react-bootstrap';
import { Link, useHistory } from 'react-router-dom';

import logoImg from '../../images/logo.svg';
import api from '../../services/api';

import './styles.scss';

export default function Landing() {
    const history = useHistory();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);

    async function handleLogin(event: FormEvent) {
        event.preventDefault();

        api.post('login', {
            email,
            password
        }).then(() => {

            history.push('/dashboard');

        }).catch(() => {
            setShow(true)
        })
    }

    return (
        <div id="page-landing-form">
            <Modal show={show} onHide={handleClose}>
                <Alert variant="danger" onClose={() => setShow(false)} dismissible>
                    <Alert.Heading> Email or password not valid!</Alert.Heading>
                    <p>If you dont have a account go to SignUp.</p>
                </Alert>
            </Modal>
            <Card className="card-form">
                <Form onSubmit={handleLogin}>
                    <img src={logoImg} alt="Fasitecando" />
                    <Form.Group controlId="formEmail">
                        <Form.Label >Email address</Form.Label>
                        <Form.Control as='input' type="email" placeholder="Enter email" onChange={(event) => { setEmail(event.target.value) }} required />
                    </Form.Group>

                    <Form.Group controlId="formPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control as='input' type="password" placeholder="Password" onChange={(event) => { setPassword(event.target.value) }} required />
                    </Form.Group>
                    <Button variant="primary" type="submit">
                        Login
                </Button>
                </Form>
                <Link to="/register" className="SignUp">
                    SignUp
            </Link>
            </Card>
            <Particles />
        </div>
    );
}
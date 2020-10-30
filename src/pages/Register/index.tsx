import React, { useState, FormEvent } from 'react';
import Particles from 'react-particles-js';
import { Form, Button, Card, Modal, Alert } from 'react-bootstrap';
import { Link, useHistory } from 'react-router-dom';

import logoImg from '../../images/logo.svg';
import api from '../../services/api';

import '../Landing/styles.scss';

export default function Register() {
    const history = useHistory();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);

    function handleRegister(event: FormEvent) {
        event.preventDefault();

        api.post('register', {
            email,
            password
        }).then(() => {
            history.push('/');

        }).catch(() => {

            setShow(true)
        })
    }

    return (
        <div id="page-landing-form">
            <Modal show={show} onHide={handleClose}>
                <Alert variant="danger" onClose={() => setShow(false)} dismissible>
                    <Alert.Heading> Email or password not valid!</Alert.Heading>
                    <p>If you alredy have a account go back and Login.</p>
                </Alert>
            </Modal>
            <Card className="card-form">
                <Form onSubmit={handleRegister}>
                    <img src={logoImg} alt="Fasitecando" />
                    <Form.Group>
                        <Form.Label>Email address</Form.Label>
                        <Form.Control as="input" type="email" placeholder="Enter email" onChange={(event) => { setEmail(event.target.value) }} />
                    </Form.Group>

                    <Form.Group>
                        <Form.Label>Password</Form.Label>
                        <Form.Control as="input" type="password" placeholder="Password" onChange={(event) => { setPassword(event.target.value) }} />
                    </Form.Group>
                    <Button variant="primary" type="submit">
                        SignUp
                </Button>
                </Form>
                <Link to="/" className="SignUp">
                    Back
            </Link>
            </Card>
            <Particles />
        </div>
    );
}
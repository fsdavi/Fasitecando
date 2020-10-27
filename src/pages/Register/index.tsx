import React, { useState, FormEvent } from 'react';
import Particles from 'react-particles-js';
import { Form, Button, Card } from 'react-bootstrap';
import { Link, useHistory } from 'react-router-dom';

import logoImg from '../../images/logo.svg';
import api from '../../services/api';

import '../Landing/styles.scss';

export default function Register() {
    const history = useHistory();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    function handleRegister(event: FormEvent) {
        event.preventDefault();

        api.post('register', {
            email,
            password
        }).then(() => {
            alert('Register success');

            history.push('/');
        }).catch(() => {
            alert('Email or password not valid!')
        })
    }

    return (
        <div id="page-landing-login">
            <Card className="card-form">
                <Form onSubmit={handleRegister}>
                    <img src={logoImg} alt="Fasitecando" />
                    <Form.Group controlId="formBasicEmail">
                        <Form.Label>Email address</Form.Label>
                        <Form.Control as="input" type="email" placeholder="Enter email" onChange={(event) => { setEmail(event.target.value) }} />
                    </Form.Group>

                    <Form.Group controlId="formBasicPassword">
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
import React, { useState, FormEvent } from 'react';
import { Card, Button, Modal, Form, FormControl } from 'react-bootstrap';

import './styles.scss';
import api from '../../services/api';

export interface User {
    email: string,
    first_name: string,
    last_name: string,
    avatar: string,
    id: number
}

export default function UserItem(props: User) {
    const [show, setShow] = useState(false);
    const [name, setName] = useState('');
    const [job, setJob] = useState('');

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    function handleUpdate(event: FormEvent) {
        event.preventDefault();

        api.post('users', {
            name,
            job
        }).then(() => {
            alert('User updated success');
            handleClose();
        }).catch(() => {
            alert('Not valid');
        })
    }

    return (
        <Card className="card-user">
            <Card.Img variant="top" src={props.avatar} />
            <Card.Body>
                <Card.Title>{props.first_name} {props.last_name}</Card.Title>
                <Card.Text>
                    {props.email}
                </Card.Text>
                <Button variant="primary" onClick={handleShow}>Update</Button>
            </Card.Body>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Update on {props.first_name} {props.last_name}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={handleUpdate}>
                        <Form.Label htmlFor="formName">Name</Form.Label>
                        <FormControl type="text" placeholder="Name" className="mr-sm-2" onChange={(event) => { setName(event.target.value) }} />
                        <Form.Label htmlFor="formJob">Job</Form.Label>
                        <FormControl type="text" placeholder="Job" className="mr-sm-2" onChange={(event) => { setJob(event.target.value) }} />
                        <Modal.Footer>
                            <Button variant="secondary" onClick={handleClose}>
                                Close
                            </Button>
                            <Button variant="primary" type="submit" onSubmit={handleUpdate}>
                                Save Changes
                            </Button>
                        </Modal.Footer>
                    </Form>
                </Modal.Body>
            </Modal>

        </Card>
    );
}
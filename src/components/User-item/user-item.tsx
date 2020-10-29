import React, { useState } from 'react';
import { Card, Button, Modal, Form, FormControl } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBriefcase } from '@fortawesome/free-solid-svg-icons';

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
    const [name, setName] = useState(props.first_name + ' ' + props.last_name);
    const [job, setJob] = useState('<Null>');

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    async function handleUpdate(id: number) {
        const response = await api.put(`users/${id}`,
            {
                name,
                job
            });

        if (response.status === 200) {
            handleClose();
            alert('Update success');
        }

    }

    return (
        <Card className="card-user">
            <Card.Img variant="top" src={props.avatar} />
            <Card.Body>
                <Card.Title>{name}</Card.Title>
                <Card.Text>
                    {props.email}
                    <br />
                    <FontAwesomeIcon icon={faBriefcase} /> : {job}
                </Card.Text>
                <Button variant="primary" onClick={handleShow}>Update</Button>
            </Card.Body>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Update on {name}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Label htmlFor="formName">Name</Form.Label>
                        <FormControl type="text" placeholder="Name" className="mr-sm-2" onChange={(event) => { setName(event.target.value) }} />
                        <Form.Label htmlFor="formJob">Job</Form.Label>
                        <FormControl type="text" placeholder="Job" className="mr-sm-2" onChange={(event) => { setJob(event.target.value) }} />
                        <Modal.Footer>
                            <Button variant="secondary" onClick={handleClose}>
                                Close
                            </Button>
                            <Button variant="primary" onClick={() => handleUpdate(props.id)}>
                                Save Changes
                            </Button>
                        </Modal.Footer>
                    </Form>
                </Modal.Body>
            </Modal>

        </Card>
    );
}
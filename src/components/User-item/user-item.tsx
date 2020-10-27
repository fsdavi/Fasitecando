import React from 'react';
import { Card, Button } from 'react-bootstrap';

import './styles.scss';

export interface User {
    email: string,
    first_name: string,
    last_name: string,
    avatar: string,
    id: number
}

export default function UserItem(props: User) {
    return (
        <Card className="card-user">
            <Card.Img variant="top" src={props.avatar} />
            <Card.Body>
                <Card.Title>{props.first_name}{props.last_name}</Card.Title>
                <Card.Text>
                    {props.email}
                </Card.Text>
                <Button variant="primary" style={{ margin: '0 15px 0 0' }}>Update</Button>
                <Button variant="secondary" style={{ padding: '.375rem .95rem' }}>Delete</Button>
            </Card.Body>
        </Card>
    );
} 
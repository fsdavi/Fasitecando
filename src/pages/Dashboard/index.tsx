import React, { useState, FormEvent } from 'react';
import api from '../../services/api';
import { Navbar, Form, Button, FormControl } from 'react-bootstrap';
import { Link } from 'react-router-dom';

import logoImg from '../../images/logo-white.svg';
import UserItem, { User } from '../../components/User-item/user-item';

import './styles.scss';

export default function Dashboard() {
    const [users, setUsers] = useState([]);

    async function searchUsers(event: FormEvent) {
        event.preventDefault();

        const response = await api.get('users');

        setUsers(response.data.data)
    }

    return (
        <div>
            <div id="header">
                <Navbar expand="lg" className="Navbar">
                    <Link to="/"><img src={logoImg} alt="Fasitecando" /></Link>
                    <Form inline>
                        <FormControl type="text" placeholder="Search" className="mr-sm-2" />
                        <Button variant="light" onClick={searchUsers}>Search</Button>
                    </Form>
                </Navbar>
            </div>
            <div id="grid-users">
                {users.map((users: User) => (
                    <UserItem key={users.id} email={users.email} first_name={users.first_name} last_name={users.last_name} id={users.id} avatar={users.avatar} />
                ))}
            </div>
        </div>
    );
}
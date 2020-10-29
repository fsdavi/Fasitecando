import React, { useState, useEffect } from 'react';
import api from '../../services/api';
import { Navbar, Form, Button, FormControl } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faSearch } from '@fortawesome/free-solid-svg-icons';

import logoImg from '../../images/logo-white.svg';
import UserItem, { User } from '../../components/User-item/user-item';

import './styles.scss';

export default function Dashboard() {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        api.get('users').then(response => {
            setUsers(response.data.data);
        })
    }, []);

    function deleteUser(id: any) {
        api.delete(`users/${id}`).then(() => {
            alert('User deleted success');
            users.splice((id - 1), 1);
            setUsers(users);
        })
    }

    return (
        <>
            <div id="header">
                <Navbar expand="lg" className="Navbar">
                    <Link to="/"><img src={logoImg} alt="Fasitecando" /></Link>
                    <Form inline>
                        <FormControl type="text" placeholder="Search" className="mr-sm-2" />
                        <Button variant="light">
                            <FontAwesomeIcon icon={faSearch} />
                        </Button>
                    </Form>
                </Navbar>
            </div>
            <div id="grid-users">
                {users.map((users: User) => (
                    <div id="card-users">
                        <Button variant="light" onClick={() => deleteUser(users.id)} className="delete-button">
                            <FontAwesomeIcon icon={faTrash} />
                        </Button>
                        <UserItem key={users.id}
                            email={users.email}
                            first_name={users.first_name}
                            last_name={users.last_name}
                            id={users.id}
                            avatar={users.avatar}
                        />
                    </div>
                ))
                }
            </div>
        </>
    );
}


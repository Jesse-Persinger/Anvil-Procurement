import * as React from 'react';
import { useState, useEffect } from 'react';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import Title from './Title';
import axios from 'axios';

const API_BASE_URL = 'http://localhost:3000'; // Replace with your API base URL

function preventDefault(event) {
    event.preventDefault();
}

export async function getBudget(userId) {
    try {
        const response = await axios.get(`${API_BASE_URL}/api/budget/${userId}`);
        return response.data;
    } catch (error) {
        throw error;
    }
}

export default function Budget({ user }) {
    const User = user
    console.log(User)
    const [budget, setBudget] = useState([]);

    useEffect(() => {
        // Fetch all vendors when the component mounts
        getBudget(User)
            .then((data) => {
                setBudget(data);
            })
            .catch((error) => {
                console.error('Error fetching vendors:', error);
            });
    }, []);

    return (
        <React.Fragment>
            <Title>Your Budget</Title>

            <Typography color="text.secondary" sx={{ flex: 1 }}>
                ${budget.budget_amount} <br />
                on 15 March, 2019
            </Typography>
            <div>
                <Link color="primary" href="#" onClick={preventDefault}>
                    View balance
                </Link>
            </div>
        </React.Fragment>
    );
}
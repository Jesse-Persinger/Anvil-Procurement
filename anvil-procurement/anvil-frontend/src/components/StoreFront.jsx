import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { red, grey } from '@mui/material/colors';
import AppBarSearch from './AppBarSearch';
import axios from 'axios';

const API_BASE_URL = 'https://anvil-procurement.onrender.com'; // Replace with your API base URL

export async function getAllVendors() {
    try {
        const response = await axios.get(`${API_BASE_URL}/api/vendors`);
        return response.data;
    } catch (error) {
        throw error;
    }
}

const theme = createTheme({
    palette: {
        primary: red,
        secondary: grey,
    },
});

export default function StoreFront({ searchData }) {
    const [vendors, setVendors] = useState([]);

    useEffect(() => {
        // Fetch all vendors when the component mounts
        getAllVendors()
            .then((data) => {
                setVendors(data);
            })
            .catch((error) => {
                console.error('Error fetching vendors:', error);
            });
    }, []);

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <AppBarSearch />
            <main>
                {/* Hero unit */}
                <Box
                    sx={{
                        bgcolor: 'background.paper',
                        pt: 8,
                        pb: 6,
                    }}
                >
                    <Container maxWidth="sm">
                        <Typography
                            component="h1"
                            variant="h2"
                            align="center"
                            color="text.primary"
                            gutterBottom
                        >
                            Find And Buy Stuff* {searchData}
                        </Typography>
                        <Typography
                            component="h1"
                            variant="h3"
                            align="center"
                            color="text.primary"
                        >
                            <br />
                            Approved Vendors
                        </Typography>
                    </Container>
                </Box>
                <Container sx={{ py: 8 }} maxWidth="md">
                    {/* End hero unit */}
                    <Grid container spacing={4}>
                        {vendors.map((vendor) => (
                            <Grid item key={vendor.id} xs={12} sm={6} md={4}>
                                <Card
                                    sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}
                                >
                                    <CardMedia
                                        component="div"
                                        sx={{
                                            // 16:9
                                            pt: '56.25%',
                                        }}
                                        image="https://source.unsplash.com/random?wallpapers"
                                    />
                                    <CardContent sx={{ flexGrow: 1 }}>
                                        <Typography gutterBottom variant="h5" component="h2">
                                            {vendor.name} {/* Display vendor name */}
                                        </Typography>
                                        <Typography>
                                            {/* Display other vendor information */}
                                            {/* You can add more fields here */}
                                        </Typography>
                                    </CardContent>
                                    <CardActions>
                                        <div key={vendor.id}>
                                            <Link to={`/vendor/${vendor.id}/${vendor.name}`}>{'View Items'}</Link>
                                            {/* Other vendor card content */}
                                        </div>
                                    </CardActions>
                                </Card>
                            </Grid>
                        ))}
                    </Grid>
                </Container>
            </main>
            {/* Footer */}
            <Box sx={{ bgcolor: 'background.paper', p: 6 }} component="footer">
                <Typography variant="h6" align="center" gutterBottom>
                    *It's not a creative header I'm working on it
                </Typography>
                <Typography
                    variant="subtitle1"
                    align="center"
                    color="text.secondary"
                    component="p"
                >
                    And here is an equally uncreative footer
                </Typography>
                {/* Copyright component */}
            </Box>
            {/* End footer */}
        </ThemeProvider>
    );
}
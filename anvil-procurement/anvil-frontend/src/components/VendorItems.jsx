import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Grid, Card, CardContent, CardMedia, Typography, Container } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { red, grey } from '@mui/material/colors';
import AppBar from './AppBar';

const theme = createTheme({
    palette: {
        primary: red,
        secondary: grey,
    },
});

function VendorItems() {
    const { vendorId, vendorName } = useParams();
    const [items, setItems] = useState([]);

    useEffect(() => {
        vendorId &&
            // Fetch items associated with the specified vendorId
            axios.get(`http://localhost:3000/api/items/${vendorId}`)
                .then((response) => {
                    setItems(response.data);
                })
                .catch((error) => {
                    console.error('Error fetching items:', error);
                });
    }, [vendorId]);
    return (
        <ThemeProvider theme={theme}>
            <AppBar />
            <Container>
                <Typography
                    component="h1"
                    variant="h2"
                    align="center"
                    color="text.primary"
                    gutterBottom
                >
                    {vendorName}
                </Typography>
                <Grid container spacing={2}>
                    {items.map((item) => (
                        <Grid item key={item.id} xs={12} sm={6} md={4}>
                            <Card>
                                <CardMedia
                                    component="img"
                                    alt={item.name}
                                    height="140"
                                    image={item.imgUrl}
                                />
                                <CardContent>
                                    <Typography variant="h6">{item.name}</Typography>
                                    <Typography variant="body2" color="text.secondary">
                                        {item.description}
                                    </Typography>
                                    <Typography variant="subtitle1" color="primary">
                                        Price: ${item.price}
                                    </Typography>
                                </CardContent>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
            </Container>
        </ThemeProvider>
    );
}

export default VendorItems;


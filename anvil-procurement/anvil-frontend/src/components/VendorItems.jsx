import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Grid, Card, CardContent, CardMedia, Typography, Container, Button } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { red, grey } from '@mui/material/colors';
import AppBarSearch from './AppBarSearch';
import CssBaseline from '@mui/material/CssBaseline';
import { getStorageValues, cleanStorageValues, setStorageValues } from '../../utils/localStorage'

const theme = createTheme({
    palette: {
        primary: red,
        secondary: grey,
    },
});

function VendorItems({ items, setItems }) {
    const { vendorId, vendorName } = useParams();
    const cartId = getStorageValues('userId');

    const handleAddToCart = (itemId) => {
        // Send a request to your backend to add the item to the cart
        axios.post(`https://anvil-procurement.onrender.com/api/cart/1/addItem/${itemId}`)
            .then((response) => {
                // Handle success, e.g., show a success message to the user
                console.log('Item added to cart:', response.data);
            })
            .catch((error) => {
                // Handle error, e.g., show an error message to the user
                console.error('Error adding item to cart:', error);
            });
    };

    useEffect(() => {
        vendorId &&
            // Fetch items associated with the specified vendorId
            axios.get(`https://anvil-procurement.onrender.com/api/items/${vendorId}`)
                .then((response) => {
                    setItems(response.data);
                })
                .catch((error) => {
                    console.error('Error fetching items:', error);
                });
    }, [vendorId]);

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <AppBarSearch items={items} setItems={setItems} />
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
                                    <Button
                                        variant="contained"
                                        color="primary"
                                        onClick={() => handleAddToCart(item.id)}
                                    >
                                        Add to Cart
                                    </Button>
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
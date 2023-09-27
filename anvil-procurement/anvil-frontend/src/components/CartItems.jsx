import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Grid, Card, CardContent, CardMedia, Typography, Container, Button } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { red, grey } from '@mui/material/colors';
import AppBarSearch from './AppBarSearch';
import CssBaseline from '@mui/material/CssBaseline';
import { getStorageValues } from '../../utils/localStorage'

const theme = createTheme({
    palette: {
        primary: red,
        secondary: grey,
    },
});

function cartItems() {
    const cartId = getStorageValues('userId')
    const [items, setItems] = useState([])

    useEffect(() => {
        // Fetch items associated with the specified vendorId
        axios.get(`http://localhost:3000/api/cart/cart-items/${cartId}`)
            .then((response) => {
                setItems(response.data)
            })
            .catch((error) => {
                console.error('Error fetching items:', error);
            });
    }, []);

    function removeItem(itemId) {
        const cartId = getStorageValues('userId');

        axios.delete(`http://localhost:3000/api/cart/remove-cart-item/${itemId}/${cartId}`)
            .then((response) => {
                console.log('Item removed:', itemId);
                axios.get(`http://localhost:3000/api/cart/cart-items/${cartId}`)
                    .then((response) => {
                        console.log('Found It:', response.data);
                        setItems(response.data)
                    })
                    .catch((error) => {
                        console.error('Error fetching items:', error);
                    });
            })
            .catch((error) => {
                console.error('Error removing item:', error);
            });
    }

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <AppBarSearch />
            <Container>
                <Typography
                    component="h1"
                    variant="h2"
                    align="center"
                    color="text.primary"
                    gutterBottom
                >
                    *Your Cart / Purchase Order
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
                                    {/* Add a Remove button */}<h2>{'QTY:' + item.quantity}</h2>
                                    <Button
                                        variant="outlined"
                                        color="secondary"
                                        onClick={() => removeItem(item.id)} // Pass the item's ID to the removal function
                                    >
                                        Remove
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

export default cartItems;
import React, { useState, useEffect } from 'react';
import {
    Container,
    Typography,
    Box,
    CircularProgress,
    Alert,
    TableContainer,
    Table,
    TableHead,
    TableRow,
    TableCell,
    TableBody,
    Paper,
    Button
} from '@mui/material';
import { Link } from 'react-router-dom';

const OrderHistoryPage = () => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                // In a real application, you would fetch this from your backend
                // For now, we'll use a placeholder
                setOrders([
                    {
                        _id: '646f9e9f8a37b01b6c7f8e02',
                        totalPrice: 166916.50,
                        isPaid: true,
                        isDelivered: false,
                        shippingStatus: 'Shipped',
                        createdAt: new Date().toISOString()
                    },
                    {
                        _id: '646f9e9f8a37b01b6c7f8e03',
                        totalPrice: 83500.00,
                        isPaid: true,
                        isDelivered: true,
                        shippingStatus: 'Delivered',
                        createdAt: new Date().toISOString()
                    }
                ]);
            } catch (err) {
                setError('Failed to fetch order history.');
            } finally {
                setLoading(false);
            }
        };

        fetchOrders();
    }, []);

    if (loading) {
        return (
            <Box display="flex" justifyContent="center" alignItems="center" minHeight="50vh">
                <CircularProgress />
            </Box>
        );
    }

    if (error) {
        return (
            <Container maxWidth="md" sx={{ mt: 4 }}>
                <Alert severity="error">{error}</Alert>
            </Container>
        );
    }

    return (
        <Container maxWidth="lg" sx={{ mt: 4 }}>
            <Typography variant="h4" gutterBottom>
                Order History
            </Typography>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="order history table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Order ID</TableCell>
                            <TableCell align="right">Date</TableCell>
                            <TableCell align="right">Total</TableCell>
                            <TableCell align="right">Paid</TableCell>
                            <TableCell align="right">Status</TableCell>
                            <TableCell align="right">Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {orders.map((order) => (
                            <TableRow key={order._id}>
                                <TableCell component="th" scope="row">
                                    {order._id}
                                </TableCell>
                                <TableCell align="right">{new Date(order.createdAt).toLocaleDateString()}</TableCell>
                                <TableCell align="right">₹{(order.totalPrice * 83.5).toFixed(2)}</TableCell>
                                <TableCell align="right">{order.isPaid ? 'Yes' : 'No'}</TableCell>
                                <TableCell align="right">{order.shippingStatus}</TableCell>
                                <TableCell align="right">
                                    <Button
                                        variant="contained"
                                        color="primary"
                                        component={Link}
                                        to={`/orders/${order._id}`}
                                    >
                                        View Details
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Container>
    );
};

export default OrderHistoryPage;

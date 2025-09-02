import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import {
    Container,
    Typography,
    Box,
    CircularProgress,
    Alert
} from '@mui/material';

const OrderDetailsPage = () => {
    const { id } = useParams();
    const [order, setOrder] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchOrder = async () => {
            try {
                // In a real application, you would fetch this from your backend
                // For now, we'll use a placeholder
                setOrder({
                    _id: id,
                    trackingNumber: '1Z999AA99999999999',
                    shippingStatus: 'Processing',
                    shippingCarrier: 'UPS',
                    shippingAddress: '123 Main St, Karnataka, India 110001',
                    totalPrice: 166916.50,
                    createdAt: new Date().toISOString()
                });
            } catch (err) {
                setError('Failed to fetch order details.');
            } finally {
                setLoading(false);
            }
        };

        fetchOrder();
    }, [id]);

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
        <Container maxWidth="md" sx={{ mt: 4 }}>
            <Typography variant="h4" gutterBottom>
                Order Details
            </Typography>
            <Box sx={{ p: 3, border: '1px solid #ccc', borderRadius: 2 }}>
                <Typography variant="h6">Order ID: {order._id}</Typography>
                <Typography variant="body1" sx={{ mt: 1 }}>
                    Tracking Number: **{order.trackingNumber}**
                </Typography>
                <Typography variant="body1">
                    Shipping Status: **{order.shippingStatus}**
                </Typography>
                <Typography variant="body1">
                    Shipping Carrier: {order.shippingCarrier}
                </Typography>
                <Typography variant="body1">
                    Shipping Address: {order.shippingAddress}
                </Typography>
                <Typography variant="body1">
                    Total: ₹{(order.totalPrice * 83.5).toFixed(2)}
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>
                    Placed On: {new Date(order.createdAt).toLocaleString()}
                </Typography>
            </Box>
        </Container>
    );
};

export default OrderDetailsPage;
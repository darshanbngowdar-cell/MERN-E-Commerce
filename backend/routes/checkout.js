const Order = require('../models/orderModel'); // Import the new Order model
const express = require('express');
const router = express.Router();

/**
 * @swagger
 * /api/checkout/create-order:
 * post:
 * summary: Create a new order
 * description: Creates a new order with the provided details such as items, customer information, and payment details.
 * tags:
 * - Orders
 * requestBody:
 * required: true
 * content:
 * application/json:
 * schema:
 * type: object
 * properties:
 * items:
 * type: array
 * items:
 * type: object
 * properties:
 * productId:
 * type: string
 * description: The unique identifier of the product.
 * quantity:
 * type: integer
 * description: The number of items for this product.
 * name:
 * type: string
 * description: Customer's name.
 * email:
 * type: string
 * description: Customer's email address.
 * shippingAddress:
 * type: string
 * description: Customer's shipping address.
 * cardNumber:
 * type: string
 * description: Customer's card number.
 * cardName:
 * type: string
 * description: Name on the customer's card.
 * expiry:
 * type: string
 * description: Card expiry date in MM/YY format.
 * cvc:
 * type: string
 * description: Card CVC.
 * responses:
 * 201:
 * description: Order created successfully
 * content:
 * application/json:
 * schema:
 * type: object
 * properties:
 * message:
 * type: string
 * description: Success message.
 * 400:
 * description: Bad request - Missing or invalid fields
 * content:
 * application/json:
 * schema:
 * type: object
 * properties:
 * error:
 * type: string
 * description: Description of the error.
 * 500:
 * description: Internal server error
 * content:
 * application/json:
 * schema:
 * type: object
 * properties:
 * error:
 * type: string
 * description: Description of the server error.
 */
router.post('/create-order', async (req, res) => {
    try {
        const { items, name, email, shippingAddress, cardNumber, cardName, expiry, cvc } = req.body;

        if (!items || !name || !email || !shippingAddress || !cardNumber || !cardName || !expiry || !cvc) {
            return res.status(400).json({ error: 'Missing required fields' });
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!emailRegex.test(email)) {
            return res.status(400).json({ error: 'Invalid email format' });
        }

        if (!/^\d{16}$/.test(cardNumber)) {
            return res.status(400).json({ error: 'Invalid card number' });
        }

        if (!/^(0[1-9]|1[0-2])\/\d{2}$/.test(expiry)) {
            return res.status(400).json({ error: 'Invalid expiry date' });
        }

        if (!/^\d{3,4}$/.test(cvc)) {
            return res.status(400).json({ error: 'Invalid CVC' });
        }

        // Create a new order instance using the Order model
        const newOrder = new Order({
            user: req.user._id, // Assuming user is authenticated and their ID is available in req.user
            orderItems: items,
            shippingAddress: {
                address: shippingAddress,
                city: 'New Delhi', // You'll need to get this from the frontend
                postalCode: '110001', // You'll need to get this from the frontend
                country: 'India', // You'll need to get this from the frontend
            },
            paymentMethod: 'Stripe', // Assuming Stripe payment
            paymentResult: {
                id: 'pay_1234567890', // Get from payment gateway response
                status: 'succeeded', // Get from payment gateway response
                update_time: Date.now(),
                email_address: email,
            },
            // Default values for new tracking fields
            trackingNumber: null,
            shippingStatus: 'Processing',
            shippingCarrier: null,
            // ... other order details
        });

        const createdOrder = await newOrder.save();

        res.status(201).json({ message: 'Order created successfully!', orderId: createdOrder._id });

    } catch (error) {
        console.error('Error creating order:', error);
        res.status(500).json({ error: 'Failed to create order' });
    }
});

module.exports = router;
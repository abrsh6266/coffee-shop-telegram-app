import { Router } from 'express';

const apiRouter = Router();

// Endpoint to fetch the coffee menu
apiRouter.get('/menu', (req, res) => {
    const menu = [
        { id: 1, name: 'Espresso', price: 3.0 },
        { id: 2, name: 'Cappuccino', price: 3.5 },
        { id: 3, name: 'Latte', price: 4.0 },
    ];
    res.json(menu);
});

// Endpoint to place an order
apiRouter.post('/order', (req, res) => {
    const { userId, items } = req.body; // Expect user ID and item list
    if (!userId || !items) {
        return res.status(400).json({ message: 'Invalid order data' });
    }

    // Simulate storing the order
    console.log(`Order received from ${userId}:`, items);

    res.json({ message: 'Order placed successfully' });
});

export default apiRouter;

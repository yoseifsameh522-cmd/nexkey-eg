require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const productsRoute = require('./routes/products');
const ordersRoute = require('./routes/orders');
const stripeRoute = require('./routes/stripe');

const app = express();
connectDB();

app.use(cors({ origin: process.env.CLIENT_URL || 'http://localhost:3000' }));
app.use(express.json());

app.get('/', (req, res) => res.send('NexKey - متجر يعمل'));

app.use('/images', express.static(__dirname + '/public/images'));
app.use('/api/products', productsRoute);
app.use('/api/orders', ordersRoute);
app.use('/api/stripe', stripeRoute);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

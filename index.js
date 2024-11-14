const express = require('express');
const paypal = require('./Services/paypal')
const bodyParser = require('body-parser');
const multer = require('multer');
const userRoutes = require('./routes/userRoutes');
const adminRoutes = require('./routes/adminRoutes');
const adminRegisterRoutes = require('./routes/adminRegisterRoutes');
const villaRoutes = require('./routes/villaRoutes');
require('dotenv').config();
const cors = require('cors');
const path = require('path');
require('./db/dbConnect');

const paymentRoutes = require('./routes/paymentRoutes');
const app = express();
const port = process.env.PORT || 4000;

const webhookRoutes = require('./routes/paymentRoutes'); 
app.use('/api/webhook', webhookRoutes); 

// CORS Configuration
const allowedOrigins = [process.env.FRONTEND_URL, 'http://localhost:3000'];

app.use(cors({
    origin: (origin, callback) => {
        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    credentials: true, // Allow cookies and authorization headers
}));

// app.use(
//     cors({
//       origin: process.env.FRONTEND_URL || 'https://luxury-rental.netlify.app', // Allow React app
//       methods: ['GET', 'POST', 'PUT', 'DELETE'], // Allowed methods
//       credentials: true, // Allow credentials (cookies, authorization headers)
//     })
//   );
// app.use(cors());
// app.use(cors({
//     origin: process.env.FRONTEND_URL, 
//     methods: ['GET', 'POST'],
//     credentials: true,
// }));
app.use(express.json());


app.use(bodyParser.json());


app.use('/uploads', express.static(path.join(__dirname, 'uploads')));


app.use('/user', userRoutes);


app.use('/admin', adminRegisterRoutes);
app.use('/admin', adminRoutes);


app.use('/villas', villaRoutes);
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ message: 'Something went wrong on the server.' });
  });
  

app.use('/api', paymentRoutes);


// Start the server
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});

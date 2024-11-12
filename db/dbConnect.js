const mongoose = require('mongoose');
require('dotenv').config();

const mongoURI = process.env.MONGO_URL;

if (!mongoURI) {
    console.error('Error: MONGO_URL is not defined in the environment variables.');
    process.exit(1); // Exit if the URI is missing
}

mongoose.connect(mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    connectTimeoutMS: 30000, // Increase timeout
    serverSelectionTimeoutMS: 30000, // Increase server selection timeout
})
    .then(() => {
        console.log('MongoDB Connected Successfully');
    })
    .catch((error) => {
        console.error('Error connecting to MongoDB:', error);
    });

mongoose.connection.on('connected', () => {
    console.log('Mongoose connected to MongoDB');
});

mongoose.connection.on('error', (err) => {
    console.error('Mongoose connection error:', err);
});

mongoose.connection.on('disconnected', () => {
    console.log('Mongoose disconnected');
});

module.exports = mongoose;

// const mongoose = require('mongoose');
// require('dotenv').config();  

// const mongoURI = process.env.MONGO_URL || 'mongodb://localhost:27017/server';

// mongoose.connect(mongoURI, {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//     connectTimeoutMS: 30000, // 30 seconds
//     serverSelectionTimeoutMS: 30000,
// })
//     .then(() => {
//         console.log('MongoDB Connected Successfully');
//     })
//     .catch((error) => {
//         console.error('Error connecting to MongoDB:', error);
//     });

// module.exports = mongoose;

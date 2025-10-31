const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const path = require('path');
const compression = require('compression');
const morgan = require('morgan');
const db = require('./config/mongoose-connection');
const authRouter = require('./routes/authRouter');
const expressSession = require('express-session');
const flash = require('connect-flash');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Security middleware
app.use(helmet()); // Set HTTP security headers

// Logging
app.use(morgan('combined')); // Log HTTP requests

// Compression
app.use(compression()); // Compress responses

// CORS configuration
const corsOptions = {
    origin: process.env.CLIENT_URL || 'http://localhost:3000',
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true
};
app.use(cors(corsOptions));

// Body parser middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Session configuration
app.use(expressSession({
    secret: process.env.EXPRESS_SESSION_SECRET || 'your-secret-key',
    resave: false,
    saveUninitialized: false,
    cookie: { 
        secure: process.env.NODE_ENV === 'production', // HTTPS only in production
        httpOnly: true, // Prevent client-side access
        sameSite: 'strict' // CSRF protection
    }
}));
app.use(flash());

// Routes
app.use('/api/auth', authRouter);
app.get('/', (req, res) => {
    res.status(200).json({ message: 'Student Activity Platform API' });
});

// 404 handler
app.use((req, res) => {
    res.status(404).json({ success: false, message: 'Route not found' });
});

// Global error handling middleware
app.use((err, req, res, next) => {
    const status = err.status || 500;
    const message = err.message || 'Internal Server Error';
    
    console.error(`[${new Date().toISOString()}] Error:`, message);
    
    res.status(status).json({
        success: false,
        message: process.env.NODE_ENV === 'production' ? 'An error occurred' : message,
        ...(process.env.NODE_ENV !== 'production' && { error: err })
    });
});

// Server startup
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT} in ${process.env.NODE_ENV || 'development'} mode`);
});

// const express = require('express');
// const app = express();
// const cors = require('cors');
// const connectDb = require("./utils/db");
// const authRoute = require("./routers/auth-router");
// const errorMiddleware = require('./middlewares/error-middleware');
// const dotenv = require('dotenv');
// const DefaultData = require('./default');

// dotenv.config();

// const corsOptions = {
//     origin: ['https://fusion-cart-frontend.vercel.app', 'http://localhost:3000'],
//     methods: ["GET", "POST"],
//     credentials: true,
//     allowedHeaders: ["Content-Type", "Authorization"]
// };

// app.use(cors(corsOptions));
// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));

// app.use("/", authRoute);

// app.use(errorMiddleware);

// const PORT = process.env.PORT || 5000;

// // if(process.env.NODE_ENV === 'production'){
// //     app.use(express.static('fusioncart-frontend/build'));
// // }

// connectDb().then(() => {
//     app.listen(PORT, () => {
//         console.log(`Server is running on port ${PORT}`);
//     });
// }).catch((error) => {
//     console.error("Failed to connect to the database", error);
// });

// DefaultData();


// const express = require('express');
// const app = express();
// const cors = require('cors');
// const connectDb = require("./utils/db");
// const authRoute = require("./routers/auth-router");
// const errorMiddleware = require('./middlewares/error-middleware');
// const dotenv = require('dotenv');
// const DefaultData = require('./default');

// dotenv.config();

// const allowedOrigins = ['https://fusion-cart-frontend.vercel.app', 'http://localhost:3000'];

// app.use((req, res, next) => {
//     const origin = req.headers.origin;
//     if (allowedOrigins.includes(origin)) {
//         res.setHeader('Access-Control-Allow-Origin', origin);
//     }
//     res.setHeader('Access-Control-Allow-Methods', 'GET,POST');
//     res.setHeader('Access-Control-Allow-Headers', 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version');
//     res.setHeader('Access-Control-Allow-Credentials', 'true');
//     next();
// });

// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));

// app.use("/", authRoute);

// app.use(errorMiddleware);

// const PORT = process.env.PORT || 5000;

// connectDb().then(() => {
//     app.listen(PORT, () => {
//         console.log(`Server is running on port ${PORT}`);
//     });
// }).catch((error) => {
//     console.error("Failed to connect to the database", error);
// });

// DefaultData();


// FInal
// const express = require('express');
// const app = express();
// const cors = require('cors');
// const connectDb = require("./utils/db");
// const authRoute = require("./routers/auth-router");
// const errorMiddleware = require('./middlewares/error-middleware');
// const dotenv = require('dotenv');
// const DefaultData = require('./default');

// dotenv.config();

// const allowedOrigins = ['https://fusion-cart-frontend.vercel.app', 'http://localhost:3000'];

// app.use((req, res, next) => {
//     const origin = req.headers.origin;
//     if (allowedOrigins.includes(origin)) {
//         res.setHeader('Access-Control-Allow-Origin', origin);
//     }
//     res.setHeader('Access-Control-Allow-Methods', 'GET,POST');
//     res.setHeader('Access-Control-Allow-Headers', 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version');
//     res.setHeader('Access-Control-Allow-Credentials', 'true');
//     next();
// });

// // Handle preflight requests
// app.options('*', (req, res) => {
//     res.header('Access-Control-Allow-Origin', req.headers.origin);
//     res.header('Access-Control-Allow-Methods', 'GET,POST');
//     res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
//     res.header('Access-Control-Allow-Credentials', 'true');
//     res.sendStatus(200);
// });

// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));

// app.use("/", authRoute);

// app.use(errorMiddleware);

// const PORT = process.env.PORT || 5000;

// connectDb().then(() => {
//     app.listen(PORT, () => {
//         console.log(`Server is running on port ${PORT}`);
//     });
// }).catch((error) => {
//     console.error("Failed to connect to the database", error);
// });

// DefaultData();


const express = require('express');
const cors = require('cors');
const session = require('express-session');
const passport = require('passport');
const dotenv = require('dotenv');
const connectDb = require("./utils/db");
const authRoute = require("./routers/auth-router");
const errorMiddleware = require('./middlewares/error-middleware');
const DefaultData = require('./default');
const paymentRoute = require("./routers/payment-router"); // Import your payment route
require('./config/passport-config'); // Ensure passport is configured

dotenv.config();
const app = express();

const allowedOrigins = ['https://fusion-cart-frontend.vercel.app', 'http://localhost:3000'];

app.use((req, res, next) => {
    const origin = req.headers.origin;
    if (allowedOrigins.includes(origin)) {
        res.setHeader('Access-Control-Allow-Origin', origin);
    }
    res.setHeader('Access-Control-Allow-Methods', 'GET,POST');
    res.setHeader('Access-Control-Allow-Headers', 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version');
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    next();
});


// / Handle preflight requests
app.options('*', (req, res) => {
    res.header('Access-Control-Allow-Origin', req.headers.origin);
    res.header('Access-Control-Allow-Methods', 'GET,POST');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    res.header('Access-Control-Allow-Credentials', 'true');
    res.sendStatus(200);
});

// Session Middleware (Required for Google Auth)
app.use(session({
    secret: process.env.SESSION_SECRET || 'your_secret_key',
    resave: false,
    saveUninitialized: false,
    cookie: {
        secure: process.env.NODE_ENV === "production", // Use secure cookies in production
        httpOnly: true, // Prevent XSS attacks
        sameSite: 'lax' // Allows authentication to work with third-party requests
    }
}));

// Initialize Passport Middleware
app.use(passport.initialize());
app.use(passport.session());

// Middleware for Parsing Request Bodies
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use("/", authRoute);
app.use("/api/payment", paymentRoute); // Ensure this is the correct route for your API

// Error Handling Middleware
app.use(errorMiddleware);

// Database Connection & Start Server
const PORT = process.env.PORT || 5000;
connectDb().then(() => {
    console.log("Database connected successfully.");
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
}).catch((error) => {
    console.error("Failed to connect to the database", error);
});

// Default Data Setup (If Needed)
DefaultData();

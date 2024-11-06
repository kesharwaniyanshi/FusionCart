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
//     origin: ['https://fusion-cart-frontend.vercel.app','http://localhost:3000'],
//     methods: ["GET","POST"],
//     credentials: true,
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
const express = require('express');
const app = express();
const cors = require('cors');
const connectDb = require("./utils/db");
const authRoute = require("./routers/auth-router");
const errorMiddleware = require('./middlewares/error-middleware');
const dotenv = require('dotenv');
const DefaultData = require('./default');

dotenv.config();

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

// Handle preflight requests
app.options('*', (req, res) => {
    res.header('Access-Control-Allow-Origin', req.headers.origin);
    res.header('Access-Control-Allow-Methods', 'GET,POST');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    res.header('Access-Control-Allow-Credentials', 'true');
    res.sendStatus(200);
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/", authRoute);

app.use(errorMiddleware);

const PORT = process.env.PORT || 5000;

connectDb().then(() => {
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
}).catch((error) => {
    console.error("Failed to connect to the database", error);
});

DefaultData();

const express = require('express');
const app = express();
const cors = require('cors');
const connectDb = require("./utils/db");
const authRoute = require("./routers/auth-router");
const errorMiddleware = require('./middlewares/error-middleware');
const dotenv = require('dotenv');
const DefaultData = require('./default');

dotenv.config();

const corsOptions = {
    origin: ['https://fusion-cart-frontend.vercel.app'],
    methods: ["GET","POST"],
    credentials: true,
};
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/", authRoute);

app.use(errorMiddleware);

const PORT = process.env.PORT || 5000;

if(process.env.NODE_ENV === 'production'){
    app.use(express.static('fusioncart-frontend/build'));
}


connectDb().then(() => {
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
}).catch((error) => {
    console.error("Failed to connect to the database", error);
});


DefaultData();
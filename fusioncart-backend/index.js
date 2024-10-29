const express = require('express');
const app = express();
const cors = require('cors');
const connectDb = require("./utils/db");
const authRoute = require("./routers/auth-router");
const errorMiddleware = require('./middlewares/error-middleware');
const dotenv = require('dotenv');

dotenv.config();
app.use(cors());
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

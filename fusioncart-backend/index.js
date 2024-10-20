const express = require('express');
const app = express();
const cors=require('cors');
const connectDb=require("./utils/db");
const authRoute=require("./routers/auth-router");
const errorMiddleware = require('./middlewares/error-middleware');


app.use(cors());
app.use(express.json());

app.use("/api/auth",authRoute);

app.use(errorMiddleware)
PORT=process.env.PORT || 5000;
connectDb().then(() => {
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
});

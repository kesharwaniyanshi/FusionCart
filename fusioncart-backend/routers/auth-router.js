const  {getProducts,getProductById}  =require( '../Controller/product-controller');
const express = require('express');
const router = express.Router();
const authcontroller = require("../Controller/auth-controller");
const validate = require("../middlewares/validator-middleware");
const authRouter = require("./authRouter");
// const { loginSchema, signupSchema } = require("../validators/auth-validators");


router.post('/signup', authcontroller.register);
router.post('/login', authcontroller.login);

router.get("/products",getProducts);
router.get("/product/:product_id",getProductById);

router.use('/auth', authRouter);


module.exports = router;
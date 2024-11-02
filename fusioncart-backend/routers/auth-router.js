const  {getProducts,getProductById}  =require( '../Controller/product-controller');
const express = require('express');
const router = express.Router();
const authcontroller = require("../Controller/auth-controller");
const validate = require("../middlewares/validator-middleware");
// const { loginSchema, signupSchema } = require("../validators/auth-validators");


// const authMiddleware = require("../middlewares/auth-middleware");

// router.route("/").get(authcontroller.home);
// router.route("/register").post(authcontroller.register);
// router.route("/register").post(validate(signupSchema), authcontroller.register);
// // router.route("/login").post(authcontroller.login);
// router.route("/login").post(validate(loginSchema), authcontroller.login);
// router.route("/user").get(authMiddleware, authcontroller.user);

// router.route("/signup").post(validate(signupSchema),authcontroller.register);
// router.route("/login").post(validate(loginSchema),authcontroller.login);

router.post('/signup', authcontroller.register);
router.post('/login', authcontroller.login);

router.get("/products",getProducts);
router.get("/product/:product_id",getProductById);




module.exports = router;
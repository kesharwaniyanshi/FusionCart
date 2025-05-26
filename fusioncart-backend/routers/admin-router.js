const router = require('express').Router();
const express = require('express');
const authMiddleware  = require("../middlewares/auth-middlewares");
const authorizeHost  = require("../middlewares/admin-middleware");

router.use("/admin", authMiddleware, authorizeHost);

module.exports = router;
const User = require("../models/user-model");

const authorizeHost = async(req, res, next) => {
    try {
        const userData = await User.findOne({ email: req.user.email }).select({
            password: 0,
        });

        req.userData = userData;
        if (!userData?.isHost) {
            return res.status(403).json({ error: "Access denied. Host privileges required." });
        }
        next();
    } catch (error) {
        console.error("Authorize Host Error:", error.message);
        return res.status(500).json({ message: "Internal Server Error." });
    }
    
    
};

module.exports = authorizeHost;

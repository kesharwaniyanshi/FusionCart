const User = require('../models/user-model');
var bcrypt = require('bcryptjs');
// home logic
const home = async (req, res) => {
    try {
        res.status(200).send("Hello World");
    }
    catch (error) {
        console.log(error);
    }
};
// registration logic
const register = async (req, res) => {
    try {
        const { name, email, phone, password } = req.body;

        // Check if the user already exists
        const userExist = await User.findOne({ email });
        if (userExist) {
            return res.status(400).json({ message: "User already exists!" });
        }

        // Create new user

        // hashing password

        // const saltRound=10;
        // const hash_password=await bcrypt.hash(password,saltRound);

        const newUser = new User({ name, email, phone, password });
        await newUser.save();

        res
            .status(201)
            .json({
                msg: "User Registered Successfully",
                token: await newUser.generateToken(),
                userId: newUser._id.toString()
            });
    }
    catch (error) {
        console.log(error);
        res.status(500).send(error);
    }
}

// LOGIN logic
const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const userExist = await User.findOne({ email });
        if (!userExist) {
            return res.status(400).json({ message: "Invalid credentials" });
        }
        // const isMatch = await bcrypt.compare(password, userExist.password);
        const isMatch = await userExist.comparePassword(password);
        if (!isMatch) {
            res.status(401).json({ message: "Invalid email or password" });
        }
        else {
            res
                .status(201)
                .json({
                    msg: "Login Successful!!",
                    token: await userExist.generateToken(),
                    userId: userExist._id.toString()
                });
        }

    }
    catch (error) {
        req.status(400).json({ msg: "Internal server error" });
    }
}

// User logic
const user = async (req, res) => {
    try {
        const userData = req.user;
        console.log(userData);
        return res.status(200).json({ userData });
    }
    catch (error) {
        console.log(`error from user Route ${error} `);

    }
}

module.exports = {
    home,
    register,
    login,
    user
};
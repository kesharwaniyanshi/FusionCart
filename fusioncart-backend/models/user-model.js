const mongoose = require("mongoose");
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const userSchema = new mongoose.Schema({
    firstname: {
        type: String,
        required: true,
    },
    lastname: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    phoneNumber: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    isHost: {
        type: Boolean,
        default: false,
    },
});

// To secure password by hashing
userSchema.pre("save", async function (next) {
    // console.log("pre method",this);
    const user = this;
    if (!user.isModified("password")) {
        next();
    }
    try {
        const saltRound = await bcrypt.genSalt(10);
        const hash_password = await bcrypt.hash(user.password, saltRound);
        user.password = hash_password;
    }
    catch (error) {
        next(error);
    }
});
// password matching function
userSchema.methods.comparePassword = async function (password) {
    return bcrypt.compare(password, this.password);
}
// registration function
userSchema.methods.generateToken = async function () {
    try {
        // console.log(process.env.JWT_SECRET_KEY);

        return jwt.sign({
            userId: this._id.toString,
            email: this.email,
            isHost: this.isHost,
        }
            , process.env.JWT_SECRET_KEY, {
            expiresIn: "30d"
            ,
        });
    }
    catch (error) {
        console.log(error);
    }
}


const User = mongoose.model("User", userSchema);
module.exports = User;
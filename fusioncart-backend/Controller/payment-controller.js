const Razorpay = require("razorpay");
const crypto = require("crypto");

const razorpay = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET,
});

exports.createOrder = async (req, res) => {
    const { amount } = req.body;

    try {
        const options = {
            amount: amount * 100, // in paise
            currency: "INR",
            receipt: `rcpt_${Date.now()}`,
        };

        const order = await razorpay.orders.create(options);
        return res.status(200).json({ success: true, orderId: order.id });
    } catch (error) {
        return res.status(500).json({ success: false, error: error.message });
    }
};

const { z } = require("zod");

const loginSchema = z.object({
    email: z
        .string({ required_error: "Email is required" })
        .trim()
        .min(3, { message: "Email must have atleast 3 characters" })
        .max(255, { message: "Email must have atmax 255 characters" }),
    password: z
        .string({ required_error: "Password is required" })
        .min(3, { message: "Password must have atleast 3 characters" })
        .max(255, { message: "Password must have atmax 255 characters" })
});

const signupSchema = loginSchema.extend({
    name: z
        .string({ required_error: "Name is required" })
        .trim()
        .min(3, { message: "Name must have atleast 3 characters" })
        .max(255, { message: "Name must have atmax 255 characters" }),

    phone: z
        .string({ required_error: "Contact is required" })
        .trim()
        .min(10, { message: "Contact must have atleast 10 characters" })
        .max(12, { message: "Contact must have atmax 12 characters" }),
});



module.exports = { signupSchema, loginSchema };
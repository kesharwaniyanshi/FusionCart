// const signupSchema=require("../validators/auth-validators");
const validate = (schema) => async (req, res, next) => {
    try {
        const parseBody = await schema.parseAsync(req.body);
        req.body = parseBody;
        next();
    }
    catch (err) {
        const message = "Fill the details properly";
        const extraDetails = err.errors[0].message;
        const status = 400;
        const error = {
            status, message, extraDetails
        }

        // console.log(message);
        // res.status(400).json({ msg: message });
        next(error);
    }
}

module.exports = validate;
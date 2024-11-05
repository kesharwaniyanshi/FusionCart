import axios from 'axios';

const URL = "";
// const URL = "http://localhost:5000";

export const authenticateSignup = async (data) => {
    try {
        return await axios.post(`${URL}/signup`, data);
    } catch (error) {
        console.log("Error while calling SignUp API", error);
        return error.response; // Return the error response for better debugging
    }
}
export const authenticateLogin = async (data) => {
    try {
        return await axios.post(`${URL}/login`, data);

    } catch (error) {
        console.log("Error while calling Login API", error);
        return error.response; // Return the error response for better debugging
    }
}
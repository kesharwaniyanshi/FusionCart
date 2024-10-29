import { Box, Dialog, TextField, Button, Typography, styled } from "@mui/material";
import { useState, useContext } from "react";
import { DataContext } from "../../context/DataProvider";
import { authenticateSignup } from "../../service/api";

const Component = styled(Box)`
height: 70vh;
width : 90vh
`;
const Image = styled(Box)`
background: RGB(43,99,86);
height: 82.3%;
width: 35%;
padding: 45px 35px
`;

const Wrapper = styled(Box)`
display: flex;
flex-direction: column;
padding: 25px 35px;
flex: 1;
& > div, & > button, & > p{
    margin-top: 20px;

}
`;

const LoginButton = styled(Button)`
text-transform: none;
background:rgb(43,99,86);
color: #fff;    
height: 48px;
border: 2px;

`;

const RequestOTP = styled(Button)`
text-transform: none;
background: #EEE9D1;
color: black;
height: 48px;
border: 2px;
box-shadow: 0 2px 4px 0 rgb(0 0 0/20%);
`;

const Text = styled(Typography)`
font-size: 12px;
color: #878787;
`;

const CreateAccount = styled(Typography)`
font-size:13px;
text-align: center;
color: rgb(43,99,86);
font-weight: bold;
cursor: pointer
`;

const accountInitialValues = {
    login: {
        view: "login",
        heading: "Login",
        subHeading: "Get access to your Orders, Wishlists and Recommendations"
    },
    signup: {
        view: "signup",
        heading: "Looks like you are new here!",
        subHeading: 'Sign up with your mobile number to get started'
    }
}

const signupInitialValue = {
    firstname: "",
    lastname: "",
    email: "",
    password: "",
    phoneNumber: ""
}
const loginInitialValue = {

    email: "",
    password: "",

}
const LoginDialog = ({ open, setOpen }) => {

    const [account, toggleAccount] = useState(accountInitialValues.login);
    const [signup, setSignup] = useState(signupInitialValue);
    const { setAccount } = useContext(DataContext);
    const [login, setLogin] = useState(loginInitialValue);


    const handleClose = () => {
        setOpen(false);
        toggleAccount(accountInitialValues.login);
    }

    const toggleSignUp = () => {
        toggleAccount(accountInitialValues.signup);
    }

    const onInputChange = (e) => {
        // console.log(e.target.value)   
        setSignup({ ...signup, [e.target.name]: e.target.value });
    }

    const signupUser = async () => {
        let response = await authenticateSignup(signup);
        if (!response) return;
        handleClose();
        setAccount(signup.firstname);
    }

    const onValueChange = (e) => {
        setLogin({ ...login, [e.target.name]: e.target.value });
    }
    const loginUser = () => {

    }

    return (
        <Dialog open={open} onClose={handleClose} PaperProps={{ sx: { maxWidth: "unset" } }}>
            <Component>
                <Box style={{ display: "flex", height: "100%" }}>
                    <Image>
                        <Typography variant="h5" style={{ color: "#FFF", fontWeight: 600 }}>{account.heading}</Typography>
                        <Typography style={{ marginTop: "30px", color: "#FFF", fontWeight: 600 }}>{account.subHeading}</Typography>
                        <img src="/images/online-shopping-discount.png" width={"100%"} style={{ marginTop: "70px" }} />
                    </Image>
                    {account.view === "login" ?
                        <Wrapper>
                            <TextField variant="standard" onChange={(e) => onValueChange(e)} name="email" label="Enter Email/Phone number" />
                            <TextField variant="standard" onChange={(e) => onValueChange(e)} name="password" label="Enter Password" />
                            <Text>By continuing, you agree to FusionCarts's Terms of Use and Privacy Policy.</Text>
                            <LoginButton onClick={() => loginUser()} >Login</LoginButton>
                            <Typography style={{ textAlign: "center" }}>OR</Typography>
                            <RequestOTP>Request OTP</RequestOTP>
                            <CreateAccount onClick={() => toggleSignUp()}>New to FusionCart? Create an account</CreateAccount>
                        </Wrapper>
                        :
                        <Wrapper>
                            <TextField variant="standard" onChange={(e) => onInputChange(e)} name='firstname' label='Enter Firstname' />
                            <TextField variant="standard" onChange={(e) => onInputChange(e)} name='lastname' label='Enter Lastname' />
                            <TextField variant="standard" onChange={(e) => onInputChange(e)} name='email' label='Enter Email' />
                            <TextField variant="standard" onChange={(e) => onInputChange(e)} name='password' label='Enter Password' />
                            <TextField variant="standard" onChange={(e) => onInputChange(e)} name='phone' label='Enter Phone' />
                            <LoginButton onClick={() => signupUser()} >Continue</LoginButton>
                        </Wrapper>
                    }
                </Box>
            </Component>
        </Dialog>
    )
};

export default LoginDialog;
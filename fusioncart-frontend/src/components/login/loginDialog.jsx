import { Box, Dialog, TextField, Button, Typography, styled } from "@mui/material";
import { useState } from "react";

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
        heading:"Login",
        subHeading:"Get access to your Orders, Wishlists and Recommendations"
    },
    signup: {
        view: "signup",
        heading: "Looks like you are new here!",
        subHeading: 'Sign up with your mobile number to get started'
    }
}

const signupInitialValue={
    firstname:'',
    lastname:"",
    email:"",
    password:"",
    phoneNumber:""
}
const LoginDialog = ({ open, setOpen }) => {

    const [account, toggleAccount] = useState(accountInitialValues.login);
    const [signup,setSignup]=useState(signupInitialValue);


    const handleClose = () => {
        setOpen(false);
        toggleAccount(accountInitialValues.login);
    }

    const toggleSignUp = () => {
        toggleAccount(accountInitialValues.signup);
    }

    const onInputChange=(e)=>{
        // console.log(e.target.value)   
        setSignup({...signup,[e.target.name]:e.target.value});
    }

    const signupUser=async()=>{
        // API call to signup user
      let response= await authenticateSignup(signup);
        // console.log(response    )
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
                            <TextField variant="standard" label="Enter Email/Phone number" />
                            <TextField variant="standard" label="Enter Password" />
                            <Text>By continuing, you agree to FusionCarts's Terms of Use and Privacy Policy.</Text>
                            <LoginButton >Login</LoginButton>
                            <Typography style={{ textAlign: "center" }}>OR</Typography>
                            <RequestOTP>Request OTP</RequestOTP>
                            <CreateAccount onClick={() => toggleSignUp()}>New to FusionCart? Create an account</CreateAccount>
                        </Wrapper>
                        :
                        <Wrapper>
                            <TextField variant="standard" label="Enter First Name"  name="firstname" onChange={(e)=>onInputChange(e)} />
                            <TextField variant="standard" label="Enter Last Name" name="lastname" onChange={(e) => onInputChange(e)} />
                            <TextField variant="standard" label="Enter Email" name="email" onChange={(e) => onInputChange(e)} />
                            <TextField variant="standard" label="Enter Password" name="password" onChange={(e) => onInputChange(e)} />
                            <TextField variant="standard" label="Enter Phone Number" name="phoneNumber" onChange={(e) => onInputChange(e)} />

                            <LoginButton onClick={()=>signupUser()}>Continue</LoginButton>
                        </Wrapper>
                    }
                </Box>
            </Component>
        </Dialog>
    )
};

export default LoginDialog;
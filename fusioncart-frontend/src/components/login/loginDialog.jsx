import { Box, Dialog, TextField, Button, Typography, styled } from "@mui/material";
import { useState, useContext, useEffect } from "react";
import { DataContext } from "../../context/DataProvider";
import { authenticateSignup, authenticateLogin } from "../../service/api";
import { jwtDecode } from "jwt-decode";

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

const Error = styled(Typography)`
font-size:10px;
color: #FF6161;
line-height:0;
margin-top:10px;
font-weight:500
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
    const [error, setError] = useState(false);
    const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID;

    const handleClose = () => {
        setOpen(false);
        toggleAccount(accountInitialValues.login);
        setError(false);
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
    const loginUser = async () => {
        let response = await authenticateLogin(login);
        console.log(response.data);
        if (response.status === 201) {
            handleClose();
            setAccount(response.data.firstname);
        }
        else {
            setError(true);
            // setLogin({...login, password: "" });
            // console.log("Invalid credentials");
        }
    }
    const [user, setUser] = useState({});
    function handleCallbackresponse(response) {
        console.log("Encoded JWT ID token: ", response.credential);
        const userObject = jwtDecode(response.credential);
        console.log("Decoded JWT ID token: ", userObject);

        setUser(userObject);
        setAccount(userObject.name); // Save user name in context

        document.getElementById("signInDiv").style.display = "none";
    }


    function handleSignOut() {
        setUser({});
        setAccount(null);
        window.google.accounts.id.disableAutoSelect();
        document.getElementById("signInDiv").style.display = "flex";
    }


    // useEffect(() => {
    //     const loadGoogleScript = () => {
    //         if (window.google) {
    //             window.google.accounts.id.initialize({
    //                 client_id: "294014824025-50eid1q5sjo9o8fk0ncmheteja229r4m.apps.googleusercontent.com",
    //                 callback: handleCallbackresponse,
    //             });

    //             window.google.accounts.id.renderButton(
    //                 document.getElementById("signInDiv"),
    //                 { size: "large", theme: "outline" }
    //             );
    //         } else {
    //             console.error("Google API script not loaded.");
    //         }
    //     };

    //     loadGoogleScript();
    // }, []);
    // useEffect(() => {
    //     const loadGoogleScript = () => {
    //         if (!document.getElementById("google-script")) {
    //             const script = document.createElement("script");
    //             script.src = "https://accounts.google.com/gsi/client";
    //             script.id = "google-script";
    //             script.async = true;
    //             script.defer = true;
    //             script.onload = initializeGoogleSignIn;
    //             document.body.appendChild(script);
    //         } else {
    //             setTimeout(() => initializeGoogleSignIn(), 500);

    //         }
    //     };

    //     const initializeGoogleSignIn = () => {
    //         const signInDiv = document.getElementById("signInDiv");

    //         if (window.google && signInDiv) {
    //             console.log("Rendering Google button...");
    //             window.google.accounts.id.initialize({
    //                 client_id: "294014824025-50eid1q5sjo9o8fk0ncmheteja229r4m.apps.googleusercontent.com",
    //                 callback: handleCallbackresponse,
    //             });
    //             window.google.accounts.id.renderButton(signInDiv, { size: "large", theme: "outline" });
    //         } else {
    //             console.error("Google API is not available or signInDiv not found");
    //         }
    //     };

    //     loadGoogleScript();
    // }, []);
    useEffect(() => {
        const initializeGoogleSignIn = () => {
            const signInDiv = document.getElementById("signInDiv");

            if (!window.google) {
                console.error("Google API is not available. Make sure the script has loaded.");
                return;
            }

            if (!signInDiv) {
                console.error("signInDiv not found. Ensure that <div id='signInDiv'></div> exists in the JSX.");
                return;
            }

            console.log("Rendering Google sign-in button...");
            window.google.accounts.id.initialize({
                client_id: GOOGLE_CLIENT_ID,
                callback: handleCallbackresponse,
            });
            window.google.accounts.id.renderButton(signInDiv, { size: "large", theme: "outline" });
        };
        if (window.google) {
            initializeGoogleSignIn();
        } else {
            const interval = setInterval(() => {
                if (window.google) {
                    clearInterval(interval);
                    initializeGoogleSignIn();
                }
            }, 500);
        }
    }, []);




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
                            <TextField variant="standard" onChange={(e) => onValueChange(e)} name="email" label="Enter Email" />
                            <TextField variant="standard" onChange={(e) => onValueChange(e)} name="password" label="Enter Password" />
                            {error && <Error>Please enter valid email or password</Error>}
                            <Text>By continuing, you agree to FusionCarts's Terms of Use and Privacy Policy.</Text>
                            <LoginButton onClick={() => loginUser()} >Login</LoginButton>
                            <Typography style={{ textAlign: "center" }}>OR</Typography>
                            <RequestOTP>Request OTP</RequestOTP>
                            <CreateAccount onClick={() => toggleSignUp()}>New to FusionCart? Create an account</CreateAccount>
                            <div id="signInDiv"
                                style={{ display: "flex", justifyContent: "center", marginTop: "20px" }}>
                            </div>


                            {/* <div div id="signInDiv" style={{ display: "flex", justifyContent: "center", marginTop: "20px" }}></div> */}
                        </Wrapper>

                        :
                        <Wrapper>
                            <TextField variant="standard" onChange={(e) => onInputChange(e)} name='firstname' label='Enter Firstname' />
                            <TextField variant="standard" onChange={(e) => onInputChange(e)} name='lastname' label='Enter Lastname' />
                            <TextField variant="standard" onChange={(e) => onInputChange(e)} name='email' label='Enter Email' />
                            <TextField variant="standard" onChange={(e) => onInputChange(e)} name='password' label='Enter Password' />
                            <TextField variant="standard" onChange={(e) => onInputChange(e)} name='phoneNumber' label='Enter Phone' />
                            <LoginButton onClick={() => signupUser()} >Continue</LoginButton>
                        </Wrapper>
                    }
                </Box>
            </Component>
        </Dialog >
    )
};

export default LoginDialog;
// import { Box, Typography, IconButton, Badge, Button, styled } from "@mui/material";
// import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
// import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
// import AccountCircleIcon from "@mui/icons-material/AccountCircle";
// import LoginDialog from "../login/loginDialog";
// import { useState, useContext } from "react";
// import { DataContext } from "../../context/DataProvider";
// import Profile from "./Profile";
// import Cart from "../cart/Cart";
// import { Link } from "react-router-dom";

// const CustomButtonWrapper = styled(Box)(({ theme }) => ({
//     margin: "0 5% 0 auto",
//     [theme.breakpoints.down("md")]: {
//         display: "none",
//     }
// }));

// const Container = styled(Link)(({ theme }) => ({
//     display: "flex",
//     [theme.breakpoints.down("md")]: {
//         display: "block"
//     }
// }));

// const CustomButtons = ({ drawer }) => {
//     const [open, setOpen] = useState(false);
//     const { account, setAccount } = useContext(DataContext);

//     const openDialog = () => {
//         setOpen(true);
//     };

//     const handleCart = () => {
//         // console.log("Cart clicked");
//         return (<Cart />);
//     }

//     return (
//         <CustomButtonWrapper style={{ display: drawer ? "block" : undefined }}>
//             <Box display="flex" flexDirection={drawer ? "column" : "row"} alignItems="center" gap={drawer ? 1 : 6}>
//                 {/* Sign In Section */}
//                 {account ? (
//                     <Profile account={account} setAccount={setAccount} />
//                 ) : (
//                     <Button
//                         onClick={() => openDialog()}
//                         variant="outlined"
//                         color="white"
//                         sx={{
//                             '&:hover': {
//                                 backgroundColor: 'rgba(255, 255, 255, 0.1)',
//                                 color: 'whitesmoke'
//                             }
//                         }}
//                     >
//                         <AccountCircleIcon fontSize="small" />
//                         <Box ml={0.5}>
//                             <Typography fontSize="1rem" lineHeight={1.5} textTransform={"none"}>
//                                 Login
//                             </Typography>
//                         </Box>
//                     </Button>
//                 )}

//                 {/* Reorder Section */}
//                 <Box display="flex" alignItems="center">
//                     <FavoriteBorderIcon fontSize="small" />
//                     <Box ml={0.5}>
//                         <Typography fontSize="1" fontWeight="bold" lineHeight={1}>
//                             Wishlist
//                         </Typography>
//                     </Box>
//                 </Box>

//                 {/* Cart Section */}
//                 <Container to="/cart">
//                     <IconButton style={{ color: "whitesmoke" }} onClick={handleCart}>
//                         <Badge badgeContent={0} color="error">
//                             <ShoppingCartIcon fontSize="medium" />
//                         </Badge>
//                     </IconButton>
//                     <Box ml={0.5}>
//                         <Typography fontSize="1" lineHeight={1} style={{ color: "whitesmoke", textDecoration: "none" }} ml={0.5} >
//                             Cart
//                         </Typography>
//                     </Box>
//                     {/* <Typography fontSize="0.875rem" style={{ marginTop: "-8px" }}>Cart</Typography> */}
//                 </Container>

//                 <LoginDialog open={open} setOpen={setOpen} />
//             </Box>
//         </CustomButtonWrapper>
//     );
// };

// export default CustomButtons;
import { Box, Typography, IconButton, Badge, Button, styled } from "@mui/material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import LoginDialog from "../login/loginDialog";
import { useState, useContext } from "react";
import { DataContext } from "../../context/DataProvider";
import Profile from "./Profile";
import Cart from "../cart/Cart";
import { Link } from "react-router-dom";
import CartItem from "../cart/CartItem";
import { useSelector } from "react-redux";

const CustomButtonWrapper = styled(Box)(({ theme }) => ({
    margin: "0 5% 0 auto",
    [theme.breakpoints.down("md")]: {
        display: "none",
    },
}));

const StyledContainer = styled(Link)(({ theme }) => ({
    display: "flex",
    alignItems: "center",
    textDecoration: "none",
    color: "inherit",
    transition: "color 0.3s ease",
    '&:hover': {
        color: "#ffcc00", // Light yellow hover effect
    },
    [theme.breakpoints.down("md")]: {
        display: "block",
    },
}));

const StyledIconButton = styled(IconButton)({
    color: "whitesmoke",
    transition: "transform 0.2s ease-in-out",
    '&:hover': {
        transform: "scale(1.1)",
    },
});

const CustomButtons = ({ drawer }) => {
    const [open, setOpen] = useState(false);
    const { account, setAccount } = useContext(DataContext);

    const { cartItems } = useSelector(state => state.cart);

    const openDialog = () => {
        setOpen(true);
    };

    return (
        <CustomButtonWrapper style={{ display: drawer ? "block" : undefined }}>
            <Box display="flex" flexDirection={drawer ? "column" : "row"} alignItems="center" gap={drawer ? 1 : 6}>
                {/* Sign In Section */}
                {account ? (
                    <Profile account={account} setAccount={setAccount} />
                ) : (
                    <Button
                        onClick={openDialog}
                        variant="outlined"
                        sx={{
                            color: "whitesmoke",
                            borderColor: "whitesmoke",
                            '&:hover': {
                                backgroundColor: "rgba(255, 255, 255, 0.1)",
                                color: "#ffcc00",
                            },
                        }}
                    >
                        <AccountCircleIcon fontSize="small" />
                        <Box ml={0.5}>
                            <Typography fontSize="1rem" lineHeight={1.5} textTransform="none">
                                Login
                            </Typography>
                        </Box>
                    </Button>
                )}

                {/* Wishlist Section */}
                <Box display="flex" alignItems="center" gap={0.5}>
                    <FavoriteBorderIcon fontSize="small" />
                    <Typography fontSize="1rem" fontWeight="bold">
                        Wishlist
                    </Typography>
                </Box>

                {/* Cart Section */}
                <StyledContainer to="/cart">
                    <StyledIconButton>
                        <Badge badgeContent={cartItems?.length} color="primary">
                            <ShoppingCartIcon fontSize="medium" />
                        </Badge>
                    </StyledIconButton>
                    <Typography fontSize="1rem" fontWeight="bold" >
                        Cart
                    </Typography>
                </StyledContainer>

                <LoginDialog open={open} setOpen={setOpen} />
            </Box>
        </CustomButtonWrapper>
    );
};

export default CustomButtons;

import { Box, Typography, IconButton, Badge, Button, styled } from "@mui/material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import LoginDialog from "../login/loginDialog";
import { useState, useContext } from "react";
import { DataContext } from "../../context/DataProvider";
import Profile from "./Profile";

const CustomButtonWrapper =styled(Box)(({theme})=>({
    margin:"0 5% 0 auto",
    [theme.breakpoints.down("md")]:{
        display:"none",
    }
}));

const CustomButtons = () => {

    const [open, setOpen] = useState(false);
    const { account,setAccount } = useContext(DataContext);

    const openDialog = () => {
        setOpen(true);
    }
    return (
        <CustomButtonWrapper>
        <Box display="flex" alignItems="center" gap={6}>

            {/* Sign In Section */}
            {account ? <Profile account={account} setAccount={setAccount}/> :
                <Button
                    onClick={() => openDialog()}
                    variant="outlined"
                    color="white"
                    sx={{
                        '&:hover': {
                            backgroundColor: 'rgba(255, 255, 255, 0.1)', // Change to your desired hover color
                            color: 'whitesmoke' // Optional: change text color on hover
                        }
                    }}
                >
                    <AccountCircleIcon fontSize="small" />
                    <Box ml={0.5} >
                        <Typography fontSize="1rem" lineHeight={1.5} textTransform={"none"}>
                            Login
                        </Typography>
                    </Box>

                </Button>
            }

            {/* Reorder Section */}
            <Box display="flex" alignItems="center">
                <FavoriteBorderIcon fontSize="small" />
                <Box ml={0.5}>
                    <Typography fontSize="1" lineHeight={1.5}>
                        Reorder
                    </Typography>
                    <Typography fontSize="1" fontWeight="bold" lineHeight={1}>
                        My Items
                    </Typography>
                </Box>
            </Box>

            {/* Cart Section */}
            <Box display="flex" flexDirection="column" alignItems="center">
                <IconButton style={{ color: "whitesmoke" }}>
                    <Badge badgeContent={0} color="error">
                        <ShoppingCartIcon fontSize="medium" />
                    </Badge>
                </IconButton>
                <Typography fontSize="0.875rem" style={{ marginTop: "-8px" }}>Cart</Typography>
            </Box>
            <LoginDialog open={open} setOpen={setOpen} />
        </Box>
        </CustomButtonWrapper>
    );
};

export default CustomButtons;

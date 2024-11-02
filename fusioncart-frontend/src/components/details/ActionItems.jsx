import { Box, Button, styled } from "@mui/material";
import FlashOnIcon from '@mui/icons-material/FlashOn';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';

const LeftContainer = styled(Box)(({ theme } )=> ({
    minWidth: "40%",
    padding: "40px 0 0 80px",
    [theme.breakpoints.down("lg")]:{
        padding:"20px 40px"
    }

}));

const StyledButton = styled(Button)(({ theme }) => ({
width:"48%",
height:"50px"   ,
borderRadius:"2px",    
[theme.breakpoints.down("lg")]: {
    width:"46%"
},
    [theme.breakpoints.down("sm")]: {
    width: "48%"
}
}));

const Image = styled('img')({
    padding: " 15px",
    width: "95%",

});

const ActionItem = ({ product }) => {
    return (
        <LeftContainer>
            <Box style={{
                paddin: "15px 20px",
                border: '1px solid #f0f0f0'
            }}>
                <Image src={product.image_url} alt="product image" />
            </Box>
            <StyledButton variant="contained" style={{ marginRight: 10, background: "#ff9f00" }}><ShoppingCartIcon />Add to Cart</StyledButton>
            <StyledButton variant="contained" style={{ background: "#fb541b" }}><FlashOnIcon />Buy Now</StyledButton>
        </LeftContainer>
    )
}
export default ActionItem;
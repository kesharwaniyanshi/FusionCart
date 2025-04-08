import { Box, Button, styled } from "@mui/material";
import FlashOnIcon from '@mui/icons-material/FlashOn';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { AddToCart } from "../../redux/actions/cartActions";
import { useContext, useState } from "react";
import { payUsingRazorpay } from "../../service/api";
import { PriceContext } from "../../context/PriceProvider";

const LeftContainer = styled(Box)(({ theme }) => ({
    minWidth: "40%",
    padding: "40px 0 0 80px",
    [theme.breakpoints.down("lg")]: {
        padding: "20px 40px"
    }

}));

const StyledButton = styled(Button)(({ theme }) => ({
    width: "48%",
    height: "50px",
    borderRadius: "2px",
    [theme.breakpoints.down("lg")]: {
        width: "46%"
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
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [quantity, setQuantity] = useState(1);
    const { product_id } = product;

    const { getPriceDetails } = useContext(PriceContext);
    const { actualPrice } = getPriceDetails(product);

    const addItemToCart = () => {
        dispatch(AddToCart(product_id, quantity));
        navigate('/cart');
    }
    const RAZORPAY_KEY_ID = process.env.REACT_APP_RAZORPAY_KEY_ID;

    const buyNow = async () => {
        const amount = actualPrice; // or product.discounted_price if applicable
        const response = await payUsingRazorpay(amount * 100); // amount in paise

        const options = {
            key: RAZORPAY_KEY_ID,// from Razorpay dashboard
            amount: amount * 100, // amount in paise
            currency: "INR",
            name: "FusionCart",
            description: `Purchase of ${product.title}`,
            order_id: response.id,
            handler: function (res) {
                alert("Payment Successful!");
                console.log("Razorpay Response:", res);
                // You can also call a success route on backend
            },
            prefill: {
                name: "Test User",
                email: "test@gmail.com",
                contact: "9999999999"
            },
            theme: {
                color: "#3399cc"
            }
        };
        if (!window.Razorpay) {
            console.error("Razorpay SDK not loaded");
        }


        const razor = new window.Razorpay(options);
        razor.open();
    };

    return (
        <LeftContainer>
            <Box style={{
                paddin: "15px 20px",
                border: '1px solid #f0f0f0'
            }}>
                <Image src={product.image_url} alt="product image" />
            </Box>
            <StyledButton variant="contained" onClick={() => addItemToCart()} style={{ marginRight: 10, background: "#ff9f00" }} ><ShoppingCartIcon />Add to Cart</StyledButton>
            <StyledButton variant="contained" onClick={() => buyNow()} style={{ background: "#fb541b" }}><FlashOnIcon />Buy Now</StyledButton>
        </LeftContainer>
    )
}
export default ActionItem;
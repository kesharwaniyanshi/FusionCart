import { Box, Typography, styled,Button } from "@mui/material";
import { PriceContext } from "../../context/PriceProvider";
import { useContext } from "react";
import { payUsingRazorpay } from "../../service/api";

const Header = styled(Box)`
    background-color: #ffffff;
    padding: 15px 24px;
   border-bottom: 1px solid #f0f0f0;
`;
const Heading = styled(Typography)`
    color: #878787;
`;
const Container = styled(Box)`
    background: #fff;
    padding: 15px 24px;
    &>p{
    font-size:14px;
    margin-bottom:20px;
}
`;

const Price = styled(Box)`
float: right;

`;
const ButtonWrapper = styled(Box)`
display: flex;
flex-direction: column;
align-items: center;
padding-top:30px;
width: 100%;
@media (max-width: 1200px ,min-width: 900px) {
    padding-top: 40px;
    width: 100%;
}

`;

const StyledButton = styled(Button)`
display: flex;
${'' /* margin-left: auto; */}
background: #fb541b;
border-radius: 2px;
color: #fff;
width: 100%;
height: 51px;

`




const TotalView = ({ cartItems }) => {

    // console.log(cartItems);
    const { getPriceDetails } = useContext(PriceContext);
    // const { actualPrice, randomPrice, discountPercentage } = getPriceDetails(cartItems[0]);
    const totalPrice = cartItems?.reduce((acc, item) => {
        const { actualPrice } = getPriceDetails(item);
        return acc + actualPrice* item.quantity;
    }, 0);
    const totalDiscount = cartItems?.reduce((acc, item) => {
        const { randomPrice } = getPriceDetails(item);
        const { actualPrice } = getPriceDetails(item);

        return acc + (randomPrice - actualPrice)*item.quantity;
    }, 0);

    const RAZORPAY_KEY_ID = process.env.REACT_APP_RAZORPAY_KEY_ID; // Ensure this is set in your .env file

    const handlePlaceOrder = async () => {
        let totalAmount = totalPrice - 50; // Assuming a flat discount of ₹50 for simplicity
        // cartItems.forEach(item => {
        //     totalAmount += item.price * item.quantity; // adjust based on your logic
        // });

        const response = await payUsingRazorpay(totalAmount * 100);
        

        const options = {
            key:RAZORPAY_KEY_ID, // from Razorpay dashboard
            amount: totalAmount*100,
            currency: "INR",
            name: "FusionCart",
            description: `Order for ${cartItems.length} items`,
            order_id: response.id,
            handler: function (res) {
                alert("Payment Successful!");
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

        const razor = new window.Razorpay(options);
        razor.open();
    };

    return (
        <Box>
            <Header>
                <Heading>
                    PRICE DETAILS
                </Heading>
            </Header>
            <Container>
                <Typography>
                    Price ({cartItems?.length ?? 0} {cartItems?.length === 1 ? "item" : "items"}) <Price > ₹{(totalPrice).toFixed(2)}</Price>
                </Typography>
                <Typography>
                    Discount <Price style={{ color: "#388E3C" }}> -₹{(totalDiscount).toFixed(2)}</Price>
                </Typography>
                <Typography>
                    Coupons for you  <Price style={{ color: "#388E3C" }}> -₹50</Price>
                </Typography>
                <Typography>
                    Delivery Charges <Price style={{ color: "#388E3C" }}> FREE</Price>
                </Typography>
                <Typography variant="h6" >
                    Total Amount <Price> ₹{(totalPrice - 50).toFixed(2)}</Price>
                </Typography>
                <ButtonWrapper>
                    <StyledButton onClick={handlePlaceOrder}>Place Order</StyledButton>
                </ButtonWrapper>
            </Container>
        </Box>
    )
}

export default TotalView;
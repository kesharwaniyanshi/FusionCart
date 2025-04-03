import { Box, Typography, styled } from "@mui/material";
import { PriceContext } from "../../context/PriceProvider";
import { useContext } from "react";


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

const Price= styled(Box)`
float: right;

`;



const TotalView = ({ cartItems }) => {
    const { getPriceDetails } = useContext(PriceContext);
    // const { actualPrice, randomPrice, discountPercentage } = getPriceDetails(cartItems[0]);
    const totalPrice = cartItems?.reduce((acc, item) => {
        const { actualPrice } = getPriceDetails(item);
        return acc + actualPrice;
    }, 0);
    const totalDiscount = cartItems?.reduce((acc, item) => {
        const { randomPrice } = getPriceDetails(item);
        const { actualPrice } = getPriceDetails(item);

        return acc + (randomPrice - actualPrice);
    }, 0);

    return (
        <Box>
            <Header>
                <Heading>
                    PRICE DETAILS
                </Heading>
            </Header>
            <Container>
                <Typography>
                    Price ({cartItems?.length ?? 0} {cartItems?.length === 1 ? "item" : "items"}) <Price > ₹{totalPrice}</Price>
                </Typography>
                <Typography>
                    Discount <Price style={{ color: "#388E3C" }}> -₹{totalDiscount}</Price>
                </Typography>
                <Typography>
                    Coupons for you  <Price style={{ color: "#388E3C" }}> -₹50</Price>
                </Typography>
                <Typography>
                    Delivery Charges <Price style={{ color: "#388E3C" }}> FREE</Price>
                </Typography>
                <Typography variant="h6" >
                    Total Amount <Price> ₹{totalPrice - 50}</Price>
                </Typography>
            </Container>
        </Box>
    )
}

export default TotalView;
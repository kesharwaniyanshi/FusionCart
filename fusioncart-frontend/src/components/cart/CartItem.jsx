import { Box, Button, styled, Typography } from "@mui/material";
import { addEllipsis } from "../../utils/common-utils";
import { GroupedButton } from "./ButtonGroup";
import PriceProvider, { PriceContext } from "../../context/PriceProvider";
import { RemoveFromCart } from "../../redux/actions/cartActions";
import { useDispatch } from "react-redux";
import { useContext } from "react";
import { Link } from "react-router-dom";
const Component = styled(Box)`
border-top:1px solid #f0f0f0;
display:flex;
background-color: #fff;
`;

const Image = styled("img")`
width:130px;
height: ;
`;
const LeftComponent = styled(Box)`
margin:20px;
display:flex;
    flex-direction:column;
`;

const SmallText = styled(Typography)`
font-size:14px;
color:#878787;
margin-top:10px;
`;


const Remove = styled(Button)`
margin-top:20px;
font-size:14px;
font-weight:600;
color:#000;
`;

const CartItem = ({ item }) => {
    const { getPriceDetails } = useContext(PriceContext);
    const { actualPrice, randomPrice, discountPercentage } = getPriceDetails(item);

    const dispatch = useDispatch();
    const removeFromCart = (id) => {
        dispatch(RemoveFromCart(id));
    }

    return (
        <Component>
            <LeftComponent>
                <Image src={item.image_url} alt="product" />
                <GroupedButton />
            </LeftComponent>
            <Box style={{ margin: "20px" }}>
                <Link to={`/product/${item.product_id}`} style={{ textDecoration: "none", color: "inherit" }}>
                    <Typography>{item.brand} {addEllipsis(item.product_name)}</Typography>
                    <SmallText>Seller : RetailNet </SmallText>
                    <Typography style={{ margin: "20px 0" }}>
                        <Box component={"span"} style={{ fontWeight: 600, fontSize: 18 }}>₹{actualPrice}</Box>&nbsp;&nbsp;&nbsp;
                        <Box component={"span"} style={{ color: "#878787" }}><strike>₹{randomPrice}</strike></Box>&nbsp;&nbsp;&nbsp;
                        <Box component={"span"} style={{ color: '#388E3C' }}> ({discountPercentage}% OFF)</Box>&nbsp;&nbsp;&nbsp;
                    </Typography>
                </Link>
                <Remove onClick={() => removeFromCart(item.product_id)}>REMOVE</Remove>
            </Box>
        </Component>
    )
}
export default CartItem;
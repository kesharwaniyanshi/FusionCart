import { ButtonGroup, Button, styled } from "@mui/material"
import { useDispatch } from "react-redux";
import { RemoveFromCart, UpdateItemQuantity } from "../../redux/actions/cartActions";
import { useState } from "react";

const Component = styled(ButtonGroup)`
margin-top : 25px;
`;

export const GroupedButton = ({ item }) => {
    // const [count, setCount] = useState(1);
    const count=item.quantity || 1;
    const dispatch = useDispatch();
   
    const handleIncrement = () => {
        dispatch(UpdateItemQuantity(item.product_id, count + 1));
        // setCount(count + 1);
    }
    const handleDecrement = () => {
        if (count < 1) {

            dispatch(RemoveFromCart(item.product_id));
        } else {
            dispatch(UpdateItemQuantity(item.product_id, count - 1));
            // setCount(count - 1);
          }
    }
    return (
        <Component>
            <Button onClick={handleDecrement}>-</Button>
            <Button>{count}</Button>
            <Button onClick={handleIncrement}>+</Button>
        </Component>
    )
}
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getProductDetails } from "../../redux/actions/productActions";
import { Box, Typography } from "@mui/material";
import ActionItem from "./ActionItems";


const DetailView = () => {

    const dispatch = useDispatch();
    // const id = useParams();

    // useEffect(() => {
    //     dispatch(getProductDetails(id.product_id));
    // }, [dispatch, id.product_id ]);
    const { product_id } = useParams(); // Destructure product_id

    const [loading, product] = useSelector(state => state.getProductDetails);
    useEffect(() => {
        if (product && product_id !== product.product_id)
            dispatch(getProductDetails(product_id));
    }, [dispatch, product_id, product, loading]);

    console.log(product);
    return (
        <Box>
            {
                product && Object.keys(product).length &&
                <Box>
                    <Box>       
                    <ActionItem product={product}/>
                    </Box>
                    <Box>
                        <Typography>
                            {product.product_name}
                        </Typography>                </Box>
                </Box>
            }
        </Box>
    )
}
export default DetailView;
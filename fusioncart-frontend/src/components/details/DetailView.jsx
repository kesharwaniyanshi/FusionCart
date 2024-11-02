import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getProductDetails } from "../../redux/actions/productActions";
import { Box, styled, Typography, Grid } from "@mui/material";
import ActionItem from "./ActionItems";
import ProductDetail from "./ProductDetail";


const Component = styled(Box)`
background:#f2f2f2;
margin-top:55px;
`;

const Container = styled(Grid)(({ theme }) => ({
    background: " #ffffff",
    display: "flex",
    [theme.breakpoints.down("md")]:{
    margin: 0
}

}));


const RightContainer = styled(Grid)`
margin-top: 50px;
padding-left: 30px;

`;


const DetailView = () => {

    const dispatch = useDispatch();
    // const id = useParams();

    // useEffect(() => {
    //     dispatch(getProductDetails(id.product_id));
    // }, [dispatch, id.product_id ]);
    const { product_id } = useParams(); // Destructure product_id

    const { loading, product } = useSelector(state => state.getProductDetails);
    console.log(product);
    useEffect(() => {
        if (product && product_id !== product.product_id)
            dispatch(getProductDetails(product_id));
    }, [dispatch, product_id, product, loading]);


    return (
        <Component>
            {
                product && Object.keys(product).length &&
                <Container container>
                    <Grid item lg={4} md={4} sm={8} xs={12}>
                        <ActionItem product={product} />
                    </Grid>
                    <RightContainer item lg={8} md={8} sm={8} xs={12}>

                        <ProductDetail product={product} />
                    </RightContainer>
                </Container>
            }
        </Component>
    )
}
export default DetailView;
import { Box, styled } from "@mui/material";
import Banner from "./banner";
import NavBar from "./NavBar";
import { useEffect } from "react";
import { getProducts } from "../../redux/actions/productActions";
import { useDispatch, useSelector } from "react-redux";

const Component = styled(Box)`
margin-top: 120px;
padding: 10px 10px;
background: #F8F8F8;
${'' /* background: RGB(43,99,86); */}
`;

const Home = () => {

    const { products } = useSelector(state => state.getProducts)
    // { products: [{}, {}, {}] }
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getProducts())
    }, [dispatch])
    return (
        <>
            <NavBar />
            <Component>
                <Banner />
            </Component>
        </>
    );
};
export default Home;
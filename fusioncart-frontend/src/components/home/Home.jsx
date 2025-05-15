import { Box, styled } from "@mui/material";
import Banner from "./banner";
import NavBar from "./NavBar";
import { useEffect } from "react";
import { getProducts } from "../../redux/actions/productActions";
import { useDispatch, useSelector } from "react-redux";
import Slide from "./slide";
import MidSection from "./MidSection";

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
            {/* <NavBar /> */}
            <Component>
                <Banner />
                <Slide products={products || []}  title="Deal of the Day" timer={true}  />
                <MidSection/>
                <Slide products={products || []}  title="Clothing"  timer={false}  />
                <Slide products={products || []} title="Baby Care"  timer={false} />
                <Slide products={products || []} title="Electronics" timer={false} />
                <Slide products={products || []} title="Household Essentials"  timer={false}/>
                <Slide products={products || []} title="Fitness Equipment"  timer={false}/>
                <Slide products={products || []} title="Beauty & Personal Care" timer={false} />
                <Slide products={products || []} title="Garden Supplies" timer={false}  />

            </Component>
        </>
    );
};
export default Home;
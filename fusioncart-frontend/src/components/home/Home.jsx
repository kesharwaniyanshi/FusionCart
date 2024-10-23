import { Box, styled } from "@mui/material";
import Banner from "./banner";
import NavBar from "./NavBar";

const Component=styled(Box)`
margin-top: 120px;
padding: 10px 10px;
background: #F8F8F8;
${'' /* background: RGB(43,99,86); */}
`;

const Home = () => {
    return (
        <>
            <NavBar />
            <Component>
            <Banner/>
            </Component>
        </>
    );
};
export default Home;
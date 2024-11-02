import { AppBar, Box, Toolbar, styled } from "@mui/material";
import Search from "./search";
import CustomButtons from "./customButtons";
import { Link } from "react-router-dom";

const StyledHeader = styled(AppBar)`
    background: RGB(43, 99, 86);
    ${'' /* height: 55px; */}
`;

const Component = styled(Link)`
    margin-left: 10%;
    display: flex;
    align-items: center; // Center items vertically
`;

const Header = () => {
    return (
        <StyledHeader>
            <Toolbar style={{ display: 'flex', justifyContent: 'space-evenly' }}>
                <Component to="/">
                    <img src="/images/fusioncart Logo.png" alt="Fusioncart Logo" style={{ width: 160 }} />
                </Component>
                <Search />
                <CustomButtons />
            </Toolbar>
        </StyledHeader>
    );
};

export default Header;

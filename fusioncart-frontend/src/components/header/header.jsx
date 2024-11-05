import { AppBar, Box, Toolbar, IconButton, styled, Drawer, List, ListItem} from "@mui/material";
import {Menu} from "@mui/icons-material"
import Search from "./search";
import CustomButtons from "./customButtons";
// import { MenuButton } from "./customButtons";
import { Link } from "react-router-dom";
import { useState } from "react";

const StyledHeader = styled(AppBar)`
    background: RGB(43, 99, 86);
    ${'' /* height: 55px; */}
`;

const Component = styled(Link)(({ theme }) => ({
    marginLeft: "10%",
    display: "flex",
    alignItems: "center", // Center items vertically
    [theme.breakpoints.down("md")]: {
        display: "none", // Hide the logo on medium and smaller screens
    }
}));
const MenuButton = styled(IconButton)(({ theme }) => ({
    display: "none",
    [theme.breakpoints.down("md")]: {
        display: "block",
    }

}));

const Header = () => {

    const [open,setOpen] =useState(false);
    
    const handleOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };
    
    const list = () => (
        <Box style={{width: 200 }} onClick={handleClose}>
            <List>
                <ListItem button>
                    <CustomButtons drawer={true} />
                </ListItem>
            </List>
        </Box>
        );
    return (
        <StyledHeader>
            <Toolbar style={{ display: 'flex', justifyContent: 'space-evenly' }}>
                <MenuButton color="inherit" onClick={handleOpen}>
                    <Menu/>
                </MenuButton>
                <Drawer open={open} onClose={handleClose}>
                     {list()}
                     {/* hello */}
                </Drawer>
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

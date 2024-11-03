import { AppBar, Box, Toolbar, IconButton, styled, Drawer, List, ListItem} from "@mui/material";
import {Menu} from "@mui/icons-material"
import Search from "./search";
import {CustomButtons, MenuButton, CustomButtonWrapper} from "./customButtons";
import { Link } from "react-router-dom";
import { useState } from "react";

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

    const [open,setOpen] =useState(false);
    
    const handleOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };
    
    const list = () => {
        <Box style={{width: 200 }} onClick={handleClose}>
            <List>
                <ListItem button>
                    <CustomButtons />
                </ListItem>
            </List>
        </Box>
    }
    return (
        <StyledHeader>
            <Toolbar style={{ display: 'flex', justifyContent: 'space-evenly' }}>
                <MenuButton color="inherit" onClick={handleOpen}>
                    <Menu/>
                </MenuButton>
                <Drawer open={open} onClose={handleClose}>
                     {list()}
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

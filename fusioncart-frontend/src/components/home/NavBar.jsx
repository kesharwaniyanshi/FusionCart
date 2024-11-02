import { AppBar, Toolbar, styled, Link, Box, Typography } from "@mui/material";
import Category from "./category";

const StyledHeader = styled(AppBar)(({ theme }) => ({
    background: "#F8F8F8",
    marginTop: "65px",
    height: "55px",
    [theme.breakpoints.down('lg')]: {
        margin: 0
    }
}));

const navLinks = [
    "Groceries",
    "Electronics",
    "Clothing",
    "Furniture",
    "Toys",
    "Stationery",
    "Sports Equipment",
    "Household Essentials",
    "Beauty & Personal Care",
    "Kitchen Appliances"
];

const NavBar = () => {
    return (
        <StyledHeader>
            <Toolbar>
                <Box display="flex" flexDirection="row" gap={1} alignItems="center" sx={{ flexWrap: "nowrap" }}>
                    <Category />
                    <Typography color="grey" fontSize="1.5rem" marginBottom={0.7}>|</Typography>
                    <Box display="flex" flexDirection="row" gap={3} fontSize="1rem" marginBottom={0.7}>
                        {navLinks.map((link) => (
                            <Link key={link} href="#" underline="hover" color="grey">
                                {link}
                            </Link>
                        ))}
                    </Box>
                </Box>
            </Toolbar>
        </StyledHeader>
    );
};

export default NavBar;

import { AppBar,styled, Typography } from "@mui/material";

const StyledFooter = styled(AppBar)`
    background: RGB(20, 99, 86);
    height: 35px;
    
`;

const Footer=()=>{
return(
    
    <StyledFooter position="static" >
    <Typography> </Typography>
    </StyledFooter>

    
)
}

export default Footer;
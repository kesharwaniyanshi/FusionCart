import PowerSettingsNewIcon from '@mui/icons-material/PowerSettingsNew';
import { useState } from "react";

const { Box, Typography, Menu, MenuItem, styled } = require("@mui/material")

const Component = styled(Menu)`
margin-top:5px;
`;

const Logout=styled(Typography)`
font-size:14px;
margin-left:20px;
`;

const Profile = ({ account,setAccount }) => {

    const [open, setOpen] = useState(false);
    const handleClick = (event) => {
        setOpen(event.currentTarget)
    }
    const handleClose = () => {
        setOpen(false);
    }
    const logoutUser=()=>{
        setAccount('');
    }
    return (
        <>
            <Box onClick={handleClick}>
                <Typography style={{ marginTop: 2 }}>{account}</Typography>
                <Component

                    anchorEl={open}
                    open={Boolean(open)}
                    onClose={handleClose}

                >
                    <MenuItem onClick={()=>{handleClose();logoutUser()}}>
                        <Logout>
                            <PowerSettingsNewIcon  fontSize='small'/>
                            Logout</Logout>
                    </MenuItem>

                </Component>
            </Box>
        </>
    )
}
export default Profile;
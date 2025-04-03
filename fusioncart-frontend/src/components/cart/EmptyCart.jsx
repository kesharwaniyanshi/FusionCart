import { Box, styled, Typography } from "@mui/material"

const Component=styled(Box)`
height: 70vh;
width:80%;
margin:80px 140px;
background:#fff;

`;

const Container=styled(Box)`
${'' /* display:flex;
flex-direction:column;
align-items:center; */}
text-align:center;
padding-top:70px;
`


const EmptyCart = () => {
return(
    <Component>
        <Container>
            <img src="/images/empty-cart.png" alt="empty" style={{width:'30%'}}/>
            <Typography>Your Cart is Empty!</Typography>
            <Typography>Add items to it now</Typography>
        </Container>
    </Component>
)
}
export default EmptyCart;
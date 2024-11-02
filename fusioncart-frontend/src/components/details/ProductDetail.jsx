import { Box, styled, Typography, Grid, Table, TableBody, TableRow, TableCell, TableHead, TableFooter } from "@mui/material";
import LocalOfferIcon from '@mui/icons-material/LocalOffer'; <LocalOfferIcon />


const SmallText = styled(Box)`
font-size:14px;
vertical-align:baseline;
&>p{
    font-size:14px;
    margin-top:10px;
}
`;

const StyledBadge = styled(LocalOfferIcon)`
margin-right:10px;
color:#00cc00;
font-size:15px;
`;

const ColumnText = styled(TableRow)`
font-size:14px;
vertical-align:baseline;
&> td{
    font-size:14px;
    margin-top:10px;
    border:none;
}
`;

const ProductDetail = ({ product }) => {

    const quantity = product.quantity;
    const actualPrice = product?.price || 0; // Default to 0 if price is undefined
    const randomPrice = parseFloat((actualPrice + Math.floor(Math.random() * (actualPrice * 0.5) + 1)).toFixed(2));

    const discountPercentage = randomPrice > 0
        ? Math.floor(((randomPrice - actualPrice) / randomPrice) * 100)
        : 0;

    const date = new Date(new Date().getTime() + (5 * 24 * 60 * 60 * 1000));
    return (
        <>
            <Typography style={{ fontSize: "23px", fontWeight: "500" }}>
                {product.brand} {product.product_name}
            </Typography>
            <Typography style={{ marginTop: 5, color: "#878787", fontSize: 14 }}>8 Ratings & 1 Reviews</Typography>
            <Typography>
                <Box component={"span"} style={{ fontSize: 25 }}>₹{actualPrice}</Box>&nbsp;&nbsp;&nbsp;
                <Box component={"span"} style={{ color: "#878787" }}><strike>₹{randomPrice}</strike></Box>&nbsp;&nbsp;&nbsp;
                <Box component={"span"} style={{ color: '#388E3C' }}> ({discountPercentage}% OFF)</Box>&nbsp;&nbsp;&nbsp;
            </Typography>
            <Typography>Available Offers</Typography>
            <SmallText>
                <Typography><StyledBadge /><span style={{ fontWeight: 500 }}>Bank Offer</span> 5% Unlimited Cashback on Flipkart Axis Bank Credit Card <span style={{ color: "blue", fontWeight: 300 }}> T&C</span></Typography>
                <Typography><StyledBadge /><span style={{ fontWeight: 500 }}>Bank Offer</span> Flat ₹120 off on HDFC Bank Credit Card EMI Txns on 6 and 9 months tenure, Min. Txn Value: ₹150 <span style={{ color: "blue", fontWeight: 300 }}>T&C</span></Typography>
                <Typography><StyledBadge /><span style={{ fontWeight: 500 }}>Bank Offer</span> Flat ₹150 off on HDFC Bank Credit Card EMI Txns on 12 months tenure, Min. Txn Value: ₹150 <span style={{ color: "blue", fontWeight: 300 }}>T&C</span></Typography>
                <Typography><StyledBadge /><span style={{ fontWeight: 500 }}>Bank Offer</span> 10% off up to ₹150 on HDFC Bank Credit Card EMI Txns on 24 months tenure, Min. Txn Value:₹150 <span style={{ color: "blue", fontWeight: 300 }}>T&C</span></Typography>
            </SmallText>
            <Table>
                <TableBody>
                    <ColumnText>
                        <TableCell style={{ color: "#878787" }}>Delivery</TableCell>
                        <TableCell style={{ fontWeight: 600 }}>Delivery by {date.toDateString()} | ₹40  </TableCell>
                    </ColumnText>
                    <ColumnText>
                        <TableCell style={{ color: "#878787" }}>Warranty</TableCell>
                        <TableCell style={{ fontWeight: 600 }}>No Warranty  </TableCell>
                    </ColumnText>
                    <TableHead style={{ fontWeight: 500 }}>Instore Product Information</TableHead>
                    <ColumnText>
                        <TableCell style={{ color: "#878787" }}>Floor</TableCell>
                        <TableCell style={{ fontWeight: 600 }}>{product.floor}  </TableCell>
                    </ColumnText>
                    <ColumnText>
                        <TableCell style={{ color: "#878787" }}>Section</TableCell>
                        <TableCell style={{ fontWeight: 600 }}>{product.section}  </TableCell>
                    </ColumnText>
                    <ColumnText>
                        <TableCell style={{ color: "#878787" }}>Availability</TableCell>
                        {quantity > 0 ? <TableCell style={{ fontWeight: 600, color: "#00cc00" }}>In Stock </TableCell> : <TableCell style={{ fontWeight: 600, color: "red" }}>Out of Stock </TableCell>}

                    </ColumnText>
                    <ColumnText>
                        <TableCell style={{ color: "#878787" }}>Quantity Available</TableCell>
                        <TableCell style={{ fontWeight: 600 }}>{product.quantity}</TableCell>
                    </ColumnText>
                    <ColumnText>
                        <TableCell style={{ color: "#878787" }}>Description</TableCell>
                        <TableCell >Discover the perfect blend of quality, functionality, and style with this versatile item. Carefully crafted to meet your everyday needs, it offers exceptional durability and ease of use, making it a valuable addition to your collection. Whether you’re seeking reliability for daily tasks or looking to elevate your experience with premium features, this item is designed to impress. Ideal for a wide range of settings and suitable for all users, it combines practicality with an appealing design. Enhance your lifestyle with this must-have item that brings both satisfaction and convenience to every moment</TableCell>
                    </ColumnText>
                </TableBody>
            </Table>

        </>
    )
}

export default ProductDetail;
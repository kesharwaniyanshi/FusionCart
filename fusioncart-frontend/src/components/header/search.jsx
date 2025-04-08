// import { Box, InputBase, styled, List, ListItem, Typography } from "@mui/material";
// import SearchIcon from '@mui/icons-material/Search';
// import { useEffect, useState } from "react";
// import { useSelector, useDispatch } from "react-redux";
// import { getProducts } from "../../redux/actions/productActions"
// import { Link } from "react-router-dom";
// // import { blue } from "@mui/material/colors";

// const SearchContainer = styled(Box)(({ theme }) => ({
//     background: '#F8F8F8',
//     width: '40%',
//     borderRadius: '30px',
//     marginLeft: '10px',
//     display: 'flex',
//     justifyContent: 'center', // Center the search bar
//     [theme.breakpoints.down('md')]: {
//         width: '8ed0%', // Full width on smaller screens
//         marginLeft: 0, // Remove margin on smaller screens
//         marginTop: '10px', // Optional: add some spacing on top
//     }
// }));

// const InputSearchBase = styled(InputBase)`
// padding-left:20px;
// width: 100%;
// `;
// const SectionTitle = styled(Typography)`
//  margin-top: 20px; font-weight: bold; 
//  position:absolute;
//  color:black;
//  `;

// const ListWrapper = styled(List)`
// position:absolute;
// background:#ffffff;
// color:#000;
// margin-top:40px;
// margin-left:15px;
// width:35%;
//   max-height: 50vh; // Limits the dropdown to half of the viewport height
//   z-index: 1300; // Ensures it stays on top of other elements
//   box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
//   border-radius: 4px; // Optional: rounded corners
//   padding: 10px 0; // Adds padding for better aesthetics
//   overflow-y: auto; // A
// `;
// const Search = () => {
//     const [text, setText] = useState('');

//     const { products } = useSelector(state => state.getProducts);
//     const dispatch = useDispatch();
//     useEffect(() => {
//         dispatch(getProducts())
//     }, [dispatch])

//     const getText = (text) => {
//         setText(text);
//     }

//     return (
//         <SearchContainer>
//             <InputSearchBase
//                 placeholder="Search for products, brands and more"
//                 onChange={(e) => getText(e.target.value)}
//                 value={text}
//             />
//             <Box style={{ color: "RGB(43, 99, 86)", padding: "5px" }}><SearchIcon /></Box>
//             {
//                 text && (
                    
//                         <ListWrapper>
//                             {
//                                 products.filter(product => (product.product_name.toLowerCase().includes(text.toLowerCase())) || product.brand.toLowerCase().includes(text.toLowerCase()) || product.category.toLowerCase().includes(text.toLowerCase())).map(product => (
//                                     <ListItem>

//                                         <Link to={`product/${product.product_id}`}
//                                             onClick={() => { setText('') }}
//                                             style={{ textDecoration: 'none', color: 'inherit' }}
//                                         >
//                                             <img src={product.image_url} alt={product.product_name} style={{ width: '40px', marginRight: '8px' }} />
//                                             {product.brand} {product.product_name}   <span style={{ color: "#878787", fontSize: "12px" }}>Category {product.category}</span>
//                                         </Link>
//                                     </ListItem>
//                                 )
//                                 )
//                             }
//                         </ListWrapper>



//                     )}


//         </SearchContainer>
//     )
// }

// export default Search;

import { Box, InputBase, styled, List, ListItem, Typography } from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getProducts } from "../../redux/actions/productActions";
import { Link } from "react-router-dom";

const SearchContainer = styled(Box)(({ theme }) => ({
    background: '#F8F8F8',
    width: '40%',
    borderRadius: '30px',
    marginLeft: '10px',
    display: 'flex',
    justifyContent: 'center',
    [theme.breakpoints.down('md')]: {
        width: '80%',
        marginLeft: 0,
        marginTop: '10px',
    }
}));

const InputSearchBase = styled(InputBase)`
    padding-left: 20px;
    width: 100%;
`;

const ListWrapper = styled(List)`
    position: absolute;
    background: #ffffff;
    color: #000;
    margin-top: 40px;
    margin-left: 15px;
    width: 35%;
    max-height: 50vh;
    z-index: 1300;
    box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
    border-radius: 4px;
    padding: 10px 0;
    overflow-y: auto;
`;

const SectionTitle = styled(Typography)`
    font-weight: bold;
    padding: 10px;
    background-color: #f0f0f0;
    color: #333;
`;

const HorizontalListContainer = styled(Box)`
    display: flex;
    overflow-x: auto;
    padding: 10px;
`;

const HorizontalListItem = styled(Box)`
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-right: 16px;
    width: 80px;
`;

const ProductImage = styled('img')`
    width: 60px;
    height: 60px;
    margin-bottom: 5px;
    border-radius: 4px;
`;

const Search = () => {
    const [text, setText] = useState('');
    const { products } = useSelector(state => state.getProducts);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getProducts());
    }, [dispatch]);

    const getText = (text) => {
        setText(text);
    };
    const getRandomProducts = (products, count) => {
        const shuffled = [...products].sort(() => 0.5 - Math.random()); // Shuffle the array
        return shuffled.slice(0, count); // Return the first 'count' items
    };
    const frequentlyPurchased = products.slice(17, 23);
    const previouslyPurchased = getRandomProducts(products, 5);

    return (
        <SearchContainer>
            <InputSearchBase
                placeholder="Search for products, brands and more"
                onChange={(e) => getText(e.target.value)}
                value={text}
            />
            <Box style={{ color: "RGB(43, 99, 86)", padding: "5px" }}>
                <SearchIcon />
            </Box>
            {text && (
                <ListWrapper>
                    {/* Frequently Purchased Together */}
                    <SectionTitle>Frequently Purchased Together</SectionTitle>
                    <HorizontalListContainer>
                        {frequentlyPurchased.map(product => (
                            <HorizontalListItem key={product.product_id}>
                                <ProductImage src={product.image_url} alt={product.product_name} />
                                <Link to={`product/${product.product_id}`}
                                    style={{textAlign:"center", textDecoration: 'none', color: 'inherit' }}
                                    onClick={() => setText('')}>
                                <Typography variant="caption" align="center">
                                    {product.brand} {product.product_name}
                                </Typography>
                                </Link>
                            </HorizontalListItem>
                        ))}
                    </HorizontalListContainer>

                    {/* Previously Purchased */}
                    <SectionTitle>Previously Purchased</SectionTitle>
                    <HorizontalListContainer>
                        {previouslyPurchased.map(product => (
                            <HorizontalListItem key={product.product_id}>
                                <ProductImage src={product.image_url} alt={product.product_name} />
                                <Link to={`product/${product.product_id}`} 
                                    style={{ textAlign: "center", textDecoration: 'none', color: 'inherit' }}
                                    onClick={() => setText('')}>
                                <Typography variant="caption" align="center">
                                    {product.brand} {product.product_name}
                                </Typography>
                                </Link>
                            </HorizontalListItem>
                        ))}
                    </HorizontalListContainer>

                    {/* Filtered Products */}
                    <SectionTitle>Similar Products</SectionTitle>
                    {products.filter(product =>
                        product.product_name.toLowerCase().includes(text.toLowerCase()) ||
                        product.brand.toLowerCase().includes(text.toLowerCase()) ||
                        product.category.toLowerCase().includes(text.toLowerCase())
                    ).map(product => (
                        <ListItem key={product.product_id}>
                            <Box display="flex" alignItems="center">
                                <ProductImage src={product.image_url} alt={product.product_name} />
                                <Link
                                    to={`product/${product.product_id}`}
                                    onClick={() => setText('')}
                                    style={{ textDecoration: 'none', color: 'inherit' }}
                                >
                                    {product.brand} {product.product_name}
                                    <span style={{ color: "#878787", fontSize: "12px" }}> - Category: {product.category}</span>
                                </Link>
                            </Box>
                        </ListItem>
                    ))}
                </ListWrapper>
            )}
        </SearchContainer>
    );
};

export default Search;

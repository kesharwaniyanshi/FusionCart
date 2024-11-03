import { Box, Button, Divider, styled, Typography } from "@mui/material";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import Countdown from "react-countdown";
import { Link } from "react-router-dom";


const responsive = {
    desktop: {
        breakpoint: { max: 3000, min: 1024 },
        items: 5
    },
    tablet: {
        breakpoint: { max: 1024, min: 464 },
        items: 2
    },
    mobile: {
        breakpoint: { max: 464, min: 0 },
        items: 1
    }
};

const Component = styled(Box)`
margin-top:10px;
background-color:#FFFFFF;

`;

const Deal = styled(Box)`
padding: 15px 20px;
display: flex;
;`

const Timer = styled(Box)`
display: flex;
align-items: center;
margin-left: 10px;
color: #7f7f7f;`;

const DealText = styled(Typography)`
font-size: 22px;
font-weight: 600;
margin-right: 25px;
line-height:32px;
`;


const ViewAllButton = styled(Button)`
margin-left:auto;
background-color: #2874f0;
border-radius: 2px;
font-size:13px;
font-weight:600;

`;

const Image = styled("img")`
width:auto;
height:150px;
`;

const Text = styled(Typography)`
font-size:14px;
margin-top:5px;

;`


const Slide = ({ products, title, timer }) => {
    const timerURL = 'https://static-assets-web.flixcart.com/www/linchpin/fk-cp-zion/img/timer_a73398.svg';
    const renderer = ({ hours, minutes, seconds }) => {
        return <Box variant="span">{hours}:{minutes}:{seconds} Left</Box>


    }
    const uniqueProducts = products.reduce((acc, product) => {
        if (!acc.find(item => item.product_name === product.product_name)) {
            acc.push(product);
        }
        return acc;
    }, []);
    return (
        <Component>
            <Deal>
                <DealText>{title}</DealText>
                {timer &&
                 <Timer>
                    <img src={timerURL} alt="timer" style={{ width: 24 }} />
                    <Countdown
                        date={Date.now() + 5.04e+7}
                        renderer={renderer}
                    />
                </Timer>
                }
                <ViewAllButton variant="contained" style={{ background: "RGB(43,99,86)"}}>
                    View All
                </ViewAllButton>
                
            </Deal>
            <Divider />

            <Carousel
                swipeable={false}
                draggable={false}
                infinite={true}
                autoPlay={true}
                autoPlaySpeed={3000}
                keyBoardControl={true}
                centerMode={true}
                containerClass="carousel-container"
                dotListClass="custom-dot-list-style"
                itemClass="carousel-item-padding-40-px"
                responsive={responsive}
            >
                {/* {products.map(product => (
                    <Box textAlign={"center"} style={{padding: "25px 15px"}}>
                    <Image src={product.image_url} alt="products" />
                    <Typography>{product.product_name}</Typography>
                    </Box>
                ))} */}

                {uniqueProducts.map(product => (
                    <Link key={product.product_id} to={`/product/${product.product_id}`} style={{textDecoration:"none"}}>
                    <Box key={product.product_id} textAlign={"center"} style={{ padding: "25px 15px" }}>
                        <Image src={product.image_url} alt="products" />
                        <Text style={{ fontWeight: 600, color: "#212121" }}>{product.product_name}</Text>
                        <Text style={{ color: "green" }}>Upto {(Math.floor(Math.random() * 18) + 1) * 5}% off</Text>
                        <Text style={{ color: "#7f7f7f", opacity: "0.6" }}>{product.category}</Text>
                    </Box>
                    </Link>
                ))}
            </Carousel>
        </Component>
    )
}

export default Slide;
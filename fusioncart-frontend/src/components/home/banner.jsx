import Carousel from "react-multi-carousel";
import 'react-multi-carousel/lib/styles.css';
import { bannerData } from "../../constants/data";
import { styled } from "@mui/material";

const Image = styled('img')(({theme})=>({
    width: '100%',
    height: 280,
    [theme.breakpoints.down('md')]:{
        objectFit:'cover',
        height: 180
    }
}));

const responsive = {
    desktop: {
        breakpoint: { max: 3000, min: 1024 },
        items: 1
    },
    tablet: {
        breakpoint: { max: 1024, min: 464 },
        items: 1
    },
    mobile: {
        breakpoint: { max: 464, min: 0 },
        items: 1
    }
};

// Add a styled div with margin-top
// const CarouselContainer = styled('div')({
//     marginTop: '120px', // Shift the carousel 120px from the top
// });

const Banner = () => {
    return (
        
            <Carousel
                swipeable={false}
                draggable={false}
                infinite={true}
                autoPlay={true}
                autoPlaySpeed={3000}
                keyBoardControl={true}
                slidesToSlide={1}
                containerClass="carousel-container"
                dotListClass="custom-dot-list-style"
                itemClass="carousel-item-padding-40-px"
                responsive={responsive}>
                {
                    bannerData.map(data => (
                        <Image src={data.url} alt="banner" key={data.url} />
                    ))
                }
            </Carousel>
        
    )
}
export default Banner;

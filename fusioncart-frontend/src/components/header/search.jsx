import { Box, colors, InputBase, styled } from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';
// import { blue } from "@mui/material/colors";

const SearchContainer = styled(Box)`
 background: #F8F8F8;
 width: 40%;
 border-radius: 30px;
 margin-left:10px;
 display: flex;

`;

const InputSearchBase = styled(InputBase)`
padding-left:20px;
width: 100%;

`;
const Search = () => {
    return (
        <SearchContainer>
            <InputSearchBase
                placeholder="Search for products, brands and more" />
            <Box style={{ color: "RGB(43, 99, 86)", padding: "5px" }}><SearchIcon /></Box>
        </SearchContainer>
    )
}

export default Search;
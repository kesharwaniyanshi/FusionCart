import * as React from 'react';
import { useTheme } from '@mui/material/styles';
import OutlinedInput from '@mui/material/OutlinedInput';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import GridViewIcon from '@mui/icons-material/GridView';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT *16 + ITEM_PADDING_TOP,
            width: 200,
        },
    },
};

const categories = [
    'Groceries',
    'Electronics',
    'Clothing',
    'Furniture',
    'Toys',
    'Stationery',
    'Sports Equipment',
    'Household Essentials',
    'Beauty & Personal Care',
    'Kitchen Appliances',
    'Books',
    'Automotive Accessories',
    'Pet Supplies',
    'Garden Supplies',
    'Baby Care',
    'Fitness Equipment'
];

function getStyles(category, selectedCategories, theme) {
    return {
        fontWeight: selectedCategories.includes(category)
            ? theme.typography.fontWeightMedium
            : theme.typography.fontWeightRegular,
    };
}

export default function Category() {
    const theme = useTheme();
    const [selectedCategories, setSelectedCategories] = React.useState([]);

    const handleChange = (event) => {
        const {
            target: { value },
        } = event;
        setSelectedCategories(
            // On autofill we get a stringified value.
            typeof value === 'string' ? value.split(',') : value,
        );
    };

    return (
        <div >
            <FormControl sx={{ m: 1, width: 200,mt: 0}}  >
                <Select
                    multiple
                    displayEmpty
                    value={selectedCategories}
                    onChange={handleChange}
                    input={<OutlinedInput />}
                    renderValue={(selected) => {
                        if (selected.length === 0) {
                            return <em style={{display: "flex", flexDirection:"row", gap:2}}>
                            <GridViewIcon/>Categories</em>;
                        }

                        return selected.join(', ');
                    }}
                    MenuProps={MenuProps}
                    inputProps={{ 'aria-label': 'Without label' }}
                    // style={{ height: "40px" }} 
                    sx={{
                        height: "40px",
                        border: "none", // Default border
                        borderRadius:"30px",
                        '&:hover': {
                            borderColor: theme.palette.primary.main, // Highlight border on hover
                            backgroundColor: theme.palette.action.hover, // Optional: change background color on hover
                        },
                        '&.Mui-focused': {
                            borderColor: theme.palette.primary.main, // Border color when focused
                        }
                    }}
                >
                    {/* <MenuItem disabled value="">
                        <em>Categories</em>
                    </MenuItem> */}
                    {categories.map((category) => (
                        <MenuItem
                            key={category}
                            value={category}
                            style={getStyles(category, selectedCategories, theme)}
                        >
                            {category}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
        </div>
    );
}

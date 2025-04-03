import { createContext, useState } from "react";

export const PriceContext = createContext(null);

const PriceProvider = ({ children }) => {
    const [priceData, setPriceData] = useState({});

    const getPriceDetails = (product) => {
        if (!product?.product_id) return { actualPrice: 0, randomPrice: 0, discountPercentage: 0 };

        // If prices for the product are already set, return them
        if (priceData[product.product_id]) return priceData[product.product_id];

        // Otherwise, calculate and store new prices
        const actualPrice = product?.price || 0;
        const randomPrice = parseFloat((actualPrice + Math.floor(Math.random() * (actualPrice * 0.5) + 1)).toFixed(2));

        const discountPercentage = randomPrice > 0
            ? Math.floor(((randomPrice - actualPrice) / randomPrice) * 100)
            : 0;

        const newPriceData = { actualPrice, randomPrice, discountPercentage };

        // Store it in state so it's reused throughout the app
        setPriceData(prev => ({ ...prev, [product.product_id]: newPriceData }));

        return newPriceData;
    };

    return (
        <PriceContext.Provider value={{ getPriceDetails }}>
            {children}
        </PriceContext.Provider>
    );
};

export default PriceProvider;

const productModel =require( "../models/product-model");


const getProducts = async (req, res) => {
    try {
        console.log("Fetching products...");
        const products = await productModel.find({});
        console.log("Fetched products:", products.length);
        res.status(200).json(products);
    } catch (error) {
        console.error("Error in getProducts:", error);
        res.status(500).json({ message: error.message });
    }
};
  


const getProductById = async (req, res) => {
    try {
        const product= await productModel.findOne({product_id:req.params.product_id});
        res.status(200).json(product);
    } catch (error) {
        res.status(500).json({ message: error.message });
        console.error(error);
    }
}

module.exports={getProducts,getProductById};
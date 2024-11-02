const productModel =require( "../models/product-model");


 const getProducts=async(req,res)=>{
    try {
        const products=await productModel.find({});
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({message:error.message});
        console.error(error);
    }
}


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
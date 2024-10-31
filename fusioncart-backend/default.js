

const Product =require("./models/product-model.js");
const { products } =require( './constants/data');

const DefaultData = async () => {
    try {
        await Product.deleteMany({});
        await Product.insertMany(products);

        console.log('Data imported Successfully');

    } catch (error) {
        console.log('Error: ', error.message);
    }
}

module.exports=DefaultData;
const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    product_id: { type: String, required: true, unique: true }, // Maps to "Product ID"
    product_name: { type: String, required: true }, // Maps to "Product Name"
    brand: { type: String }, // Maps to "Brand"
    price: { type: Number, required: true }, // Maps to "Price"
    quantity: { type: Number, required: true }, // Maps to "Quantity"
    floor: { type: Number }, // Maps to "Floor"
    section: { type: Number }, // Maps to "Section"
    category: { type: String, required: true }, // Maps to "Category"
    image_url: { type: String }, // Maps to "Image URL"
});

module.exports = mongoose.model('Product', productSchema);

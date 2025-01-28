import mongoose from "mongoose";



// Product Schema
export const productSchema = mongoose.Schema({
    name: String,
    categories: String,
    price: Number,
    img: String,
    state: String,
    owner: {
        firstName: String,
        lastName: String,
        address: String,
        phone: String,
        email: String
    },
    
});

export const productModel = mongoose.model("product", productSchema);
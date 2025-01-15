import mongoose from "mongoose";



export const productSchema = mongoose.Schema({
    name: String,
    categories: [String],
    img:String,
    state:String,
    owner: {
        firstName: String,
        lastName: String,
        address: String,
        phone:String,
        email:String
    }
   // author: authorSchema
})
//שם טבלה לכתוב ביחיד הוא הופך לרבים בעצמו
export const productModel=mongoose.model("book",productSchema);
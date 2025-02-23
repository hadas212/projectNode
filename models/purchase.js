import { Schema, model, Types } from "mongoose";
import { productSchema } from "./product.js";
const smallproductSchema=Schema({
    _id:{required:true,type:Types.ObjectId},
    name:String,
    owner: {
        firstName: String,
        lastName: String,
        address: String,
        phone: String,
        email: String
    }
})
//purchaseSchema
const purchaseSchema = Schema({
    userId: { type: Types.ObjectId, ref: "user" },
    product: [smallproductSchema],
    date: { type: Date, default: new Date() },
})

export const purchaseModel = model("purchase", purchaseSchema);
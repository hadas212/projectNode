import { Schema, model, Types } from "mongoose";
import { productSchema } from "./product.js";

//purchaseSchema
const purchaseSchema = Schema({
    userId: { type: Types.ObjectId, ref: "user" },
    product: productSchema,
    date: { type: Date, default: new Date() },
})

export const purchaseModel = model("purchase", purchaseSchema);
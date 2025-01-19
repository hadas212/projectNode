import { Schema, model, Types } from "mongoose";

//purchaseSchema
const purchaseSchema = Schema({
    userId: { type: Types.ObjectId, ref: "user" },
    date: { type: Date, default: new Date() },
})

export const purchaseModel = model("purchase", purchaseSchema);
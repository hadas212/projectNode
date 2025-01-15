import { Schema, model, Types } from "mongoose";


const buySchema = Schema({
    userId: { type: Types.ObjectId, ref: "user" },
    date: { type: Date, default: new Date() },
})

export const buyModel = model("borrow", buySchema);
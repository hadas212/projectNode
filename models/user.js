import mongoose from "mongoose";
//userSchema
const userSchema = mongoose.Schema({
    username: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    phone: { type: String, required: true },
    role:{type:String,require:true},
    registrationDate: { type: Date, default: Date.now }
   



})

export const userModel = mongoose.model("user", userSchema);

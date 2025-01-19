
import { purchaseModel } from "../models/purchase.js"
import { userModel } from "../models/user.js";

export const getAllpurchase = async (req, res) => {

    try {
        let data = await purchaseModel.find();
        res.json(data)
    }
    catch (err) {

        res.status(400).json({ title: "error cannnot get all", message: err.message })
    }

}
export const getpurchaseById = async (req, res) => {
    let { id } = req.params;
    try {
        let data = await purchaseModel.findById(id);
        if (!data)
            return res.status(404).json({ title: "error cannot get by id", message: "no  purchase with such id" })
        res.json(data)
    }
    catch (err) {

        res.status(400).json({ title: "error cannot get by id", message: err.message })
    }

}

export const getpurchaseByUserId = async (req, res) => {
    let { userid } = req.params;
    try {
        let data = await purchaseModel.find({ userId: userid });
        res.json(data)
    }
    catch (err) {

        res.status(400).json({ title: "error cannot get by id", message: err.message })
    }
}


export const addpurchase = async (req, res) => {
    try {
        let { userId, product } = req.body;
        if (!userId || !product )
            return res.status(404).json({ title: "missing required details", message: "userId and products are required" })
        let newpurchase = new purchaseModel({ userId: userId, product: product });
        await newpurchase.save();
        return res.json(newpurchase)
    }
    catch (errr) {
        res.status(400).json({ title: "error cannot add purchase", message: errr.message })

    }


}

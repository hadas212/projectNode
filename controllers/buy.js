
import { buyModel } from "../models/buy.js"
import { userModel } from "../models/user.js";

export const getAllBuy = async (req, res) => {

    try {
        let data = await buyModel.find();
        res.json(data)
    }
    catch (err) {

        res.status(400).json({ title: "error cannot get all", message: err.message })
    }

}
export const getBuyById = async (req, res) => {
    let { id } = req.params;
    try {
        let data = await buyModel.findById(id);
        if (!data)
            return res.status(404).json({ title: "error cannot get by id", message: "no  borrow with such id" })
        res.json(data)
    }
    catch (err) {

        res.status(400).json({ title: "error cannot get by id", message: err.message })
    }

}

export const getBuyByUserId = async (req, res) => {
    let { userid } = req.params;
    try {
        let data = await borrowModel.find({ userId: userid });
        res.json(data)
    }
    catch (err) {

        res.status(400).json({ title: "error cannot get by id", message: err.message })
    }
}


export const addBuy = async (req, res) => {
    try {
        let { userId, product } = req.body;
        if (!userId || !product )
            return res.status(404).json({ title: "missing required details", message: "userId and books are required" })
        let newBuy = new buyModel({ userId: userId, product: product });
        await newBuy.save();
        return res.json(newBuy)
    }
    catch (errr) {
        res.status(400).json({ title: "error cannot add buy", message: errr.message })

    }


}

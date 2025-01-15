import { productModel } from "../models/product.js"

export const getAllproducts = async (req, res) => {

    try {

        let data = await productModel.find();
        res.json(data);
    } catch (err) {
        console.log("err");
        res.status(400).json({ title: "error cannot get all", message: "somethongs wrong" })
    }

}

export const getByCategories = async (req, res) => {

    let { categories } = req.params;

    try {

        let data = await productModelproductModel.find({categories:categories});
        if (!data)
            return res.status(404).json({ title: "error cannot get by categories", message: "not valid  id parameter found" })
        res.json(data);
    } catch (err) {
        console.log("err");
        res.status(400).json({ title: "error cannot get by categories", message: "somethongs wrong" })
    }

}

export const deleteById = async (req, res) => {


    let { id } = req.params;
    try {

        let data = await productModel.findByIdAndDelete(id);
        if (!data)
            return res.status(404).json({ title: "error cannot get by id", message: "not valid  id parameter found" })
        res.json(data);
    } catch (err) {
        console.log("err");
        res.status(400).json({ title: "error cannot get by id", message: "somethongs wrong" })
    }

}
export const updateById = async (req, res) => {


    let { id } = req.params;

    if (req.body.name && req.body.name.length < 2 || req.body.state && req.body.categories )
        return res.status(404).json({ title: "wrong name or numPages", message: "wrong data" })
    try {

        let data = await productModel.findByIdAndUpdate(id, req.body, { new: true });
        if (!data)
            return res.status(404).json({ title: "error cannot update by id", message: "not valid  id parameter found" })
        res.json(data);
    } catch (err) {
        console.log("err");
        res.status(400).json({ title: "error cannot update by id", message: "somethongs wrong" })
    }

}
export const add = async (req, res) => {



    if (!req.body.name || !req.body.state||!req.body.categories||!req.body.owner.address||!req.body.phone)
        return res.status(404).json({ title: "missing details", message: "missing data" })
    if (req.body.name.length < 2 )
        return res.status(404).json({ title: "wrong name ", message: "wrong data" })
    try {

        let newProduct = new productModel(req.body)
        let data = await newProduct.save();


        res.json(data);
    } catch (err) {
        console.log("err");
        res.status(400).json({ title: "error cannot add by id", message: "somethongs wrong" })
    }

}
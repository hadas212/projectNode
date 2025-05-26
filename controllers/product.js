import { productModel } from "../models/product.js"

export const getAllproducts = async (req, res) => {
    let limit = req.query.limit || 20;
    let page = req.query.page || 1;
    try {

        let data = await productModel.find().skip((page - 1) * limit).limit(limit);
        res.json(data);
    } catch (err) {
        console.log("err");
        res.status(400).json({ title: "error cannot get all", message: "somethongs wrong" })
    }

}
export async function getProductsById(req, res) {
    try {
        let { id } = req.params

        let product = await productModel.findById(id);
        console.log(product)
        if (!product) {
            return res.status(404).json({ title: "Not Found", message: "Product not found" });
        }
        console.log("hbkjnlk  " + product)
        res.json(product);
    } catch (err) {
        console.log("Error fetching product by ID:", err);
        res.status(400).json({ title: "Error", message: "Something went wrong" });
    }
};

export async function getTotalProductPages(req, res) {
    let limit = req.query.limit || 20; // ברירת מחדל של 20 מוצרים בדף
    try {
        // ספירת כל המוצרים בקולקציה
        let result = await productModel.countDocuments(); // יש לשים countDocuments() ולא countDocument()

        res.json({
            totalCount: result, // מספר המוצרים הכולל
            totalPages: Math.ceil(result / limit), // חישוב מספר הדפים
            limit: limit  // מספר המוצרים לכל עמוד
        });
    } catch (err) {
        // טיפול בשגיאות
        res.status(400).json({ title: "cannot get all pages", message: err.message });
    }
}
export async function getTotalProductPagesCategory(req, res) {
    let { categories } = req.params;

    let limit = req.query.limit || 20; // ברירת מחדל של 20 מוצרים בדף
    let result;
    try {
        if (categories==="all")
            result = await productModel.countDocuments();
        else
            result = await productModel.countDocuments({ categories: categories }); // יש לשים countDocuments() ולא countDocument()

        res.json({
            totalCount: result, // מספר המוצרים הכולל
            totalPages: Math.ceil(result / limit), // חישוב מספר הדפים
            limit: limit  // מספר המוצרים לכל עמוד
        });
    } catch (err) {
        // טיפול בשגיאות
        res.status(400).json({ title: "cannot get all pages", message: err.message });
    }
}



export const getByCategories = async (req, res) => {


    let { categories } = req.params;
    let limit = req.query.limit || 20;
    let page = req.query.page || 1;
    let data;
    try {
        if (categories==="all")
            data = await productModel.find().skip((page - 1) * limit).limit(limit);
        else
            data = await productModel.find({ categories: categories }).skip((page - 1) * limit).limit(limit);
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
            return res.status(404).json({ title: "error cannot delete by id", message: "not valid  id parameter found" })
        res.json(data);
    } catch (err) {
        console.log("err");
        res.status(400).json({ title: "error cannot delete by id", message: "somethongs wrong" })
    }

}
export const updateById = async (req, res) => {


    let { id } = req.params;

    if (req.body.name && req.body.name.length < 2)
        return res.status(404).json({ title: "wrong name or state or categories", message: "wrong data" })
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
//add
export const add = async (req, res) => {



    if (!req.body.name || !req.body.state || !req.body.categories || !req.body.owner.address || !req.body.owner.phone)
        return res.status(404).json({ title: "missing details", message: "missing data" })
    if (req.body.name.length < 2)
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


export const updateExistingProducts = async () => {
    try {
        await productModel.updateMany(
            {}, // עדכון כל המוצרים
            { $set: { isSold: false } } // קובע isSold ל-false
        );
        console.log("All products' isSold field reset to false!");
    } catch (error) {
        console.error("Error resetting isSold field:", error);
    }
};

import { userModel } from "../models/user.js";
import { generateToken } from "../utils/generateToken.js";
import bcrypt from 'bcryptjs';  // הוספת bcryptjs

export const getAllUsers = async (req, res) => {
    try {
        let data = await userModel.find().select('-password -__v'); // Excluding id and version
        res.json(data);
    } catch (err) {
        console.log("err");
        res.status(400).json({ title: "error cannot get all", message: err.message });
    }
}



export const addUserSignUp = async (req, res) => {
    const { phone, email, username, password } = req.body;

    if (!phone || !email || !username || !password)
        return res.status(404).json({ title: "missing data", message: "missing data" });

    try {
        let existingUser = await userModel.findOne({
            $or: [{ phone }, { email }]
        });

        if (existingUser) {
            if (existingUser.email === email) {
                return res.status(400).json({ title: "Email Exists", message: "Email is already in use" });
            }
            if (existingUser.phone === phone) {
                return res.status(400).json({ title: "Phone Exists", message: "Phone number is already in use" });
            }
        }

        // האשטת הסיסמה לפני שמירתה
        const hashedPassword = await bcrypt.hash(password, 10);  // הוספת האשטת סיסמה

        // יצירת משתמש חדש
        let newUser = new userModel({ ...req.body, password: hashedPassword });  // שמירה של הסיסמה המוצפנת

        let data = await newUser.save();

        data.token = generateToken(data);

        await data.save();

        res.json({
            _id: data._id,
            username: data.username,
            email: data.email,
            phone: data.phone,
            role: data.role,
            registrationDate: data.registrationDate,
            token: data.token
        });
    } catch (err) {
        console.log("err");
        res.status(400).json({ title: "error cannot add", message: err.message });
    }
};


export const updatePassword = async (req, res) => {
    let { id } = req.params;

    if (req.body.password && req.body.password.length < 2)
        return res.status(404).json({ title: "wrong paswword", message: "wrong data" })
    try {

        let data = await userModel.findByIdAndUpdate(id, req.body, { new: true });
        if (!data)
            return res.status(404).json({ title: "error cannot update by id", message: "not valid  id parameter found" })
        res.json(data);
    } catch (err) {
        console.log("err");
        res.status(400).json({ title: "error cannot update by id", message: err.message })
    }

}
export const update = async (req, res) => {
    let { id } = req.params;

    if (!req.body.username && !req.body.role && !req.body.phone && !req.body.email)
        return res.status(404).json({ title: "wrong details", message: "wrong data" })
    try {

        let data = await userModel.findByIdAndUpdate(id, req.body, { new: true });
        if (!data)
            return res.status(404).json({ title: "error cannot update by id", message: "not valid  id parameter found" })
        res.json(data);
    } catch (err) {
        console.log("err");
        res.status(400).json({ title: "error cannot update by id", message: err.message })
    }

}
export const getUserById = async (req, res) => {

    let { id } = req.params;
    try {

        let data = await userModel.findById(id).select('-_id -__v');;
        if (!data)
            return res.status(404).json({ title: "error cannot get by id", message: "not valid  id parameter found" })
        res.json(data);
    } catch (err) {
        console.log("err");
        res.status(400).json({ title: "error cannot get by id", message: err.message })
    }
}

export const getUserByUserNamePasswordLogin = async (req, res) => {
    try {
        let { email, password } = req.body;
        if (!email || !password)
            return res.status(404).json({ title: "missing email or password", message: "missing details" });

        let data = await userModel.findOne({ email: email });

        if (!data)
            return res.status(404).json({ title: "cannot login", message: "no user with such details" });

        // השוואת הסיסמה המוזנת לסיסמה המוצפנת
        const isMatch = await bcrypt.compare(password, data.password);  // השוואת סיסמאות

        if (!isMatch) {
            return res.status(400).json({ title: "Login Failed", message: "Invalid password" });
        }

        data.token = generateToken(data);

        res.json(data);
    } catch (err) {
        console.log("err");
        res.status(400).json({ title: "error cannot login", message: err.message });
    }
}
export const deleteById = async (req, res) => {


    let { id } = req.params;
    try {

        let data = await userModel.findByIdAndDelete(id);
        if (!data)
            return res.status(404).json({ title: "error cannot delete by id", message: "not valid  id parameter found" })
        res.json(data);
    } catch (err) {
        console.log("err");
        res.status(400).json({ title: "error cannot delete by id", message: "somethongs wrong" })
    }

}




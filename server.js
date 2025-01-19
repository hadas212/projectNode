import express from "express";
import dotenv from "dotenv";
import cors from "cors";

import { connectToDB } from "./config/DB.js";
import productRouter from "./routers/product.js";
import userRouter from "./routers/user.js";
import purchaseRouter from "./routers/purchase.js";
import logToFile from "./middlewares/logTOFilrMiddleware.js";

dotenv.config();
connectToDB();
const app = express();

app.use(cors())
app.use(express.json())
app.use(logToFile)

app.use("/api/product", productRouter)
app.use("/api/user", userRouter)
app.use("/api/purchase", purchaseRouter)


let port = process.env.PORT;
app.listen(port, () => {
    console.log("app is runnig on port " + port)
})



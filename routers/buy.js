import { Router } from "express";
import {addBuy,getBuyByUserId,getBuyById,getAllBuy } from "../controllers/buy.js";

const router = Router();
router.get("/", getAllBuy)
router.get("/byUserId/:userid",getBuyByUserId )
router.get("/:id", getBuyById)
router.post("/", addBuy)

export default router;
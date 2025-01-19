import { Router } from "express";
import {addpurchase,getpurchaseByUserId,getpurchaseById,getAllpurchase } from "../controllers/purchase.js";

const router = Router();
router.get("/", getAllpurchase)
router.get("/byUserId/:userid",getpurchaseByUserId )
router.get("/:id", getpurchaseById)
router.post("/", addpurchase)

export default router;
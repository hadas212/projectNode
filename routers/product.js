import { Router } from "express";
import { add,updateById,deleteById,getByCategories,getAllproducts,getTotalProductPages } from "../controllers/product.js";

const router = Router();
router.get("/", getAllproducts)
router.get("/total",getTotalProductPages);
router.get("/:categories", getByCategories)
router.delete("/:id", deleteById)
router.put("/:id", updateById)
router.post("/", add)


export default router;
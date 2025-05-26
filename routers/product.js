import { Router } from "express";
import { add,updateById,updateExistingProducts,getProductsById,deleteById,getByCategories,getAllproducts,getTotalProductPages, getTotalProductPagesCategory } from "../controllers/product.js";
import { check, checkManager } from "../middlewares/validateToken.js";

const router = Router();
router.get("/", getAllproducts)
router.get("/total",getTotalProductPages);
router.get("/total/:categories",getTotalProductPagesCategory);
router.get("/:categories", getByCategories)
router.get("/byId/:id", getProductsById);
router.delete("/:id",checkManager, deleteById)
router.put("/:id",checkManager, updateById)
router.post("/",checkManager, add)
router.get("/pp", updateExistingProducts)


export default router;
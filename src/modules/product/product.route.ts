import { Router } from "express";
import { ProductController } from "./product.controller.js";
import auth from "../../middlewares/auth.js";

const router = Router();


router.post(
  "/",
  auth("ADMIN", "USER"),
  ProductController.createProduct
);


router.get(
  "/",
  ProductController.getAllProducts
);


router.get(
  "/:id",
  ProductController.getSingleProduct
);


router.patch(
  "/:id",
  auth("ADMIN", "USER"),
  ProductController.updateProduct
);


router.delete(
  "/:id",
  auth("ADMIN"),
  ProductController.deleteProduct
);


export default router;
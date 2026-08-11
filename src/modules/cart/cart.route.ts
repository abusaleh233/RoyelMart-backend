import { Router } from "express";
import { CartController } from "./cart.controller.js";
import auth from "../../middlewares/auth.js";


const router = Router();


router.post(
  "/",
  auth("USER", "ADMIN"),
  CartController.addToCart
);


router.get(
  "/",
  auth("USER", "ADMIN"),
  CartController.getMyCart
);

router.patch(
  "/:productId",
  auth("USER", "ADMIN"),
  CartController.updateCartItem
);

router.patch(
  "/:productId",
  auth("USER"),
  CartController.updateCartItem
);

router.delete(
  "/:productId",
  auth("USER"),
  CartController.removeFromCart
);


export default router;
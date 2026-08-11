import { Router } from "express";
import { WishlistController } from "./wishlist.controller.js";
import auth from "../../middlewares/auth.js";


const router = Router();


router.post(
  "/",
  auth("USER", "ADMIN"),
  WishlistController.addToWishlist
);


router.get(
  "/",
  auth("USER", "ADMIN"),
  WishlistController.getMyWishlist
);


router.delete(
  "/:productId",
  auth("USER", "ADMIN"),
  WishlistController.removeFromWishlist
);


export default router;
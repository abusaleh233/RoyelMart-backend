import { Router } from "express";
import { OrderController } from "./order.controller.js";
import auth from "../../middlewares/auth.js";


const router = Router();


router.post(
  "/",
  auth("USER", "ADMIN"),
  OrderController.createOrder
);

router.get(
  "/",
  auth("USER", "ADMIN"),
  OrderController.getMyOrders
);


router.get(
  "/:orderId",
  auth("USER", "ADMIN"),
  OrderController.getSingleOrder
);

router.get(
  "/all",
  auth("ADMIN"),
  OrderController.getAllOrders
);


router.patch(
  "/:orderId/status",
  auth("ADMIN"),
  OrderController.updateOrderStatus
);


export default router;
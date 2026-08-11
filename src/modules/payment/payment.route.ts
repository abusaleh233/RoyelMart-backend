import { Router } from "express";
import { PaymentController } from "./payment.controller.js";
import auth from "../../middlewares/auth.js";


const router = Router();


router.post(
  "/create-checkout-session",
  auth("USER", "ADMIN"),
  PaymentController.createCheckoutSession
);



export default router;
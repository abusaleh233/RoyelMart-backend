import { Router } from "express";
import { AdminController } from "./admin.controller.js";
import auth from "../../middlewares/auth.js";


const router = Router();



// Dashboard

router.get(
"/dashboard",
auth("ADMIN"),
AdminController.getDashboardStats
);




// Users

router.get(
"/users",
auth("ADMIN"),
AdminController.getAllUsers
);



router.patch(
"/users/:userId/role",
auth("ADMIN"),
AdminController.updateUserRole
);



router.delete(
"/users/:userId",
auth("ADMIN"),
AdminController.deleteUser
);




// Orders

router.get(
"/orders",
auth("ADMIN"),
AdminController.getAllOrders
);



router.patch(
"/orders/:orderId/status",
auth("ADMIN"),
AdminController.updateOrderStatus
);



export default router;
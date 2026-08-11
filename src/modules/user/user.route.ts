import { Router } from "express";
import { UserController } from "./user.controller.js";
import auth from "../../middlewares/auth.js";


const router = Router();



// My profile

router.get(

"/profile",

auth("USER","ADMIN"),

UserController.getMyProfile

);




// Update profile


router.patch(

"/profile",

auth("USER","ADMIN"),

UserController.updateProfile

);




// Delete account


router.delete(

"/profile",

auth("USER","ADMIN"),

UserController.deleteMyAccount

);



export default router;
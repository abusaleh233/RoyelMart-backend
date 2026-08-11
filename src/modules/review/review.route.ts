import { Router } from "express";
import { ReviewController } from "./review.controller.js";
import auth from "../../middlewares/auth.js";


const router = Router();



// Create Review

router.post(

"/",

auth("USER"),

ReviewController.createReview

);




// Get Product Reviews

router.get(

"/product/:productId",

ReviewController.getProductReviews

);





// Update Review

router.patch(

"/:reviewId",

auth("USER"),

ReviewController.updateReview

);





// Delete Review

router.delete(

"/:reviewId",

auth("USER","ADMIN"),

ReviewController.deleteReview

);



export default router;
import express, { Application, Request, Response } from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import morgan from "morgan";
import config from "./config/index.js";
import authRoute from "./modules/auth/auth.route.js";
import categoryRoute from "./modules/category/category.route.js";
import productRoute from "./modules/product/product.route.js";
import cartRoute from "./modules/cart/cart.route.js";
import wishlistRoute from "./modules/wishlist/wishlist.route.js";
import orderRoute from "./modules/order/order.route.js";
import paymentRoute from "./modules/payment/payment.route.js";
import adminRoute from "./modules/admin/admin.route.js";
import userRoute from "./modules/user/user.route.js";



const app: Application = express();

// Middlewares
app.use(
  cors({
    origin: config.app.clientUrl,
    credentials: true,
  })
);

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));

// Health Check Route
app.get("/", (req: Request, res: Response) => {
  res.status(200).json({
    success: true,
    message: "ShopNest API is running successfully 🚀",
  });
});

app.use("/api/auth",authRoute);
app.use("/api/categories",categoryRoute);
app.use("/api/products", productRoute);
app.use("/api/cart", cartRoute);
app.use("/api/wishlist", wishlistRoute);
app.use("/api/orders", orderRoute);
app.use("/api/payment", paymentRoute);
app.use("/api/admin",adminRoute);
app.use("/api/users",userRoute);

export default app;
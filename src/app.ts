import express, { Application, Request, Response } from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import morgan from "morgan";
import config from "./config/index.js";
import authRoute from "./modules/auth/auth.route.js";
import categoryRoute from "./modules/category/category.route.js";
import productRoute from "./modules/product/product.route.js";




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


export default app;
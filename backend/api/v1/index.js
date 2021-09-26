import { Router } from "express";
import productRouter from "./routes/productRoutes.js";
import userRouter from "./routes/userRoutes.js";

const routes = () => {
  const router = Router();
  router.use("/users", userRouter);
  router.use("/products", productRouter);
  return router;
};
export default routes;

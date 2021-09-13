import Router from "express";
import { allProducts, oneProduct } from "../controllers/productController.js";
import asyncHandler from "express-async-handler";

const productRouter = Router();

productRouter
  /**
   * @desc fetch all products
   * @route /api/products
   * @access Public
   */
  .get("/", asyncHandler(allProducts))
  /**
   * @desc fetch one product
   * @route /api/products/:id
   * @access Public
   */
  .get("/:id", asyncHandler(oneProduct));
export default productRouter;

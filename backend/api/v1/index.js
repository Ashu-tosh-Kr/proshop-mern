import { Router } from "express";
import products from "../../data/products.js";

const routes = () => {
  const router = Router();
  router.get("/products", (req, res) => res.json(products));
  router.get("/products/:id", (req, res) => {
    const product = products.find((p) => p._id === req.params.id);
    res.json(product);
  });
  return router;
};
export default routes;

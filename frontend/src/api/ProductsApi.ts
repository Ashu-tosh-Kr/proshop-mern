import { useQuery } from "react-query";
import { IProduct } from "../types";
import instance from "./axiosInstance";

/**
 * @desc get all products
 */
export const useAllProducts = () => {
  const { data, isLoading, isError, error } = useQuery(
    "allproducts",
    async (): Promise<IProduct[]> => {
      const res = await instance.get("/api/products");
      return res.data;
    }
  );
  const products = data as IProduct[];
  const errMsg = error ? (error as any).response.data.message : null;
  return { products, isLoading, isError, errMsg };
};

/**
 * @desc get one product by id
 */
export const useOneProduct = (id: string) => {
  const { data, isLoading, isError, error } = useQuery(
    "product",
    async (): Promise<IProduct> => {
      const res = await instance.get(`/api/products/${id}`);
      return res.data;
    }
  );
  const product = data as IProduct;
  const errMsg = error ? (error as any).response.data.message : null;
  return { product, isLoading, isError, errMsg };
};

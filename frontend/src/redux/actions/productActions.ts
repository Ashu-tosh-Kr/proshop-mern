import { Dispatch } from "redux";
import { useAllProducts, useOneProduct } from "../../api/ProductsApi";
import { IProduct } from "../../types";
import {
  PRODUCT_DETAILS_FAIL,
  PRODUCT_DETAILS_REQUEST,
  PRODUCT_DETAILS_SUCCESS,
  PRODUCT_LIST_FAIL,
  PRODUCT_LIST_REQUEST,
  PRODUCT_LIST_SUCCESS,
} from "../actionTypes";

export const listProducts =
  () => async (dispatch: Dispatch<{ type: string; payload?: IProduct[] }>) => {
    try {
      dispatch({ type: PRODUCT_LIST_REQUEST });
      const { products } = useAllProducts();
      dispatch({ type: PRODUCT_LIST_SUCCESS, payload: products });
    } catch (error: any) {
      dispatch({
        type: PRODUCT_LIST_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };

export const listProductDetails =
  (id: string) =>
  async (dispatch: Dispatch<{ type: string; payload?: IProduct }>) => {
    try {
      dispatch({ type: PRODUCT_DETAILS_REQUEST });
      const { product } = useOneProduct(id);
      dispatch({ type: PRODUCT_DETAILS_SUCCESS, payload: product });
    } catch (error: any) {
      dispatch({
        type: PRODUCT_DETAILS_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };

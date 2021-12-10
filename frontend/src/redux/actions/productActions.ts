import { Dispatch } from "redux";
import instance from "../../api/axiosInstance";
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
      const { data } = await instance.get(`/api/products`);
      dispatch({ type: PRODUCT_LIST_SUCCESS, payload: data });
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
      const { data } = await instance.get(`/api/products/${id}`);
      dispatch({ type: PRODUCT_DETAILS_SUCCESS, payload: data });
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

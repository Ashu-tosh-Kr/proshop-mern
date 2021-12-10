import { Dispatch } from "redux";
import instance from "../../api/axiosInstance";
import { ICartItem } from "../../types";
import {
  CART_ADD_ITEM,
  CART_REMOVE_ITEM,
  CART_SAVE_SHIPPING_ADDRESS,
} from "../actionTypes";

export const addToCart =
  (id: string, qty: number) =>
  async (
    dispatch: Dispatch<{ type: string; payload: ICartItem }>,
    getState: () => {
      cart: {
        cartItems: ICartItem[];
      };
    }
  ) => {
    const { data: product } = await instance.get(`/api/products/${id}`);
    dispatch({
      type: CART_ADD_ITEM,
      payload: {
        product: product._id,
        name: product.name,
        image: product.image,
        price: product.price,
        countInStock: product.countInStock,
        qty,
      },
    });
    localStorage.setItem(
      "cartItems",
      JSON.stringify(getState().cart.cartItems)
    );
  };

export const removeFromCart =
  (id: string) =>
  async (
    dispatch: Dispatch<{ type: string; payload: string }>,
    getState: () => { cart: { cartItems: ICartItem[] } }
  ) => {
    dispatch({ type: CART_REMOVE_ITEM, payload: id });
    localStorage.setItem(
      "cartItems",
      JSON.stringify(getState().cart.cartItems)
    );
  };

export const saveShippingAddress =
  (data: any) =>
  async (dispatch: Dispatch<{ type: string; payload: string }>) => {
    dispatch({ type: CART_SAVE_SHIPPING_ADDRESS, payload: data });
    localStorage.setItem("shippingAddress", JSON.stringify(data));
  };

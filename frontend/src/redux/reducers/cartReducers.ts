import { ICartItem } from "../../types";
import { CART_ADD_ITEM, CART_REMOVE_ITEM } from "../actionTypes";

export const cartReducer = (
  state = {
    cartItems: [
      {
        product: "",
        name: "",
        image: "",
        price: 0,
        countInStock: 0,
        qty: 0,
      },
    ],
  },
  action: {
    type: string;
    payload: ICartItem | string;
  }
) => {
  switch (action.type) {
    case CART_ADD_ITEM:
      const item = action.payload;
      const existItem = state.cartItems.find(
        (x) => x.product === (item as ICartItem).product
      );
      if (existItem) {
        return {
          ...state,
          cartItems: state.cartItems.map((x) =>
            x.product === existItem.product ? item : x
          ),
        };
      } else {
        return {
          ...state,
          cartItems: [...state.cartItems, item],
        };
      }
    case CART_REMOVE_ITEM:
      return {
        ...state,
        cartItems: state.cartItems.filter((x) => x.product !== action.payload),
      };
    default:
      return state;
  }
};

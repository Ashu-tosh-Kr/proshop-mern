import { applyMiddleware, combineReducers, createStore } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";
import { ICartItem } from "../types";
import { cartReducer } from "./reducers/cartReducers";
import {
  productDetailsReducer,
  productListReducer,
} from "./reducers/productReducers";

const reducer = combineReducers({
  productList: productListReducer,
  productDetails: productDetailsReducer,
  cart: cartReducer,
});
const cartItemsFromStorage: ICartItem[] | [] = localStorage.getItem("cartItems")
  ? JSON.parse(localStorage.getItem("cartItems") as string)
  : [];
const initialState = { cart: { cartItems: cartItemsFromStorage } };
const middleware = [thunk];
const store = createStore(
  reducer,
  //@ts-ignore
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;

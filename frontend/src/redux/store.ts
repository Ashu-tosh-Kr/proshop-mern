import { applyMiddleware, combineReducers, createStore } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";
import { ICartItem } from "../types";
import { cartReducer } from "./reducers/cartReducers";
import {
  productDetailsReducer,
  productListReducer,
} from "./reducers/productReducers";
import { userLoginReducer, userRegisterReducer } from "./reducers/userReducers";

const reducer = combineReducers({
  productList: productListReducer,
  productDetails: productDetailsReducer,
  cart: cartReducer,
  userLogin: userLoginReducer,
  userRegister: userRegisterReducer,
});

const cartItemsFromStorage: ICartItem[] | [] = localStorage.getItem("cartItems")
  ? JSON.parse(localStorage.getItem("cartItems") as string)
  : [];
const userInfoFromStorage = localStorage.getItem("userInfo")
  ? JSON.parse(localStorage.getItem("userInfo") as string)
  : null;

const initialState = {
  cart: { cartItems: cartItemsFromStorage },
  userLogin: {
    userInfo: userInfoFromStorage,
  },
};
const middleware = [thunk];
const store = createStore(
  reducer,
  //@ts-ignore
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;

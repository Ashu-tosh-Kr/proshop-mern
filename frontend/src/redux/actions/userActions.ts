import axios from "axios";
import { Dispatch } from "react";
import instance from "../../api/axiosInstance";
import {
  USER_DETAILS_FAIL,
  USER_DETAILS_REQUEST,
  USER_DETAILS_SUCCESS,
  USER_LOGIN_FAIL,
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGOUT,
  USER_REGISTER_FAIL,
  USER_REGISTER_REQUEST,
  USER_REGISTER_SUCCESS,
  USER_UPDATE_PROFILE_FAIL,
  USER_UPDATE_PROFILE_REQUEST,
  USER_UPDATE_PROFILE_SUCCESS,
} from "../actionTypes";

export const login =
  (email: string, password: string) =>
  async (dispatch: Dispatch<{ type: string; payload?: string | unknown }>) => {
    try {
      dispatch({
        type: USER_LOGIN_REQUEST,
      });
      const config = {
        headers: { "Content-Type": "application/json" },
      };
      const { data } = await axios.post(
        "/api/users/login",
        { email, password },
        config
      );
      dispatch({
        type: USER_LOGIN_SUCCESS,
        payload: data,
      });
      localStorage.setItem("userInfo", JSON.stringify(data));
    } catch (error: any) {
      dispatch({
        type: USER_LOGIN_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };

export const logout = () => async (dispatch: Dispatch<{ type: string }>) => {
  dispatch({ type: USER_LOGOUT });
  localStorage.removeItem("userInfo");
};

export const register =
  (name: string, email: string, password: string) =>
  async (dispatch: Dispatch<{ type: string; payload?: string | unknown }>) => {
    try {
      dispatch({
        type: USER_REGISTER_REQUEST,
      });
      const config = {
        headers: { "Content-Type": "application/json" },
      };
      const { data } = await instance.post(
        "/api/users/",
        { name, email, password },
        config
      );
      dispatch({
        type: USER_REGISTER_SUCCESS,
        payload: data,
      });
      dispatch({
        type: USER_LOGIN_SUCCESS,
        payload: data,
      });
      localStorage.setItem("userInfo", JSON.stringify(data));
    } catch (error: any) {
      dispatch({
        type: USER_REGISTER_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };

export const getUserDetails =
  (id: string) =>
  async (
    dispatch: Dispatch<{ type: string; payload?: string | unknown }>,
    getState: () => any
  ) => {
    try {
      dispatch({
        type: USER_DETAILS_REQUEST,
      });
      const {
        userLogin: { userInfo },
      } = getState();
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userInfo.token}`,
        },
      };
      const { data } = await instance.get(`/api/users/${id}`, config);
      dispatch({
        type: USER_DETAILS_SUCCESS,
        payload: data,
      });
    } catch (error: any) {
      dispatch({
        type: USER_DETAILS_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };

export const updateUserProfile =
  (user: { id: string; name: string; email: string; password: string }) =>
  async (
    dispatch: Dispatch<{ type: string; payload?: string | unknown }>,
    getState: () => any
  ) => {
    try {
      dispatch({
        type: USER_UPDATE_PROFILE_REQUEST,
      });
      const {
        userLogin: { userInfo },
      } = getState();
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userInfo.token}`,
        },
      };
      const { data } = await instance.put(`/api/users/profile`, user, config);
      dispatch({
        type: USER_UPDATE_PROFILE_SUCCESS,
        payload: data,
      });
    } catch (error: any) {
      dispatch({
        type: USER_UPDATE_PROFILE_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };

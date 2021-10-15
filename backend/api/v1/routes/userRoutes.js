import express from "express";
import expressAsyncHandler from "express-async-handler";
const userRouter = express.Router();
import {
  authUser,
  registerUser,
  getUserProfile,
  updateUserProfile,
  getUsers,
  deleteUser,
  getUserById,
  updateUser,
} from "../controllers/userController.js";
import { protect, admin } from "../middlewares/authMiddleware.js";

userRouter
  .route("/")
  .post(expressAsyncHandler(registerUser))
  .get(protect, admin, expressAsyncHandler(getUsers));
userRouter.post("/login", expressAsyncHandler(authUser));
userRouter
  .route("/profile")
  .get(protect, expressAsyncHandler(getUserProfile))
  .put(protect, expressAsyncHandler(updateUserProfile));
userRouter
  .route("/:id")
  .delete(protect, admin, expressAsyncHandler(deleteUser))
  .get(protect, admin, expressAsyncHandler(getUserById))
  .put(protect, admin, expressAsyncHandler(updateUser));

export default userRouter;

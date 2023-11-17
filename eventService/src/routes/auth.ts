import express from "express";
const router = express.Router();
const checkAuth = require("../middleware/checkAuth");
import { successResponse, errorResponse } from "../services/apiResponse";

import authController from "../controllers/AuthController";
const SECRET_KEY = "ffswvdxjhnxdlluuq";
router.post("/sendotp", async (req, res) => {
  try {
console.log(req.body);

    const body = req.body;
    const controller = new authController();
    const response = await controller.sendotp(body);
    res.status(200).json(successResponse("sendotp", response, res.statusCode));
  } catch (error) {
    res.status(500).json(errorResponse("error in sendotp", res.statusCode));
  }
});

router.post("/verifyotp", async (req, res) => {
  try {
    const body = req.body;
    const controller = new authController();
    const response: any = await controller.verifyotpByApi(body);
    res
      .status(200)
      .json(successResponse("verifyotp", response, res.statusCode));
  } catch (error) {
    res.status(500).json(errorResponse("error in verifyotp", res.statusCode));
  }
});

router.post("/editprofile", async (req, res) => {
  try {
    const controller = new authController();
    const body = req.body;
    const response = await controller.editProfile(body);
    res
      .status(200)
      .json(successResponse("editProfile", response, res.statusCode));
  } catch (error) {
    res.status(500).json(errorResponse("error in editProfile", res.statusCode));
  }
});

router.get("/getprofile",checkAuth, async (req, res) => {
  try {
    const userId: any = req.query.userId;
    const loginUser:any =res.locals.user;
    const controller = new authController();
    const response: any = await controller.viewProfile(userId,loginUser);
    res
      .status(200)
      .json(successResponse("getProfile", response, res.statusCode));
  } catch (error) {
    res.status(500).json(errorResponse("error in getProfile", res.statusCode));
  }
});

router.post("/getmultiple/profile", async (req, res) => {
  try {
    const userId: any = req.body.userId;
    const controller = new authController();
    const response: any = await controller.viewProfileMultiple(userId);
    res
      .status(200)
      .json(successResponse("getProfile", response, res.statusCode));
  } catch (error) {
    res.status(500).json(errorResponse("error in getProfile", res.statusCode));
  }
});

router.get("/search/user", async (req, res) => {
  try {
    const search: any = req.query.search;
    const controller = new authController();
    const response: any = await controller.searchUser(search);
    res
      .status(200)
      .json(successResponse("getProfile", response, res.statusCode));
  } catch (error) {
    res.status(500).json(errorResponse("error in getProfile", res.statusCode));
  }
});

router.post("/signup", async (req, res) => {
  try {
    const SECRET_KEY = "pasdfghjkl";

    const body = req.body;
    const controller = new authController();
    const response: any = await controller.signUpEmail(body, SECRET_KEY);
    res.status(200).json(successResponse("signup", response, res.statusCode));
  } catch (error) {
    res.status(500).json(errorResponse("error in signup", res.statusCode));
  }
});

router.post("/signin", async (req, res) => {
  try {
    const body = req.body;
    const SECRET_KEY = "pasdfghjkl";
    const controller = new authController();
    const response = await controller.signInEmail(body, SECRET_KEY);
    res.status(200).json(successResponse("signin", response, res.statusCode));
  } catch (error) {
    res.status(500).json(errorResponse("error in signin", res.statusCode));
  }
});

router.post("/verify/email", async (req, res) => {
  try {
    const SECRET_KEY = "pasdfghjkl";
    const body = req.body;
    const controller = new authController();
    const response: any = await controller.verifyEmailotp(body);
    res
      .status(200)
      .json(successResponse("verify email", response, res.statusCode));
  } catch (error) {
    res
      .status(500)
      .json(errorResponse("error in verify email", res.statusCode));
  }
});

export default router;

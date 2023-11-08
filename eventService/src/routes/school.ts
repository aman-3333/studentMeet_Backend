import express from "express";
const router = express.Router();
const checkAuth = require("../middleware/checkAuth");
import { successResponse, errorResponse } from "../services/apiResponse";
import SchoolController from "../controllers/SchoolController";
import { ISchool } from "../models/school";

router.post("/create", async (req, res) => {
  try {
    req.body.user = res.locals.user;
    const body = req.body;

    const controller = new SchoolController();
    const response: ISchool = await controller.createSchool(body);
    res
      .status(200)
      .json(successResponse("create School", response, res.statusCode));
  } catch (error) {
    res
      .status(500)
      .json(errorResponse("error in create School", res.statusCode));
  }
});

router.post("/edit",  async (req, res) => {
  try {
    const SchoolId = req.body.schoolId;
    req.body.user = res.locals.user;
    const body = req.body;
    const controller = new SchoolController();
    const response: ISchool = await controller.editSchool(body, SchoolId);
    res
      .status(200)
      .json(successResponse("School update", response, res.statusCode));
  } catch (error) {
    res
      .status(500)
      .json(errorResponse("error in School update", res.statusCode));
  }
});

router.get("/list", checkAuth, async (req, res) => {
  try {
    const user = res.locals.user;
    const controller = new SchoolController();
    const response: any = await controller.getSchool(user);
    res
      .status(200)
      .json(successResponse("get School", response, res.statusCode));
  } catch (error) {
    console.log(error, "error");

    res.status(500).json(errorResponse("error in get School", res.statusCode));
  }
});
router.get("/search", async (req, res) => {
  try {
    const search = req.query.search;
    const controller = new SchoolController();
    const response: any = await controller.searchSchool(search);
    res
      .status(200)
      .json(successResponse("get School", response, res.statusCode));
  } catch (error) {
    res.status(500).json(errorResponse("error in get School", res.statusCode));
  }
});

router.post("/share", async (req, res) => {
  try {
    const body = req.body;

    const controller = new SchoolController();
    const response: any = await controller.shareSchool(body);
    res
      .status(200)
      .json(successResponse("share school", response, res.statusCode));
  } catch (error) {
    res
      .status(500)
      .json(errorResponse("error in share school", res.statusCode));
  }
});
router.get("/info/byId", async (req, res) => {
  try {
    const SchoolId: any = req.query.SchoolId;
    const userId = req.body.userId;
    const controller = new SchoolController();
    const response: any = await controller.getSchoolInfoById(SchoolId);
    res
      .status(200)
      .json(successResponse("get School by Id ", response, res.statusCode));
  } catch (error) {
    res
      .status(500)
      .json(errorResponse("error in get School by Id", res.statusCode));
  }
});

router.get("/by/owner", async (req, res) => {
  try {
    const schoolOwnerId: any = req.query.schoolOwnerId;
    const userId = req.body.userId;
    const controller = new SchoolController();
    const response: any = await controller.getSchoolByOwnerId(schoolOwnerId);
    res
      .status(200)
      .json(successResponse("get School by Id ", response, res.statusCode));
  } catch (error) {
    res
      .status(500)
      .json(errorResponse("error in get School by Id", res.statusCode));
  }
});
router.post("/delete", checkAuth, async (req, res) => {
  try {
    const SchoolId = req.body._id;;
    const controller = new SchoolController();
    const response: any = await controller.deleteSchool(SchoolId);
    res
      .status(200)
      .json(successResponse("School update", response, res.statusCode));
  } catch (error) {
    res
      .status(500)
      .json(errorResponse("error in School update", res.statusCode));
  }
});

router.post("/activity", async (req, res) => {
  try {
    const userId = req.body.userId;
    const schoolId = req.body.schoolId;
    const status = req.body.status;
    const schoolComment = req.body.schoolComment;
    const schoolCommentId = req.body.schoolCommentId;

    req.body.user = res.locals.user;
    const body = req.body;

    const controller = new SchoolController();
    const response = await controller.schoolActivity(
      userId,
      schoolId,
      status,
      schoolComment,
      schoolCommentId,
      body
    );
    res
      .status(200)
      .json(successResponse("schoolActivity", response, res.statusCode));
  } catch (error) {
    console.log(error,"error")
    res
      .status(500)
      .json(errorResponse("error in schoolActivity", res.statusCode));
  }
});

router.post("/read/activity", async (req, res) => {
  try {
    const schoolId = req.body.schoolId;
    const status = req.body.status;
    const userId = req.body.userId;
    const controller = new SchoolController();
    const response = await controller.readschoolActivity(
      schoolId,
      status,
      userId
    );
    res
      .status(200)
      .json(successResponse("read schoolActivity", response, res.statusCode));
  } catch (error) {
    res
      .status(500)
      .json(errorResponse("error in read schoolActivity", res.statusCode));
  }
});

export default router;

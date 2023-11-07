import express from "express";
const router = express.Router();
const checkAuth = require("../middleware/checkAuth");
import { successResponse, errorResponse } from "../services/apiResponse";
import { IAcademy } from "../models/academy";
import AcademyController from "../controllers/AcademyController";
router.post("/create", async (req, res) => {
  try {
    const body = req.body;
    const controller = new AcademyController();
    const response = await controller.createAcademy(body);
    res
      .status(200)
      .json(successResponse("create academy", response, res.statusCode));
  } catch (error) {
    console.log(error);

    res
      .status(500)
      .json(errorResponse("error in create academy", res.statusCode));
  }
});

router.patch("/edit", checkAuth, async (req, res) => {
  try {
    const user = res.locals.user;
    const body = req.body;
    const controller = new AcademyController();
    const response: IAcademy = await controller.editAcademy(body);
    res
      .status(200)
      .json(successResponse("edit academy", response, res.statusCode));
  } catch (error) {
    res
      .status(500)
      .json(errorResponse("error in edit academy", res.statusCode));
  }
});

router.get("/list", checkAuth, async (req, res) => {
  try {
    const controller = new AcademyController();
    let user = res.locals.user;
    console.log(user);

    const response: IAcademy[] = await controller.getAcademyList(user);
    res
      .status(200)
      .json(successResponse("academy list", response, res.statusCode));
  } catch (error) {
    res
      .status(500)
      .json(errorResponse("error in academy list", res.statusCode));
  }
});



router.post("/delete", checkAuth, async (req, res) => {
  try {
    const academyId = req.body._id;
    const controller = new AcademyController();
    const response: IAcademy = await controller.deleteAcademy(academyId);
    res
      .status(200)
      .json(successResponse("delete academy", response, res.statusCode));
  } catch (error) {
    res
      .status(500)
      .json(errorResponse("error in deleteacademy", res.statusCode));
  }
});

router.get("/search", async (req, res) => {
  try {
    const controller = new AcademyController();
    const search = req.query.search;

    const response: any = await controller.searchAcademy(search);
    res
      .status(200)
      .json(successResponse("academy academy", response, res.statusCode));
  } catch (error) {
    res
      .status(500)
      .json(errorResponse("error in academy list", res.statusCode));
  }
});

router.post("/activity",  async (req, res) => {
  try {
    const userId = req.body.userId;
    const acdemyId = req.body.acdemyId;
    const status = req.body.status;
    const acdemyComment = req.body.acdemyComment;
    const acdemyCommentId = req.body.acdemyCommentId;
    const body = req.body;
    const controller = new AcademyController();
    const response = await controller.academyActivity(
      userId,
      acdemyId,
      status,
      acdemyComment,
      acdemyCommentId,
      body
    );
    res
      .status(200)
      .json(successResponse("academy Activity", response, res.statusCode));
  } catch (error) {
    console.log(error,"error")
    res
      .status(500)
      .json(errorResponse("error in academy Activity", res.statusCode));
  }
});
router.post("/read/activity", async (req, res) => {
  try {
    console.log(req.body);

    const academyId = req.body.academyId;
    const status = req.body.status;
    const userId=req.body.userId;

    const controller = new AcademyController();
    const response = await controller.readAcademyActivity(academyId, status,userId);
    res
      .status(200)
      .json(successResponse("read Activity", response, res.statusCode));
  } catch (error) {
    res
      .status(500)
      .json(errorResponse("error in read Activity", res.statusCode));
  }
});

router.get("/filter", async (req, res) => {
  try {
    const controller = new AcademyController();
    const city:any= req.query.city;
    const state:any= req.query.state;
    const academySubTypeId:any= req.query.academySubTypeId;
    const response:any= await controller.filterAcademy(city,state,academySubTypeId);
    res
      .status(200)
      .json(successResponse("academy list", response, res.statusCode));
  } catch (error) {
    console.log(error);

    res
      .status(500)
      .json(errorResponse("error in academy list", res.statusCode));
  }
});
router.get("/details", async (req, res) => {
  try {
    const controller = new AcademyController();
    const academyId: any = req.query.academyId;
    const response: any = await controller.getAcademyDetails(academyId);
    res
      .status(200)
      .json(successResponse("academy list", response, res.statusCode));
  } catch (error) {
    res
      .status(500)
      .json(errorResponse("error in academy list", res.statusCode));
  }
});

router.get("/info/byid", async (req, res) => {
  try {
    const academyId: any = req.query.academyId;

    const status: any = req.query.status;

    const controller = new AcademyController();
    const response: any = await controller.getacademyInfoById(
      academyId,
      status
    );
    res
      .status(200)
      .json(successResponse("get academy", response, res.statusCode));
  } catch (error) {
    console.log(error)
    res.status(500).json(errorResponse("error in get academy", res.statusCode));
  }
});


router.post("/share", async (req, res) => {
  try {
    const body=req.body;
   
    const controller = new AcademyController();
    const response:any = await controller.shareAcademy(body);
    res
      .status(200)
      .json(successResponse("share acdemy", response, res.statusCode));
  } catch (error) {
    res
      .status(500)
      .json(errorResponse("error in share acdemy", res.statusCode));
  }
});
router.get("/registration/details", async (req, res) => {
  try {
    const academyId: any = req.query.academyId;

    const controller = new AcademyController();
    const response: any = await controller.getAcademyRegistrationDetail(
      academyId
    );
    res
      .status(200)
      .json(successResponse("get academy", response, res.statusCode));
  } catch (error) {
    res.status(500).json(errorResponse("error in get academy", res.statusCode));
  }
});

export default router;

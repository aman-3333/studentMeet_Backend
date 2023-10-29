import express from "express";
const router = express.Router();
const checkAuth = require("../middleware/checkAuth");
import { successResponse, errorResponse } from "../services/apiResponse";
import AcademyRepresentativeController from "../controllers/AcademyRepresentativeController";
import { IAcademyRepresentative } from "../models/academyRepresentative";

router.post("/create", async (req, res) => {
  try {
    req.body.user = res.locals.user;
    const body = req.body;

    const controller = new AcademyRepresentativeController();
    const response: IAcademyRepresentative =
      await controller.createAcademyRepresentative(body);
    res
      .status(200)
      .json(
        successResponse(
          "create AcademyRepresentative",
          response,
          res.statusCode
        )
      );
  } catch (error) {
    res
      .status(500)
      .json(
        errorResponse("error in create AcademyRepresentative", res.statusCode)
      );
  }
});

router.patch("/edit/:id", checkAuth, async (req, res) => {
  try {
    const AcademyRepresentativeId = req.params.id;

    req.body.user = res.locals.user;
    const body = req.body;
    const controller = new AcademyRepresentativeController();
    const response: IAcademyRepresentative =
      await controller.editAcademyRepresentative(body, AcademyRepresentativeId);
    res
      .status(200)
      .json(
        successResponse(
          "AcademyRepresentative update",
          response,
          res.statusCode
        )
      );
  } catch (error) {
    res
      .status(500)
      .json(
        errorResponse("error in AcademyRepresentative update", res.statusCode)
      );
  }
});

router.get("/list", checkAuth, async (req, res) => {
  try {
    const controller = new AcademyRepresentativeController();

    const response: any = await controller.getAcademyRepresentative();
    res
      .status(200)
      .json(
        successResponse("get AcademyRepresentative", response, res.statusCode)
      );
  } catch (error) {
    res
      .status(500)
      .json(
        errorResponse("error in get AcademyRepresentative", res.statusCode)
      );
  }
});
router.get("/search", checkAuth, async (req, res) => {
  try {
    const stateId = req.query.stateId;
    const searchValue = req.query.searchValue;
    const controller = new AcademyRepresentativeController();

    const response: any = await controller.searchAcademyRepresentative(
      stateId,
      searchValue
    );
    res
      .status(200)
      .json(
        successResponse("get AcademyRepresentative", response, res.statusCode)
      );
  } catch (error) {
    res
      .status(500)
      .json(
        errorResponse("error in get AcademyRepresentative", res.statusCode)
      );
  }
});

router.get("/infoById", checkAuth, async (req, res) => {
  try {
    const representativeId: any = req.query.representativeId;
    const userId = req.body.userId;
    const controller = new AcademyRepresentativeController();
    const response: any = await controller.getAcademyRepresentativeInfobyId(
      representativeId
    );
    res
      .status(200)
      .json(
        successResponse(
          "get AcademyRepresentative by Id ",
          response,
          res.statusCode
        )
      );
  } catch (error) {
    res
      .status(500)
      .json(
        errorResponse(
          "error in get AcademyRepresentative by Id",
          res.statusCode
        )
      );
  }
});
router.post("/delete", checkAuth, async (req, res) => {
  try {
    const AcademyRepresentativeId = req.body._id;
    const controller = new AcademyRepresentativeController();
    const response: any = await controller.deleteAcademyRepresentative(
      AcademyRepresentativeId
    );
    res
      .status(200)
      .json(
        successResponse(
          "AcademyRepresentative update",
          response,
          res.statusCode
        )
      );
  } catch (error) {
    res
      .status(500)
      .json(
        errorResponse("error in AcademyRepresentative update", res.statusCode)
      );
  }
});

export default router;

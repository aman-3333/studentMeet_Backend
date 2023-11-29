import express from "express";
const router = express.Router();
const checkAuth = require("../middleware/checkAuth");
import {successResponse, errorResponse} from "../services/apiResponse";
import { ISports } from "../models/sportsCategory";
import SportsController from "../controllers/sportsCategoryController";
router.post("/create",  async (req, res) => {
    try {
        
req.body.user=res.locals.user
const body = req.body;
        const controller = new SportsController();
        const response = await controller.createSports(body);
        res.status(200).json(successResponse("create Sports", response, res.statusCode));
    } catch (error) {
   
        res.status(500).json(errorResponse("error in create Sports", res.statusCode));
    }
});

router.patch("/edit/:id", checkAuth, async (req, res) => {
    try {
        const SportsId = req.params.id;
        const body = req.body as ISports;
        const controller = new SportsController();
        const response: ISports = await controller.editSports(body, SportsId);
        res.status(200).json(successResponse("edit Sports", response, res.statusCode));
    } catch (error) {
      
        res.status(500).json(errorResponse("error in edit Sports", res.statusCode));
    }
});

router.get("/list", async (req, res) => {
    try {
        const controller = new SportsController();
        const stateId = req.query.stateId;
        const response: ISports[] = await controller.getSportsList(stateId);
        res.status(200).json(successResponse("Sports list", response, res.statusCode));
    } catch (error) {
      
        res.status(500).json(errorResponse("error in Sports list", res.statusCode));
    }
});


router.get("/infobyid", checkAuth, async (req, res) => {
    try {
        const SportsId: any = req.query.SportsId;
        const controller = new SportsController();
        const response: any = await controller.getSportsInfoById(SportsId);
        res.status(200).json(successResponse("getSports", response, res.statusCode));
    } catch (error) {
      
        res.status(500).json(errorResponse("error in getSports", res.statusCode));
    }
});


router.post("/delete", checkAuth, async (req, res) => {
    try {
        const SportsId = req.body._id;
        const controller = new SportsController();
        const response: ISports = await controller.deleteSports(SportsId);
        res.status(200).json(successResponse("deleteSports", response, res.statusCode));

    } catch (error) {
       
        res.status(500).json(errorResponse("error in deleteSports", res.statusCode));
    }
})


export default router;
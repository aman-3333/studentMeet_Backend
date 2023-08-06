import express from "express";
const router = express.Router();
const checkAuth = require("../middleware/checkAuth");
import {successResponse, errorResponse} from "../services/apiResponse";
import { ICity } from "../models/city";
import CityController from "../controllers/CityController";
router.post("/createCity", checkAuth, async (req, res) => {
    try {
        
req.body.user=res.locals.user
const body = req.body;
        const controller = new CityController();
        const response = await controller.createCity(body);
        res.status(200).json(successResponse("create City", response, res.statusCode));
    } catch (error) {
   
        res.status(500).json(errorResponse("error in create City", res.statusCode));
    }
});

router.patch("/City/:id", checkAuth, async (req, res) => {
    try {
        const CityId = req.params.id;
        const body = req.body as ICity;
        const controller = new CityController();
        const response: ICity = await controller.editCity(body, CityId);
        res.status(200).json(successResponse("edit City", response, res.statusCode));
    } catch (error) {
      
        res.status(500).json(errorResponse("error in edit City", res.statusCode));
    }
});

router.get("/CityList", checkAuth, async (req, res) => {
    try {
        const controller = new CityController();
        const stateId = req.query.stateId;
        const response: ICity[] = await controller.getCityList(stateId);
        res.status(200).json(successResponse("City list", response, res.statusCode));
    } catch (error) {
      
        res.status(500).json(errorResponse("error in City list", res.statusCode));
    }
});


router.get("/Cityinfobyid", checkAuth, async (req, res) => {
    try {
        const CityId: any = req.query.CityId;
        const controller = new CityController();
        const response: any = await controller.getCityInfoById(CityId);
        res.status(200).json(successResponse("getCity", response, res.statusCode));
    } catch (error) {
      
        res.status(500).json(errorResponse("error in getCity", res.statusCode));
    }
});


router.get("/deleteCity/:id", checkAuth, async (req, res) => {
    try {
        const CityId = req.params.id;
        const controller = new CityController();
        const response: ICity = await controller.deleteCity(CityId);
        res.status(200).json(successResponse("deleteCity", response, res.statusCode));

    } catch (error) {
       
        res.status(500).json(errorResponse("error in deleteCity", res.statusCode));
    }
})


export default router;
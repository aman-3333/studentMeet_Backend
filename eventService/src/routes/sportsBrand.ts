import express from "express";
const router = express.Router();
const checkAuth = require("../middleware/checkAuth");
import {successResponse, errorResponse} from "../services/apiResponse";
import { ISportsBrand } from "../models/sportsBrand";
import SportsBrandController from "../controllers/SportsBrandController";
router.post("/create", checkAuth, async (req, res) => {
    try {
        
req.body.user=res.locals.user
const body = req.body;
        const controller = new SportsBrandController();
        const response = await controller.createSportsBrand(body);
        res.status(200).json(successResponse("create SportsBrand", response, res.statusCode));
    } catch (error) {
   
        res.status(500).json(errorResponse("error in create SportsBrand", res.statusCode));
    }
});

router.patch("/edit/:id", checkAuth, async (req, res) => {
    try {
        const SportsBrandId = req.params.id;
        const body = req.body as ISportsBrand;
        const controller = new SportsBrandController();
        const response: ISportsBrand = await controller.editSportsBrand(body, SportsBrandId);
        res.status(200).json(successResponse("edit SportsBrand", response, res.statusCode));
    } catch (error) {
      
        res.status(500).json(errorResponse("error in edit SportsBrand", res.statusCode));
    }
});

router.get("/list", checkAuth, async (req, res) => {
    try {
        const controller = new SportsBrandController();
        const stateId = req.query.stateId;
        const response: ISportsBrand[] = await controller.getSportsBrandList(stateId);
        res.status(200).json(successResponse("SportsBrand list", response, res.statusCode));
    } catch (error) {
      
        res.status(500).json(errorResponse("error in SportsBrand list", res.statusCode));
    }
});


router.get("/infobyid", checkAuth, async (req, res) => {
    try {
        const SportsBrandId: any = req.query.SportsBrandId;
        const controller = new SportsBrandController();
        const response: any = await controller.getSportsBrandInfoById(SportsBrandId);
        res.status(200).json(successResponse("getSportsBrand", response, res.statusCode));
    } catch (error) {
      
        res.status(500).json(errorResponse("error in getSportsBrand", res.statusCode));
    }
});


router.get("/delete/:id", checkAuth, async (req, res) => {
    try {
        const SportsBrandId = req.params.id;
        const controller = new SportsBrandController();
        const response: ISportsBrand = await controller.deleteSportsBrand(SportsBrandId);
        res.status(200).json(successResponse("deleteSportsBrand", response, res.statusCode));

    } catch (error) {
       
        res.status(500).json(errorResponse("error in deleteSportsBrand", res.statusCode));
    }
})


export default router;
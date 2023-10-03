import express from "express";
const router = express.Router();
const checkAuth = require("../middleware/checkAuth");
import {successResponse, errorResponse} from "../services/apiResponse";

import StarPerformerController from "../controllers/StarPerformerController"

router.post("/create", checkAuth, async (req, res) => {
    try {
        
req.body.user=res.locals.user
const body = req.body;
     
        
        const controller = new StarPerformerController();
        const response = await controller.createStarPerformer(body);
        res.status(200).json(successResponse("create StarPerformer", response, res.statusCode));
    } catch (error) {
       
        res.status(500).json(errorResponse("error in create StarPerformer", res.statusCode));
    }
});
router.patch("/edit", checkAuth, async (req, res) => {
    try {
      
        const body = req.body as any;
        const controller = new StarPerformerController();
        const response: any = await controller.editStarPerformer(body);
        res.status(200).json(successResponse("edit StarPerformer", response, res.statusCode));
    } catch (error) {
     
        res.status(500).json(errorResponse("error in edit StarPerformer", res.statusCode));
    }
});
router.get("/filter", checkAuth, async (req, res) => {
    try {
       
        const sort = req.query.sort;
        const type = req.query.type;
        const category = req.query.category;
        const subCategory = req.query.subCategory; 
         const subSubCategory = req.query.subSubCategory; 
         const limit = req.query.limit;
           const skip = req.query.skip;
           const earningCoin = req.query.earningCoin;
           
           const search = req.query.search;
        const controller = new StarPerformerController();
        const response: any = await controller.filterStarPerformer(type, sort, earningCoin, subCategory, subSubCategory, limit, skip, search);
        res.status(200).json(successResponse("filterStarPerformer ", response, res.statusCode));
    } catch (error) {
       
        res.status(500).json(errorResponse("error filterEvent", res.statusCode));
    }
});
router.get("/list", checkAuth, async (req, res) => {
    try {
        const controller = new StarPerformerController();
        const response: any[] = await controller.getStarPerformerList();
        res.status(200).json(successResponse("StarPerformer list", response, res.statusCode));
    } catch (error) {

        res.status(500).json(errorResponse("error in StarPerformer list", res.statusCode));
    }
});
router.get("/search", checkAuth, async (req, res) => {
    try {
const searchValue=req.query.searchValue;
        const controller = new StarPerformerController();
        const response: any[] = await controller.searchStarPerformer(searchValue);
        res.status(200).json(successResponse("StarPerformer list", response, res.statusCode));
    } catch (error) {
      
        res.status(500).json(errorResponse("error in StarPerformer list", res.statusCode));
    }
});

router.get("/info/byid", checkAuth, async (req, res) => {
    try {
        const starPerformerId:any = req.query.id;
        const controller = new StarPerformerController();
        const response: any = await controller.getStarPerformerInfoById(starPerformerId);
        res.status(200).json(successResponse("get StarPerformer", response, res.statusCode));
    } catch (error) {
       
        res.status(500).json(errorResponse("error in get StarPerformer", res.statusCode));
    }
});


router.patch("/delete", checkAuth, async (req, res) => {
    try {
        const starPerformerId:any = req.body.starPerformerId;
        const controller = new StarPerformerController();
        const response: any = await controller.deleteStarPerformer(starPerformerId);
        res.status(200).json(successResponse("delete StarPerformer", response, res.statusCode));

    } catch (error) {
       
        res.status(500).json(errorResponse("error in delete StarPerformer", res.statusCode));
    }
})














export default router;
import express from "express";
const router = express.Router();
const checkAuth = require("../middleware/checkAuth");
import {successResponse, errorResponse} from "../services/apiResponse";

import StarPerformerController from "../controllers/StarPerformerController"

router.post("/createStarPerformer", checkAuth, async (req, res) => {
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
router.patch("/StarPerformer/:id", checkAuth, async (req, res) => {
    try {
        const StarPerformerId = req.params.id;
        const body = req.body as any;
        const controller = new StarPerformerController();
        const response: any = await controller.editStarPerformer(body, StarPerformerId);
        res.status(200).json(successResponse("edit StarPerformer", response, res.statusCode));
    } catch (error) {
     
        res.status(500).json(errorResponse("error in edit StarPerformer", res.statusCode));
    }
});
router.get("/filterStar", checkAuth, async (req, res) => {
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
router.get("/StarPerformerList", checkAuth, async (req, res) => {
    try {
        const controller = new StarPerformerController();
        const response: any[] = await controller.getStarPerformerList();
        res.status(200).json(successResponse("StarPerformer list", response, res.statusCode));
    } catch (error) {

        res.status(500).json(errorResponse("error in StarPerformer list", res.statusCode));
    }
});
router.get("/searchStarPerformer", checkAuth, async (req, res) => {
    try {
const searchValue=req.query.searchValue;
        const controller = new StarPerformerController();
        const response: any[] = await controller.searchStarPerformer(searchValue);
        res.status(200).json(successResponse("StarPerformer list", response, res.statusCode));
    } catch (error) {
      
        res.status(500).json(errorResponse("error in StarPerformer list", res.statusCode));
    }
});

router.get("/StarPerformerInfobyid", checkAuth, async (req, res) => {
    try {
        const StarPerformerId:any = req.query.id;
        const controller = new StarPerformerController();
        const response: any = await controller.getStarPerformerInfoById(StarPerformerId);
        res.status(200).json(successResponse("get StarPerformer", response, res.statusCode));
    } catch (error) {
       
        res.status(500).json(errorResponse("error in get StarPerformer", res.statusCode));
    }
});


router.patch("/deleteStarPerformer", checkAuth, async (req, res) => {
    try {
        const StarPerformerId:any = req.body.StarPerformerId;
        const controller = new StarPerformerController();
        const response: any = await controller.deleteStarPerformer(StarPerformerId);
        res.status(200).json(successResponse("delete StarPerformer", response, res.statusCode));

    } catch (error) {
       
        res.status(500).json(errorResponse("error in delete StarPerformer", res.statusCode));
    }
})

router.post("/createStarPerformerThought", checkAuth, async (req, res) => {
    try {
        
req.body.user=res.locals.user
const body = req.body;
        const controller = new StarPerformerController();
        const response = await controller.createStarPerformerThought(body);
        res.status(200).json(successResponse("create StarPerformer", response, res.statusCode));
    } catch (error) {
       
        res.status(500).json(errorResponse("error in create StarPerformer", res.statusCode));
    }
});
router.patch("/editPerformerThought", checkAuth, async (req, res) => {
    try {
        
        const body = req.body as any;
        const controller = new StarPerformerController();
        const response: any = await controller.editStarPerformerThought(body);
        res.status(200).json(successResponse("edit StarPerformer", response, res.statusCode));
    } catch (error) {
       
        res.status(500).json(errorResponse("error in edit StarPerformer", res.statusCode));
    }
});

router.get("/getStarPerformerListThought", checkAuth, async (req, res) => {
    try {
        const controller = new StarPerformerController();
        const response: any[] = await controller.getStarPerformerListThought();
        res.status(200).json(successResponse("StarPerformer list", response, res.statusCode));
    } catch (error) {
       
        res.status(500).json(errorResponse("error in StarPerformer list", res.statusCode));
    }
});


router.get("/getStarPerformerThoughtById", checkAuth, async (req, res) => {
    try {
        const StarPerformerId:any = req.query.StarPerformerId;
        const controller = new StarPerformerController();
        const response: any = await controller.getStarPerformerThoughtById(StarPerformerId);
        res.status(200).json(successResponse("get StarPerformer", response, res.statusCode));
    } catch (error) {
        
        res.status(500).json(errorResponse("error in get StarPerformer", res.statusCode));
    }
});


router.patch("/deleteStarPerformer", checkAuth, async (req, res) => {
    try {
        const StarPerformerId = req.body.StarPerformerId;
        const controller = new StarPerformerController();
        const response: any = await controller.deleteStarPerformerThought(StarPerformerId);
        res.status(200).json(successResponse("delete StarPerformer", response, res.statusCode));

    } catch (error) {
       
        res.status(500).json(errorResponse("error in deleteStarPerformerThought", res.statusCode));
    }
})



export default router;
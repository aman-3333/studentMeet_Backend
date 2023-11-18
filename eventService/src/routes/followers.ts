import followersController from "../controllers/followersController";
import express from "express";
const router = express.Router();
const checkAuth = require("../middleware/checkAuth");
import {successResponse, errorResponse} from "../services/apiResponse";

router.post("/following",checkAuth,  async (req, res) => {
    try {
        
        const userId = req.body.userId;
        const followingId = req.body.followingId;
        const userType = req.body.userType;
        const controller = new followersController();
        const response: any = await controller.following(userId,followingId,userType);
        res.status(200).json(successResponse("following ", response, res.statusCode));
    } catch (error) {
       
        res.status(500).json(errorResponse("error in following", res.statusCode));
    }
});

router.post("/unfollowing",  async (req, res) => {
    try {
        
        const userId = req.body.userId; 
        const followingId = req.body.followingId;
        const userType = req.body.userType;
        const controller = new followersController();
        const response: any = await controller.unfollowing(userId,followingId,userType);
        res.status(200).json(successResponse("unfollowing", response, res.statusCode));
    } catch (error) {
     
        res.status(500).json(errorResponse("error in unfollowing", res.statusCode));
    }
});

router.get("/getFollowers",  async (req, res) => {
    try {
        const userId = req.query.userId; 
        const userType = req.query.userType; 
        const controller = new followersController();
        const response: any = await controller.getFollowers(userId,userType);
        res.status(200).json(successResponse("getFollowers", response, res.statusCode));
    } catch (error) {
        res.status(500).json(errorResponse("error in getFollowers", res.statusCode));
    }
});

router.get("/getFollowing",  async (req, res) => {
    try {
        const userId = req.query.userId; 
        const userType = req.query.userType; 
        const controller = new followersController();
        const response: any = await controller.getFollowing(userId,userType);
        res.status(200).json(successResponse("getFollowers", response, res.statusCode));
    } catch (error) {
        res.status(500).json(errorResponse("error in getFollowers", res.statusCode));
    }
});



router.get("/getFollowingRequest",  async (req, res) => {
    try {
        
        const userId = req.query.userId;
        const controller = new followersController();
        const response: any = await controller.getFollowingRequestByOther(userId);
        res.status(200).json(successResponse("getFollowers", response, res.statusCode));
    } catch (error) {
     
        res.status(500).json(errorResponse("error in getFollowers", res.statusCode));
    }
});


router.get("/acceptOrRejectFollowingRequest",  async (req, res) => {
    try {
        
        const userId = req.query.userId;
        const controller = new followersController();
        const response: any = await controller.getFollowingRequestByOther(userId);
        res.status(200).json(successResponse("getFollowers", response, res.statusCode));
    } catch (error) {
     
        res.status(500).json(errorResponse("error in getFollowers", res.statusCode));
    }
});



router.get("/request",  async (req, res) => {
    try {
        const userId = req.query.userId; 
        const controller = new followersController();
        const response: any = await controller.getFollowingRequestByOther(userId);
        res.status(200).json(successResponse("getFollowers", response, res.statusCode));
    } catch (error) {
     
        res.status(500).json(errorResponse("error in getFollowers", res.statusCode));
    }
});



export default router;
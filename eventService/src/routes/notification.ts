import express from "express";
const router = express.Router();
const checkAuth = require("../middleware/checkAuth");
import {successResponse, errorResponse} from "../services/apiResponse";
import NotificationController from "../controllers/NotificationController";

router.post("/create",  async (req, res) => {
    try {
req.body.user=res.locals.user
const body = req.body;
        const controller = new NotificationController();
        const response = await controller.createNotification(body);
        res.status(200).json(successResponse("create Notification", response, res.statusCode));
    } catch (error) {
        res.status(500).json(errorResponse("error in create Notification", res.statusCode));
    }
});


router.post("/edit",  async (req, res) => {
    try {
        const body = req.body as any;
        const controller = new NotificationController();
        const response: any = await controller.editNotification(body);
        res.status(200).json(successResponse("edit Notification", response, res.statusCode));
    } catch (error) {
        res.status(500).json(errorResponse("error in edit Notification", res.statusCode));
    }
});


router.get("/list", checkAuth,  async (req, res) => {
    try {
        const controller = new NotificationController();
const userId = res.locals.user._id;
const index = req.query.index;
        const response: any = await controller.getNotificationList(userId,index);
        res.status(200).json(successResponse("Notification list", response, res.statusCode));
    } catch (error) {
      
        res.status(500).json(errorResponse("error in Notification list", res.statusCode));
    }
});




router.get("/infobyid", checkAuth, async (req, res) => {
    try {
        const notificationId: any = req.query.notificationId;
        const controller = new NotificationController();
        const response: any = await controller.getNotificationInfoById(notificationId);
        res.status(200).json(successResponse("getNotification", response, res.statusCode));
    } catch (error) {
      
        res.status(500).json(errorResponse("error in getNotification", res.statusCode));
    }
});



router.post("/delete", checkAuth, async (req, res) => {
    try {
        const notificationId = req.body._id;
        const controller = new NotificationController();
        const response: any = await controller.deleteNotification(notificationId);
        res.status(200).json(successResponse("deleteNotification", response, res.statusCode));

    } catch (error) {
       
        res.status(500).json(errorResponse("error in deleteNotification", res.statusCode));
    }
})


export default router;
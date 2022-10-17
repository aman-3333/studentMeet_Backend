import express from "express";
import { IShop } from "../models/VendorShop";
import { ICategory } from "../models/Category";
import { IUser } from "../models/User";
import { ICity } from "../models/City";
import { IState } from "../models/State";
import VendorController from "../controllers/VendorController";
import StateController from "../controllers/StateController";
import CityController from "../controllers/CityController";
// const Grid = require("gridfs-stream");
import { v4 as uuidv4 } from 'uuid';
uuidv4()
const aws = require('aws-sdk');
const multerS3 = require('multer-s3');
const multer = require('multer');
const path = require('path');
import { successResponse, errorResponse } from "../services/apiResponse"

// const app = express();
// // Import the functions you need from the SDKs you need
// import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
// // TODO: Add SDKs for Firebase products that you want to use
// // https://firebase.google.com/docs/web/setup#available-libraries

// // Your web app's Firebase configuration
// // For Firebase JS SDK v7.20.0 and later, measurementId is optional
// const firebaseConfig = {
//     apiKey: "AIzaSyDlRnABePhven1_tISUd60dMg7sHB1VTtY",
//     authDomain: "midbazar.firebaseapp.com",
//     projectId: "midbazar",
//     storageBucket: "midbazar.appspot.com",
//     messagingSenderId: "145953641607",
//     appId: "1:145953641607:web:40e5182ecb86f0c332d422",
//     measurementId: "G-TKXE8EFZGD"
// };

// // Initialize Firebase
// const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);


let fileupload = require("express-fileupload");

const router = express.Router();
























//////////////////////////////////////////////////////////////////








////////////////////////////////////////////////////////////////////////////////////////////////




///////////////////////////////////////////////////////////////////////////////////////////////////////////

// router.post("/authService/sendotp", async (req, res) => {
//     let guid = await getGuid(req.body);
//     try {
//         const body = req.body
//         const controller = new VendorController();
//         const response = await controller.sendotp(body);
//         return res.send(response);
//     } catch (error) {
//         console.error("error in /sendotp", error);
//         return res.send(error);
//     }
// });
router.post("/sendotp", async (req, res) => {

    try {
        const body = req.body;
        console.log("body", body);

        const controller = new VendorController();
        const response = await controller.sendotp(body);
        console.log("response", response);

        res.status(200).json(successResponse("sendotp ", response, res.statusCode));
    } catch (error) {
        console.error("error in sendotp", error);
        res.status(500).json(errorResponse("error in sendotp", res.statusCode));
    }
});
router.post("/verifyotp", async (req, res) => {
    try {
        const body = req.body;
        const controller = new VendorController();
        const response = await controller.verifyotp(body);
        return res.send(response);
    } catch (error) {
        console.error("error in /verifyotp", error);
        return res.send(error);
    }
})

router.post("/createCity", async (req, res) => {
    try {
        const body = req.body;
        const controller = new CityController();
        const response = await controller.createCity(body);
        res.status(200).json(successResponse("create City", response, res.statusCode));
    } catch (error) {
        console.error("error in signup", error);
        res.status(500).json(errorResponse("error in create City", res.statusCode));
    }
});

router.patch("/City/:id", async (req, res) => {
    try {
        const CityId = req.params.id;
        const body = req.body as ICity;
        const controller = new CityController();
        const response: ICity = await controller.editCity(body, CityId);
        res.status(200).json(successResponse("edit City", response, res.statusCode));
    } catch (error) {
        console.error("error in signup", error);
        res.status(500).json(errorResponse("error in edit City", res.statusCode));
    }
});

router.get("/cityList", async (req, res) => {
    try {
        const stateId = req.query.stateId;
        const controller = new CityController();

        const response: ICity[] = await controller.getCityList(stateId);
        res.status(200).json(successResponse("City list", response, res.statusCode));
    } catch (error) {
        console.error("error in City", error);
        res.status(500).json(errorResponse("error in City list", res.statusCode));
    }
});


router.get("/city/:id", async (req, res) => {
    try {
        const CityId: string = req.params.id;
        const controller = new CityController();
        const response: ICity = await controller.getCityInfoById(CityId);
        res.status(200).json(successResponse("getCity", response, res.statusCode));
    } catch (error) {
        console.error("error in getCity", error);
        res.status(500).json(errorResponse("error in getCity", res.statusCode));
    }
});


router.get("/deleteCity/:id", async (req, res) => {
    try {
        const CityId = req.params.id;
        const controller = new CityController();
        const response: ICity = await controller.deleteCity(CityId);
        res.status(200).json(successResponse("deleteCity", response, res.statusCode));

    } catch (error) {
        console.error("error in deleteCity", error);
        res.status(500).json(errorResponse("error in deleteCity", res.statusCode));
    }
})
//Agent
router.post("/createState", async (req, res) => {
    try {
        const body = req.body;
        const controller = new StateController();
        const response = await controller.createState(body);
        res.status(200).json(successResponse("create State", response, res.statusCode));
    } catch (error) {
        console.error("error in signup", error);
        res.status(500).json(errorResponse("error in create State", res.statusCode));
    }
});

router.patch("/State/:id", async (req, res) => {
    try {
        const StateId = req.params.id;
        const body = req.body as IState;
        const controller = new StateController();
        const response: IState = await controller.editState(body, StateId);
        res.status(200).json(successResponse("edit State", response, res.statusCode));
    } catch (error) {
        console.error("error in signup", error);
        res.status(500).json(errorResponse("error in edit State", res.statusCode));
    }
});

router.get("/StateList", async (req, res) => {
    try {
        const controller = new StateController();
        const response: IState[] = await controller.getStateList();
        res.status(200).json(successResponse("State list", response, res.statusCode));
    } catch (error) {
        console.error("error in signup", error);
        res.status(500).json(errorResponse("error in State list", res.statusCode));
    }
});


router.get("/State/:id", async (req, res) => {
    try {
        const StateId: string = req.params.id;
        const controller = new StateController();
        const response: IState = await controller.getStateInfoById(StateId);
        res.status(200).json(successResponse("get State", response, res.statusCode));
    } catch (error) {
        console.error("error in State", error);
        res.status(500).json(errorResponse("error in get State", res.statusCode));
    }
});


router.get("/deleteState/:id", async (req, res) => {
    try {
        const StateId = req.params.id;
        const controller = new StateController();
        const response: IState = await controller.deleteState(StateId);
        res.status(200).json(successResponse("delete State", response, res.statusCode));

    } catch (error) {
        console.error("error in delete State", error);
        res.status(500).json(errorResponse("error in delete State", res.statusCode));
    }
})






router.post("/Registration", async (req, res) => {
    try {
        const body = req.body as IShop;
        const controller = new VendorController();
        const response: any = await controller.createVendorShop(body);
        res.status(200).json(successResponse("create shop", response, res.statusCode));
    } catch (error) {
        console.error("error in Registration", error);
        res.status(500).json(errorResponse("error in create shop", res.statusCode));
    }
});
router.post("/loginVendor", async (req, res) => {
    try {
        const body = req.body as IShop;
        const controller = new VendorController();
        const response: IShop = await controller.loginVendor(body);
        res.status(200).json(successResponse("loginVendor", response, res.statusCode));
    } catch (error) {
        console.error("error in loginVendor", error);
        res.status(500).json(errorResponse("error in loginVendor", res.statusCode));
    }
});

router.patch("/Update/:id", async (req, res) => {
    try {
        const shopId = req.params.id;
        const body = req.body as IShop;
        const controller = new VendorController();
        const response: IShop = await controller.editVendorShop(body, shopId);
        res.status(200).json(successResponse("edit shop", response, res.statusCode));
    } catch (error) {
        console.error("error in signup", error);
        res.status(500).json(errorResponse("error in edit shop", res.statusCode));
    }
});

router.patch("/vendorActivate", async (req, res) => {
    try {
        const vendorId = req.body.vendorId;
        const status = req.body.status;
        const ownerId = req.body.ownerId;

        const planId = req.body.planId;

        const controller = new VendorController();
        const response: IShop = await controller.vendorActivate(status, ownerId, planId, vendorId);
        res.status(200).json(successResponse("edit shop", response, res.statusCode));
    } catch (error) {
        console.error("error in signup", error);
        res.status(500).json(errorResponse("error in edit shop", res.statusCode));
    }
});

router.get("/getVendorAdminPannel", async (req, res) => {
    try {
        const latitude = req.query.latitude;
        const longitude = req.query.longitude;

        const status = req.query.status;
        const categoryId = req.query.categoryId;
        const stateId = req.query.stateId;
        const cityId = req.query.cityId;
        const limit = req.query.limit;
        const area = req.query.area;
        const skip = req.query.skip;
        const search = req.query.search;
        const controller = new VendorController();
        const response: any = await controller.getVendorAdminPannel(latitude, longitude, area, status,
            categoryId, stateId, cityId, limit, skip, search);
        res.status(200).json(successResponse("shop list", response, res.statusCode));
    } catch (error) {
        console.error("error in signup", error);
        res.status(500).json(errorResponse("error in shop list", res.statusCode));
    }
});




router.get("/vendorInfoById/:id", async (req, res) => {
    try {
        const vendorId: string = req.params.id;
        const controller = new VendorController();
        const response: IShop = await controller.getShopInfoById(vendorId);
        res.status(200).json(successResponse("get vendorInfo", response, res.statusCode));
    } catch (error) {
        console.error("error in vendorInfo", error);
        res.status(500).json(errorResponse("error in vendorInfo", res.statusCode));
    }
});


router.get("/deleteShop/:id", async (req, res) => {
    try {
        const shopId = req.params.id;
        const controller = new VendorController();
        const response: IShop = await controller.deleteShop(shopId);
        res.status(200).json(successResponse("delete shop", response, res.statusCode));

    } catch (error) {
        console.error("error in delete shop", error);
        res.status(500).json(errorResponse("error in delete shop", res.statusCode));
    }
})




export default router;

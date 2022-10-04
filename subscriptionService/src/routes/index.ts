import express from "express";
import { ISubscription } from "../models/Subscription";
import { IPlan } from "../models/Plan";
import { ICategory } from "../models/Category";
import { IUser } from "../models/User";
import { Item } from "../models/Item";
import { ICoupon } from "../models/Coupons";
import SubscriptionController from "../controllers/SubscriptionController";
import CouponController from "../controllers/CouponsController";
import PlanController from "../controllers/PlanController";
import { successResponse, errorResponse } from "../services/apiResponse"

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

const router = express.Router();


//**********Coupons*************** *//
router.post("/Coupon", async (req, res) => {
    try {
        const body = req.body as ICoupon;
        const controller = new CouponController();
        const response: ICoupon = await controller.CreateCoupon(body);
        res.status(200).json(successResponse("create Coupon", response, res.statusCode));
    } catch (error) {
        console.error("error in Coupon", error);
        res.status(500).json(errorResponse("error in create Coupon", res.statusCode));
    }
});
router.post("/createCustomCoupon", async (req, res) => {
    try {
        const body = req.body as ICoupon;
        const controller = new CouponController();
        const response: ICoupon = await controller.createCustomCoupon(body);
        res.status(200).json(successResponse("create createCustomCoupon", response, res.statusCode));
    } catch (error) {
        console.error("error in Coupon", error);
        res.status(500).json(errorResponse("error in createCustomCoupon", res.statusCode));
    }
});

router.patch("/Coupon/:id", async (req, res) => {
    try {
        const CouponId = req.params.id;
        const body = req.body as ICoupon;
        const controller = new CouponController();
        const response: ICoupon = await controller.editCoupon(body, CouponId);
        res.status(200).json(successResponse("edit Coupon", response, res.statusCode));
    } catch (error) {
        console.error("error in Coupon", error);
        res.status(500).json(errorResponse("error in edit Coupon", res.statusCode));
    }
});
router.patch("/pullCoupon", async (req, res) => {
    try {

        const coupon = req.body.coupon;
        const userId = req.body.userId;
        const controller = new CouponController();
        const response = await controller.pullCoupon(coupon, userId);
        res.status(200).json(successResponse("edit Coupon", response, res.statusCode));
    } catch (error) {
        console.error("error in Coupon", error);
        res.status(500).json(errorResponse("error in edit Coupon", res.statusCode));
    }
});
router.patch("/giftCoupon", async (req, res) => {
    try {
        const assignById = req.body.assignById;
        const assignToId = req.body.assignToId;
        const coupon = req.body.coupon;

        const controller = new CouponController();
        const response: any = await controller.couponGift(assignById, assignToId, coupon);
        res.status(200).json(successResponse("couponGigt", response, res.statusCode));
    } catch (error) {
        console.error("error in couponGigt", error);
        res.status(500).json(errorResponse("error in couponGigt", res.statusCode));
    }
});

router.get("/CouponList", async (req, res) => {
    try {
        const controller = new CouponController();
        const response: ICoupon[] = await controller.getCouponList();
        res.status(200).json(successResponse("Coupon list", response, res.statusCode));
    } catch (error) {
        console.error("error in Coupon", error);
        res.status(500).json(errorResponse("error in Coupon list", res.statusCode));
    }
});

router.get("/findCoupon", async (req, res) => {
    try {
        const controller = new CouponController();
        const categoryId = req.query.categoryId;
        const search = req.query.search;
        const response = await controller.findCoupon(categoryId, search);
        res.status(200).json(successResponse("findCoupon", response, res.statusCode));
    } catch (error) {
        console.error("error in findCoupon", error);
        res.status(500).json(errorResponse("error in findCoupon", res.statusCode));
    }
});


router.get("/Coupon/:id", async (req, res) => {
    try {
        const CouponId: string = req.params.id;
        const controller = new CouponController();
        const response: ICoupon = await controller.getCouponInfoById(CouponId);
        res.status(200).json(successResponse("get Coupon", response, res.statusCode));
    } catch (error) {
        console.error("error in Coupon", error);
        res.status(500).json(errorResponse("error in get Coupon", res.statusCode));
    }
});


router.get("/deleteCoupon/:id", async (req, res) => {
    try {
        const CouponId = req.params.id;
        const controller = new CouponController();
        const response: ICoupon = await controller.deleteCoupon(CouponId);
        res.status(200).json(successResponse("delete Coupon", response, res.statusCode));

    } catch (error) {
        console.error("error in delete Coupon", error);
        res.status(500).json(errorResponse("error in deleteCoupon", res.statusCode));
    }
})

//**********Plan*************** */
router.post("/Plan", async (req, res) => {
    try {
        const body = req.body;
        const controller = new PlanController();
        const response = await controller.createPlan(body);
        res.status(200).json(successResponse("create shop", response, res.statusCode));
    } catch (error) {
        console.error("error in Plan", error);
        res.status(500).json(errorResponse("error in create shop", res.statusCode));
    }
});

router.patch("/Plan/:id", async (req, res) => {
    try {
        const id = req.params.id;
        const body = req.body;

        const controller = new PlanController();
        const response = await controller.editPlan(id, body);
        res.status(200).json(successResponse("edit Plan", response, res.statusCode));
    } catch (error) {
        console.error("error in signup", error);
        res.status(500).json(errorResponse("error in edit Plan", res.statusCode));
    }
});

router.get("/Plan/PlanList", async (req, res) => {
    try {
        const controller = new PlanController();
        const response: IPlan[] = await controller.getPlanList();
        res.status(200).json(successResponse("Plan list", response, res.statusCode));
    } catch (error) {
        console.error("error in signup", error);
        res.status(500).json(errorResponse("error in Plan list", res.statusCode));
    }
});

router.post("/buyPlan", async (req, res) => {
    try {
        const coupon = req.body.coupon;
        const planId = req.body.planId;
        const vendorId = req.body.vendorId;
        const planActivate = req.body.planActivate;
        const controller = new PlanController();
        const response = await controller.buyPlan(coupon, planId, vendorId, planActivate);
        res.status(200).json(successResponse("applyCoupon ", response, res.statusCode));
    } catch (error) {
        console.error("error in buyPlan", error);
        res.status(500).json(errorResponse("error in applyCoupon", res.statusCode));
    }
});
router.get("/getPlanInfoById/:id", async (req, res) => {
    try {
        const PlanId: string = req.params.id;
        const controller = new PlanController();
        const response: IPlan = await controller.getPlanInfoById(PlanId);
        res.status(200).json(successResponse("get Plan", response, res.statusCode));
    } catch (error) {
        console.error("error in signup", error);
        res.status(500).json(errorResponse("error in get Plan", res.statusCode));
    }
});


router.get("/deletePlan/:id", async (req, res) => {
    try {
        const PlanId = req.params.id;
        const controller = new PlanController();
        const response: IPlan = await controller.deletePlan(PlanId);
        res.status(200).json(successResponse("delete shop", response, res.statusCode));

    } catch (error) {
        console.error("error in delete shop", error);
        res.status(500).json(errorResponse("error in delete shop", res.statusCode));
    }
})



//**********Subscription*************** */
router.post("/Subscription", async (req, res) => {
    try {
        const body = req.body as ISubscription;
        const controller = new SubscriptionController();
        const response: ISubscription = await controller.createSubscription(body);
        res.status(200).json(successResponse("create Subscription", response, res.statusCode));
    } catch (error) {
        console.error("error in signup", error);
        res.status(500).json(errorResponse("error in create Subscription", res.statusCode));
    }
});

router.patch("/Subscription/:id", async (req, res) => {
    try {
        const SubscriptionId = req.params.id;
        const body = req.body as ISubscription;
        const controller = new SubscriptionController();
        const response: ISubscription = await controller.editSubscription(body, SubscriptionId);
        res.status(200).json(successResponse("edit Subscription", response, res.statusCode));
    } catch (error) {
        console.error("error in signup", error);
        res.status(500).json(errorResponse("error in edit Subscription", res.statusCode));
    }
});



router.get("/SubscriptionList", async (req, res) => {
    try {
        const controller = new SubscriptionController();
        const response: ISubscription[] = await controller.getSubscriptionList();
        res.status(200).json(successResponse("Subscription list", response, res.statusCode));
    } catch (error) {
        console.error("error in signup", error);
        res.status(500).json(errorResponse("error in Subscription list", res.statusCode));
    }
});


router.get("/Subscription/:id", async (req, res) => {
    try {
        const SubscriptionId: string = req.params.id;
        const controller = new SubscriptionController();
        const response: ISubscription = await controller.getSubscriptionInfoById(SubscriptionId);
        res.status(200).json(successResponse("get Subscription", response, res.statusCode));
    } catch (error) {
        console.error("error in signup", error);
        res.status(500).json(errorResponse("error in get Subscription", res.statusCode));
    }
});


router.patch("/deleteSubscription/:id", async (req, res) => {
    try {
        const SubscriptionId = req.params.id;
        const controller = new SubscriptionController();
        const response: ISubscription = await controller.deleteSubscription(SubscriptionId);
        res.status(200).json(successResponse("delete Subscription", response, res.statusCode));

    } catch (error) {
        console.error("error in delete Subscription", error);
        res.status(500).json(errorResponse("error in delete Subscription", res.statusCode));
    }
})




export default router;

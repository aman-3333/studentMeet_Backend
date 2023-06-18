
import { IEvent } from "../models/event";
import {successResponse, errorResponse} from "../services/apiResponse"
import Hashtag, { IHashtag } from "../models/Hashtag";
import { ISubCategory } from "../models/subcategory";
import { ISubSubCategory } from "../models/subSubCategory";
import { IPartner } from "../models/eventPartner";
import Category, { ICategory } from "../models/category";
import express, { Application } from "express";
const app: Application = express();
import eventPartnerController from "../controllers/eventPartnerController";


import HashtagController from "../controllers/HashtagController";
import EventGuildLinesController from "../controllers/guideLines"

import { v4 as uuidv4 } from 'uuid';
uuidv4()
const aws = require('aws-sdk');
const multerS3 = require('multer-s3');
const multer = require('multer');
const path = require('path');
import eventController from "../controllers/eventController"
import AuthController from "../controllers/AuthController";
import { AnyAaaaRecord } from "dns";
import PaymentController from "../controllers/PaymentController";
//import AuthController from "../controllers/AuthController";
const router = express.Router();



// /////////////////////////////////////chat route///////////////////////////////////////////////////////////



























/////////////////////////////////////////////////////////////////////////////////////////////////////////////
const s31 = new aws.S3({
    accessKeyId: "AKIAT7AWQUCXUTJXNU7S",
    secretAccessKey: "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",
})


let storage = multer.memoryStorage({
    destination: function (req: any, file: any, callback: any) {
        callback(null, '')
    }
})

let upload = multer({ storage }).single('galleryImage')







var s3 = new aws.S3({
  
   accessKeyId: "AKIAT7AWQUCXUTJXNU7S",
   secretAccessKey: "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",

   Bucket: "backendservicestudentmeet"
})
var upload1 = multer({
   storage: multerS3({
       s3: s3,
       bucket:"backendservicestudentmeet",
       metadata: function (req:any, file:any, cb:any) {
           cb(null, { fieldName: file.fieldname });
       },
       key: function (req:any, file:any, cb:any) {
           cb(null, Date.now().toString())
       }
   })
})
 
//Uploading single File to aws s3 bucket
router.post('/upload', upload1.single('file'), function (req:any, res:any ){
   res.send({
       data: req.files,
       msg: 'Successfully uploaded ' + req.files + ' files!'
   })
})
 
//Uploading Multiple Files to aws s3 bucket
router.post('/uploadfile', upload1.array('file', 50), function (req:any, res:any) {
   
    
   res.send({
       data: req.files,
       msg: 'Successfully uploaded ' + req.files.length + ' files!'
   })
})
 







////////////////////////////////////////////////////////////////////////////////////////////////























//////////////////////////////////////////////////////////////////



//////////////////auth//////////////////////////////////









//////////////////////////////////////////////////////////////////////




/////////////////////////////////////////////////eventguildlines////////////////////////


//////////////////////////////////////////////////////////////////////////
router.post("/createevent", async (req, res) => {
    try {
        const body = req.body as IEvent;

        const controller = new eventController();
        const response: IEvent = await controller.createevent(body);
        res.status(200).json(successResponse("create event", response, res.statusCode));
    } catch (error) {

        res.status(500).json(errorResponse("error in create event", res.statusCode));
    }
});



router.patch("/editevent/:id", async (req, res) => {
    try {
        const eventId = req.params.id;

        const body = req.body as IEvent;
        const controller = new eventController();
        const response: IEvent = await controller.editevent(body, eventId);
        res.status(200).json(successResponse("event update", response, res.statusCode));
    } catch (error) {
    
        res.status(500).json(errorResponse("error in event update", res.statusCode));
    }
});

router.get("/getallevent", async (req, res) => {
    try {
        const controller = new eventController();
        const type = req.query.type;
        const response: IEvent[] = await controller.geteventEventScreen(type);
        res.status(200).json(successResponse("get event", response, res.statusCode));
    } catch (error) {
       
        res.status(500).json(errorResponse("error in get event", res.statusCode));
    }
});
router.get("/geteventParticipants", async (req, res) => {
    try {
        const controller = new eventController();
        const eventId = req.query.eventId;
        const response: IEvent[] = await controller.getParticipantsList(eventId);
        res.status(200).json(successResponse("getParticipantsList", response, res.statusCode));
    } catch (error) {
       
        res.status(500).json(errorResponse("getParticipantsList", res.statusCode));
    }
});


router.get("/getEventByuserId", async (req, res) => {
    try {
        const controller = new eventController();
        const userId = req.query.userId;
        const response:any = await controller.getEventByUserId(userId);
        res.status(200).json(successResponse("get geteventbyuserId", response, res.statusCode));
    } catch (error) {
      
        res.status(500).json(errorResponse("error in get geteventbyuserId", res.statusCode));
    }
  
    
    
});
router.get("/getEventCreateByUser", async (req, res) => {
    try {
        const controller = new eventController();
        const userId = req.query.userId;
        const response:any = await controller.getEventCreateByUser(userId);
        res.status(200).json(successResponse("get EventCreateByUser", response, res.statusCode));
    } catch (error) {
        
        res.status(500).json(errorResponse("error in get EventCreateByUser", res.statusCode));
    }
});




router.get("/geteventinfobyid", async (req, res) => {
    try {
        const eventId = req.query.eventId;
        const status = req.query.status;
        const controller = new eventController();
        const response: any = await controller.geteventInfo(eventId,status);
        res.status(200).json(successResponse("get event by Id ", response, res.statusCode));
    } catch (error) {
   
        res.status(500).json(errorResponse("error in get event by Id", res.statusCode));
    }
});
router.get("/getFriendActivity", async (req, res) => {
    try {
        const userId = req.query.userId;
       
        const controller = new eventController();
        const response: any = await controller.getFriendActivity(userId);
        res.status(200).json(successResponse("getFriendActivity", response, res.statusCode));
    } catch (error) {
   
        res.status(500).json(errorResponse("error in getFriendActivity", res.statusCode));
    }
});

router.post("/eventActivity", async (req, res) => {
    try{
        
        const userId:any =req.body.userId;
        const eventId=req.body.eventId;
       
         const status=req.body.status; 
         const hashtagcomment=req.body.eventcomment;
        const hashtagcommentId=req.body.eventcommentId;
        const body=req.body;
        const controller=new eventController();
        const response:any =await controller.eventActivity(userId,eventId,  status,hashtagcomment,hashtagcommentId, body);
        res.status(200).json(successResponse("eventActivity",response,res.statusCode));
    }catch(error) {
    
        res.status(500).json(errorResponse("error in eventActivity", res.statusCode));
    }
})
router.get("/getActivity", async (req, res) => {
    try{
        
        const status:any =req.query.status;
        const userId=req.query.userId;
        const controller=new eventController();
        const response:any =await controller.getActivity(userId,status);
        res.status(200).json(successResponse("getFollowing",response,res.statusCode));
    }catch(error) {
       
        res.status(500).json(errorResponse("error in getFollowing", res.statusCode));
    }
})
router.get("/removeActivity", async (req, res) => {
    try{
        
        
        const status:any =req.query.status;
        const userId=req.query.userId;
        const removeUserId=req.query.removeUserId;
        const controller=new eventController();
        const response:any =await controller.RemoveActivity(userId,status,removeUserId);
        res.status(200).json(successResponse("getFollowing",response,res.statusCode));
    }catch(error) {
       
        res.status(500).json(errorResponse("error in getFollowing", res.statusCode));
    }
})

router.get("/readActivity", async (req, res) => {
    try{
        
        const status:any =req.query.status;
        const eventId=req.query.eventId;
        const controller=new eventController();
        const response:any =await controller.readActivity(eventId,status);
        res.status(200).json(successResponse("readActivity",response,res.statusCode));
    }catch(error) {
      
        res.status(500).json(errorResponse("error in readActivity", res.statusCode));
    }
})
router.post("/eventCreateBYOrganizer", async (req, res) => {
    try {
        const body = req.body;
        const controller = new eventController();
        const response: any = await controller.eventCreateBYOrganizer(body);
        res.status(200).json(successResponse("eventCreateBYOrganizer ", response, res.statusCode));
    } catch (error) {
      
        res.status(500).json(errorResponse("error in eventCreateBYOrganizer", res.statusCode));
    }
});
router.post("/eventOrganize", async (req, res) => {
    try {
      
        
        const body = req.body;
        const eventId = req.body.eventId; 
        const organizerId = req.body.organizerId;
         const formId = req.body.formId;
          const status = req.body.status;
        const controller = new eventController();
        const response: any = await controller.applyForEventOrganize(eventId, organizerId, formId, status);
        res.status(200).json(successResponse("eventCreateBYOrganizer ", response, res.statusCode));
    } catch (error) {
        
        res.status(500).json(errorResponse("error in eventCreateBYOrganizer", res.statusCode));
    }
});


router.post("/following", async (req, res) => {
    try {
        
        const userId = req.body.userId; 
        const followingId = req.body.followingId;
      
        const controller = new eventController();
        const response: any = await controller.following(userId,followingId);
        res.status(200).json(successResponse("eventCreateBYOrganizer ", response, res.statusCode));
    } catch (error) {
       
        res.status(500).json(errorResponse("error in eventCreateBYOrganizer", res.statusCode));
    }
});
router.post("/unfollowing", async (req, res) => {
    try {
        
        const userId = req.body.userId; 
        const followingId = req.body.followingId;
      
        const controller = new eventController();
        const response: any = await controller.unfollowing(userId,followingId);
        res.status(200).json(successResponse("eventCreateBYOrganizer ", response, res.statusCode));
    } catch (error) {
     
        res.status(500).json(errorResponse("error in eventCreateBYOrganizer", res.statusCode));
    }
});

router.post("/applyEvent", async (req, res) => {
    try {
        const eventId = req.body.eventId; 
        const userId = req.body.userId; 
        const status = req.body.status; 
        const controller = new eventController();
        const response: any = await controller.bookEvent(eventId,userId,status);
        res.status(200).json(successResponse("applyEvent ", response, res.statusCode));
    } catch (error) {

        res.status(500).json(errorResponse("error in applyEvent", res.statusCode));
    }
});
router.get("/filterEvent", async (req, res) => {
    try {
       
        const sort = req.query.sort;
        const type = req.query.type;
        const category = req.query.category;
        const subCategory = req.query.subCategory; 
         const subSubCategory = req.query.subSubCategory; 
         const limit = req.query.limit;
           const skip = req.query.skip;
           const search = req.query.search;
        const controller = new eventController();
        const response: any = await controller.filterEvent(type,sort, category, subCategory, subSubCategory, limit, skip, search);
        res.status(200).json(successResponse("filterEvent ", response, res.statusCode));
    } catch (error) {
       
        res.status(500).json(errorResponse("error filterEvent", res.statusCode));
    }
});
router.patch("/feadBackEvent", async (req, res) => {
    try {
        const body = req.body;
        const eventId = req.body.eventId;
        const reting = req.body.reting;
        const feadBackComment = req.body.userId;
        const controller = new eventController();
        const response: IEvent = await controller.feadBackEvent(body,eventId, reting,feadBackComment);
        res.status(200).json(successResponse("feadBackEvent event", response, res.statusCode));
    } catch (error) {
        
        res.status(500).json(errorResponse("error in feadBackEvent event", res.statusCode));
    }
})


router.post("/eventorganizerteam", async (req, res) => {
    try {
        const organizerId = req.body.organizerId;
        const eventId = req.body.eventId;
        const suborganizerId = req.body.suborganizerId;
        const controller = new eventController();
        const response: IEvent = await controller.createEventOrganizerTeam(organizerId,eventId,suborganizerId);
        res.status(200).json(successResponse("delete event", response, res.statusCode));
    } catch (error) {
      
        res.status(500).json(errorResponse("error in delete event", res.statusCode));
    }
})
router.patch("/deleteevent/:id", async (req, res) => {
    try {
        const eventId = req.body.eventId;
        const userId = req.body.userId;
        const controller = new eventController();
        const response: IEvent = await controller.deleteevent(eventId, userId);
        res.status(200).json(successResponse("delete event", response, res.statusCode));
    } catch (error) {
      
        res.status(500).json(errorResponse("error in delete event", res.statusCode));
    }
})

router.patch("/deleteevent/:id", async (req, res) => {
    try {
        const eventId = req.body.eventId;
        const userId = req.body.userId;
        const controller = new eventController();
        const response: IEvent = await controller.deleteevent(eventId, userId);
        res.status(200).json(successResponse("delete event", response, res.statusCode));
    } catch (error) {
      
        res.status(500).json(errorResponse("error in delete event", res.statusCode));
    }
})






























// router.post("/Coupon", async (req, res) => {
//     try {
//         const body = req.body as ICoupon;
//         const controller = new CouponController();
//         const response: ICoupon = await controller.CreateCoupon(body);
//         res.status(200).json(successResponse("create Coupon", response, res.statusCode));
//     } catch (error) {
//         console.error("error in Coupon", error);
//         res.status(500).json(errorResponse("error in create Coupon", res.statusCode));
//     }
// });
// router.post("/createCustomCoupon", async (req, res) => {
//     try {
//         const body = req.body as ICoupon;
//         const controller = new CouponController();
//         const response: ICoupon = await controller.createCustomCoupon(body);
//         res.status(200).json(successResponse("create createCustomCoupon", response, res.statusCode));
//     } catch (error) {
//         console.error("error in Coupon", error);
//         res.status(500).json(errorResponse("error in createCustomCoupon", res.statusCode));
//     }
// });

// router.patch("/Coupon/:id", async (req, res) => {
//     try {
//         const CouponId = req.params.id;
//         const body = req.body as ICoupon;
//         const controller = new CouponController();
//         const response: ICoupon = await controller.editCoupon(body, CouponId);
//         res.status(200).json(successResponse("edit Coupon", response, res.statusCode));
//     } catch (error) {
//         console.error("error in Coupon", error);
//         res.status(500).json(errorResponse("error in edit Coupon", res.statusCode));
//     }
// });
// router.patch("/pullCoupon", async (req, res) => {
//     try {

//         const coupon = req.body.coupon;
//         const userId = req.body.userId;
//         const controller = new CouponController();
//         const response = await controller.pullCoupon(coupon, userId);
//         res.status(200).json(successResponse("edit Coupon", response, res.statusCode));
//     } catch (error) {
//         console.error("error in Coupon", error);
//         res.status(500).json(errorResponse("error in edit Coupon", res.statusCode));
//     }
// });
// router.patch("/giftCoupon", async (req, res) => {
//     try {
//         const assignById = req.body.assignById;
//         const assignToId = req.body.assignToId;
//         const coupon = req.body.coupon;

//         const controller = new CouponController();
//         const response: any = await controller.couponGift(assignById, assignToId, coupon);
//         res.status(200).json(successResponse("couponGigt", response, res.statusCode));
//     } catch (error) {
//         console.error("error in couponGigt", error);
//         res.status(500).json(errorResponse("error in couponGigt", res.statusCode));
//     }
// });

// router.get("/CouponList", async (req, res) => {
//     try {
//         const controller = new CouponController();
//         const response: ICoupon[] = await controller.getCouponList();
//         res.status(200).json(successResponse("Coupon list", response, res.statusCode));
//     } catch (error) {
//         console.error("error in Coupon", error);
//         res.status(500).json(errorResponse("error in Coupon list", res.statusCode));
//     }
// });

// router.get("/findCoupon", async (req, res) => {
//     try {
//         const controller = new CouponController();
//         const categoryId = req.query.categoryId;
//         const search = req.query.search;
//         const response = await controller.findCoupon(categoryId, search);
//         res.status(200).json(successResponse("findCoupon", response, res.statusCode));
//     } catch (error) {
//         console.error("error in findCoupon", error);
//         res.status(500).json(errorResponse("error in findCoupon", res.statusCode));
//     }
// });


// router.get("/Coupon/:id", async (req, res) => {
//     try {
//         const CouponId: string = req.params.id;
//         const controller = new CouponController();
//         const response: ICoupon = await controller.getCouponInfoById(CouponId);
//         res.status(200).json(successResponse("get Coupon", response, res.statusCode));
//     } catch (error) {
//         console.error("error in Coupon", error);
//         res.status(500).json(errorResponse("error in get Coupon", res.statusCode));
//     }
// });


// router.get("/deleteCoupon/:id", async (req, res) => {
//     try {
//         const CouponId = req.params.id;
//         const controller = new CouponController();
//         const response: ICoupon = await controller.deleteCoupon(CouponId);
//         res.status(200).json(successResponse("delete Coupon", response, res.statusCode));

//     } catch (error) {
//         console.error("error in delete Coupon", error);
//         res.status(500).json(errorResponse("error in deleteCoupon", res.statusCode));
//     }
// })

// //**********Plan*************** */
// router.post("/Plan", async (req, res) => {
//     try {
//         const body = req.body;
//         const controller = new PlanController();
//         const response = await controller.createPlan(body);
//         res.status(200).json(successResponse("create shop", response, res.statusCode));
//     } catch (error) {
//         console.error("error in Plan", error);
//         res.status(500).json(errorResponse("error in create shop", res.statusCode));
//     }
// });

// router.patch("/Plan/:id", async (req, res) => {
//     try {
//         const id = req.params.id;
//         const body = req.body;

//         const controller = new PlanController();
//         const response = await controller.editPlan(id, body);
//         res.status(200).json(successResponse("edit Plan", response, res.statusCode));
//     } catch (error) {
//         console.error("error in signup", error);
//         res.status(500).json(errorResponse("error in edit Plan", res.statusCode));
//     }
// });

// router.get("/Plan/PlanList", async (req, res) => {
//     try {
//         const controller = new PlanController();
//         const response: IPlan[] = await controller.getPlanList();
//         res.status(200).json(successResponse("Plan list", response, res.statusCode));
//     } catch (error) {
//         console.error("error in signup", error);
//         res.status(500).json(errorResponse("error in Plan list", res.statusCode));
//     }
// });

// router.post("/buyPlan", async (req, res) => {
//     try {
//         const coupon = req.body.coupon;
//         const planId = req.body.planId;
//         const eventPartnerId = req.body.eventPartnerId;
//         const planActivate = req.body.planActivate;
//         const controller = new PlanController();
//         const response = await controller.buyPlan(coupon, planId, eventPartnerId, planActivate);
//         res.status(200).json(successResponse("applyCoupon ", response, res.statusCode));
//     } catch (error) {
//         console.error("error in buyPlan", error);
//         res.status(500).json(errorResponse("error in applyCoupon", res.statusCode));
//     }
// });
// router.get("/getPlanInfoById/:id", async (req, res) => {
//     try {
//         const PlanId: string = req.params.id;
//         const controller = new PlanController();
//         const response: IPlan = await controller.getPlanInfoById(PlanId);
//         res.status(200).json(successResponse("get Plan", response, res.statusCode));
//     } catch (error) {
//         console.error("error in signup", error);
//         res.status(500).json(errorResponse("error in get Plan", res.statusCode));
//     }
// });


// router.get("/deletePlan/:id", async (req, res) => {
//     try {
//         const PlanId = req.params.id;
//         const controller = new PlanController();
//         const response: IPlan = await controller.deletePlan(PlanId);
//         res.status(200).json(successResponse("delete shop", response, res.statusCode));

//     } catch (error) {
//         console.error("error in delete shop", error);
//         res.status(500).json(errorResponse("error in delete shop", res.statusCode));
//     }
// })



// //**********Subscription*************** */
// router.post("/Subscription", async (req, res) => {
//     try {
//         const body = req.body as ISubscription;
//         const controller = new SubscriptionController();
//         const response: ISubscription = await controller.createSubscription(body);
//         res.status(200).json(successResponse("create Subscription", response, res.statusCode));
//     } catch (error) {
//         console.error("error in signup", error);
//         res.status(500).json(errorResponse("error in create Subscription", res.statusCode));
//     }
// });

// router.patch("/Subscription/:id", async (req, res) => {
//     try {
//         const SubscriptionId = req.params.id;
//         const body = req.body as ISubscription;
//         const controller = new SubscriptionController();
//         const response: ISubscription = await controller.editSubscription(body, SubscriptionId);
//         res.status(200).json(successResponse("edit Subscription", response, res.statusCode));
//     } catch (error) {
//         console.error("error in signup", error);
//         res.status(500).json(errorResponse("error in edit Subscription", res.statusCode));
//     }
// });



// router.get("/SubscriptionList", async (req, res) => {
//     try {
//         const controller = new SubscriptionController();
//         const response: ISubscription[] = await controller.getSubscriptionList();
//         res.status(200).json(successResponse("Subscription list", response, res.statusCode));
//     } catch (error) {
//         console.error("error in signup", error);
//         res.status(500).json(errorResponse("error in Subscription list", res.statusCode));
//     }
// });


// router.get("/Subscription/:id", async (req, res) => {
//     try {
//         const SubscriptionId: string = req.params.id;
//         const controller = new SubscriptionController();
//         const response: ISubscription = await controller.getSubscriptionInfoById(SubscriptionId);
//         res.status(200).json(successResponse("get Subscription", response, res.statusCode));
//     } catch (error) {
//         console.error("error in signup", error);
//         res.status(500).json(errorResponse("error in get Subscription", res.statusCode));
//     }
// });


// router.patch("/deleteSubscription/:id", async (req, res) => {
//     try {
//         const SubscriptionId = req.params.id;
//         const controller = new SubscriptionController();
//         const response: ISubscription = await controller.deleteSubscription(SubscriptionId);
//         res.status(200).json(successResponse("delete Subscription", response, res.statusCode));

//     } catch (error) {
//         console.error("error in delete Subscription", error);
//         res.status(500).json(errorResponse("error in delete Subscription", res.statusCode));
//     }
// })
















































///////////////////////////////////////////////////////////////////////////////////////////////////////////




router.post("/eventPartner/Registration", async (req, res) => {
    try {
        const body = req.body as IPartner;
        const controller = new eventPartnerController();
        const response: any = await controller.createeventPartner(body);
        res.status(200).json(successResponse("create shop", response, res.statusCode));
    } catch (error) {

        res.status(500).json(errorResponse("error in create shop", res.statusCode));
    }
});

router.patch("/editeventPartner/:id", async (req, res) => {
    try {
        const eventPartnerId:any= req.params.id;
        const body = req.body as IPartner;
        const controller = new eventPartnerController();
        const response: IPartner = await controller.editeventPartner(body, eventPartnerId);
        res.status(200).json(successResponse("edit shop", response, res.statusCode));
    } catch (error) {
    
        res.status(500).json(errorResponse("error in edit shop", res.statusCode));
    }
});

router.get("/geteventPartnerShopByUser/:userId", async (req, res) => {
    try {
        const userId = req.params.userId;
        const controller = new eventPartnerController();
        const response: IPartner = await controller.geteventPartnerByUserId(userId);
        res.status(200).json(successResponse("get eventPartner shop", response, res.statusCode));
    } catch (error) {
       
        res.status(500).json(errorResponse("error in fetching eventPartner shop", res.statusCode));
    }
});
/////////////////////////////////////city///////////////////////////////////////////////////////////

//Agent




/////////////////////////////////////////STAR PERFORMER////////////////////////


/////////////////////////////////////////////////////////////////////////////////////////////////
router.post("/logineventPartner", async (req, res) => {
    try {
        const body = req.body as IPartner;
        const controller = new eventPartnerController();
        const response: IPartner = await controller.logineventPartner(body);
        res.status(200).json(successResponse("logineventPartner", response, res.statusCode));
    } catch (error) {
        
        res.status(500).json(errorResponse("error in logineventPartner", res.statusCode));
    }
});



router.patch("/eventPartnerActivate", async (req, res) => {
    try {
        const eventPartnerId = req.body.eventPartnerId;
        const status = req.body.status;
        const ownerId = req.body.ownerId;

        const planId = req.body.planId;

        const controller = new eventPartnerController();
        const response: IPartner = await controller.eventPartnerActivate(status, ownerId, planId, eventPartnerId);
        res.status(200).json(successResponse("edit shop", response, res.statusCode));
    } catch (error) {
      
        res.status(500).json(errorResponse("error in edit shop", res.statusCode));
    }
});

router.get("/geteventPartnerAdminPannel", async (req, res) => {
    try {
        const latitude = req.query.latitude;
        const longitude = req.query.longitude;

        const status = req.query.status;
        const categoryId = req.query.categoryId;
        const StarPerformerId = req.query.stateId;
        const cityId = req.query.cityId;
        const stateId = req.query.stateId;
        const limit = req.query.limit;
        const area = req.query.area;
        const skip = req.query.skip;
        const search = req.query.search;
        const controller = new eventPartnerController();
        const response: any = await controller.geteventPartnerAdminPannel(latitude, longitude, area, status,
            categoryId, stateId, cityId, limit, skip, search);
        res.status(200).json(successResponse("shop list", response, res.statusCode));
    } catch (error) {
       
        res.status(500).json(errorResponse("error in shop list", res.statusCode));
    }
});




router.get("/eventpartnerInfoById", async (req, res) => {
    try {
        const partnerId: any = req.query.partnerId;
        const controller = new eventPartnerController();
        const response: any = await controller.geteventPartnerInfoById(partnerId);
        res.status(200).json(successResponse("get shop", response, res.statusCode));
    } catch (error) {
       
        res.status(500).json(errorResponse("error in get shop", res.statusCode));
    }
});


router.get("/deleteShop/:id", async (req, res) => {
    try {
        const shopId = req.params.id;
        const controller = new eventPartnerController();
        const response: IPartner = await controller.deleteeventPartner(shopId);
        res.status(200).json(successResponse("delete shop", response, res.statusCode));

    } catch (error) {
        
        res.status(500).json(errorResponse("error in delete shop", res.statusCode));
    }
})

//////////////////////////////razorpay/////////////////////////////////
router.post("/checkoutPayment", async (req, res) => {
    try {
      const bookEventId = req.body.bookEventId;
      const controller = new PaymentController();
      const response:any = await controller.createbookEvent(bookEventId);
      res.status(200).json(successResponse("createorder", response, res.statusCode));
    } catch (error) {
       
        res.status(500).json(errorResponse("error in createorder", res.statusCode));
    }
});
router.post("/paymentCapture", async (req, res) => {
    try {
      const data = req.body;
      const controller = new PaymentController();
      const response:any = await controller.paymentCallback(data);
      res.status(200).json(successResponse("paymentCallback", response, res.statusCode));
    } catch (error) {
      
        res.status(500).json(errorResponse("error in paymentCallback", res.statusCode));
    }
});
// //////////////////////////////////////////////post//////////////////////////////////////////////////




export default router;

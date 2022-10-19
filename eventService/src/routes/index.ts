import express from "express";
import { IEvent } from "../models/event";
import {successResponse, errorResponse} from "../services/apiResponse"
import Hashtag, { IHashtag } from "../models/Hashtag";
import { ISubCategory } from "../models/Subcategory";
import { ISubSubCategory } from "../models/subSubCategory";
import { IPartner } from "../models/eventPartner";
import Category, { ICategory } from "../models/Category";
import  { IInstitute } from "../models/Institute";
import  { IUserrole} from "../models/UserRole";
import { ICity } from "../models/City";
import { IState } from "../models/State";
import { IEventGuildLines } from "../models/CustomEventGuidlines";
import eventPartnerController from "../controllers/eventPartnerController";
import StateController from "../controllers/StateController";
import UserroleController from "../controllers/userRoleController"
import InstituteController from "../controllers/InstituteController";
import HashtagController from "../controllers/HashtagController";
import CityController from "../controllers/CityController";
import CategoryController from "../controllers/CategoryController";
import EventGuildLinesController from "../controllers/CustomEventGuildLines"

import { v4 as uuidv4 } from 'uuid';
uuidv4()
const aws = require('aws-sdk');
const multerS3 = require('multer-s3');
const multer = require('multer');
const path = require('path');
import eventController from "../controllers/eventController"
import AuthController from "../controllers/AuthController";
//import AuthController from "../controllers/AuthController";
const router = express.Router();



// ////////////////////////////////////////////////////////////////////////////////////////////////




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

router.post('/uploadSingle', upload, (req:any, res:any) => {

    let myFile: any = req.file?.originalname.split(".")
    const fileType = myFile[myFile?.length - 1]

    const params = {
        Bucket: "midbazar-upload",
        Key: `${uuidv4()
            }.${fileType}`,
        Body: req.file?.buffer
    }

    s31.upload(params, (error: any, data: any) => {
        if (error) {
            res.status(500).send(error)
        }

        res.status(200).send(data)
    })
})

// var aws = require('aws-sdk')
// //////////////////////////////////////////////////////////////////////////////
// var multer1 = require('multer')
// var multerS3 = require('multer-s3')
// var app = express()
// var s31 = new aws.S3({
//     accessKeyId: "AKIA4SMDJLA35K6JWEUC",
//     secretAccessKey: "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",
//     Bucket: "midbazar-upload"
// })
// var upload1 = multer1({
//     storage: multerS3({
//         s3: s31,
//         bucket: "midbazar-upload",
//         metadata: function (req: any, file: any, cb: any) {
//             cb(null, { fieldName: file.fieldname });
//         },
//         key: function (req: any, file: any, cb: any) {
//             cb(null, Date.now().toString())
//         }
//     })
// })

// //Uploading single File to aws s3 bucket
// router.post('/upload', upload1.single('image'), function (req, res, next) {
//     res.send({
//         data: req.files,
//         msg: 'Successfully uploaded ' + req.files + 'files!'
//     })
// })

// //Uploading Multiple Files to aws s3 bucket
// router.post('/uploadArray', upload1.array('image', 30), function (req, res, next) {
//     res.send({
//         data: req.files,
//         msg: 'Successfully uploaded ' + req.files?.length + 'files!'
//     })
// })

////////////////////////////////////////////////////////////////////////////////////////////////

const s3 = new aws.S3({
    accessKeyId: "AKIAT7AWQUCXUTJXNU7S",
    secretAccessKey: "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",

    Bucket: "midbazar-upload"
});

/**
 * Single Upload
 */
const profileImgUpload = multer({
    storage: multerS3({
        s3: s3,
        bucket: "midbazar-upload",
        acl: 'public-read',
        key: function (req: any, file: any, cb: any) {
            cb(null, path.basename(file.originalname, path.extname(file.originalname)) + '-' + Date.now() + path.extname(file.originalname))
        }
    }),
    limits: { fileSize: 2000000 }, // In bytes: 2000000 bytes = 2 MB
    fileFilter: function (req: any, file: any, cb: any) {
        checkFileType(file, cb);
    }
}).single('profileImage');

/**
 * Check File Type
 * @param file
 * @param cb
 * @return {*}
 */
function checkFileType(file: any, cb: any) {
    // Allowed ext
    const filetypes = /jpeg|jpg|png|gif/;
    // Check ext
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    // Check mime
    const mimetype = filetypes.test(file.mimetype);
    if (mimetype && extname) {
        return cb(null, true);
    } else {
        cb('Error: Images Only!');
    }
}

/**
 * @route POST /api/profile/business-img-upload
 * @desc Upload post image
 * @access public
 */
// router.post('/profile-img-upload', (req, res) => {
//     profileImgUpload(req, res, (error: any) => {
//         console.log('requestOkokok', req.file);
//         console.log('error', error);
//         if (error) {
//             console.log('errors', error);
//             res.json({ error: error });
//         } else {
//             // If File not found
//             if (req.file === undefined) {
//                 console.log('Error: No File Selected!');
//                 res.json('Error: No File Selected');
//             } else {
//                 // If Success
//                 const imageName = req.file.key;
//                 const imageLocation = req.file.location;
//                 // Save the file name into database into profile model
//                 res.json({
//                     image: imageName,
//                     location: imageLocation
//                 });
//             }
//         }
//     });
// });

/**
 * BUSINESS GALLERY IMAGES
 * MULTIPLE FILE UPLOADS
 */
// Multiple File Uploads ( max 4 )
const uploadsBusinessGallery = multer({
    storage: multerS3({
        s3: s3,
        bucket: "backendservicestudentmeet",

        key: function (req: any, file: any, cb: any) {
            cb(null, path.basename(file.originalname, path.extname(file.originalname)) + '-' + Date.now() + path.extname(file.originalname))
        }
    }),
    limits: { fileSize: 2000000 }, // In bytes: 2000000 bytes = 2 MB
    fileFilter: function (req: any, file: any, cb: any) {
        checkFileType(file, cb);
    }
}).array('galleryImage', 40);
/**
 * @route POST /api/profile/multiple-file-upload
 * @desc Upload business Gallery images
 * @access public
 */
router.post('/multiple-file-upload', (req:any, res:any) => {
    uploadsBusinessGallery(req, res, (error: any) => {
        console.log('files', req.files);
        if (error) {
            console.log('errors', error);
            res.json({ error: error });
        } else {
            // If File not found
            if (req.files === undefined) {
                console.log('Error: No File Selected!');
                res.json('Error: No File Selected');
            } else {
                // If Success
                let fileArray: any = req.files,
                    fileLocation;
                const galleryImgLocationArray = [];
                for (let i = 0; i < fileArray.length; i++) {
                    fileLocation = fileArray[i].location;
                    console.log('filenm', fileLocation);
                    galleryImgLocationArray.push(fileLocation)
                }
                // Save the file name into database
                res.json({
                    filesArray: fileArray,
                    locationArray: galleryImgLocationArray
                });
            }
        }
    });
});























//////////////////////////////////////////////////////////////////



//////////////////auth//////////////////////////////////

router.post("/sendotp", async (req, res) => {
 
    try {
        const body = req.body
        const controller = new AuthController();
        const response = await controller.sendotp(body);
        res.status(200).json(successResponse("sendotp", response, res.statusCode));
    } catch (error) {
        console.error("error in sendotp", error);
        res.status(500).json(errorResponse("error in sendotp", res.statusCode));
    }
})
router.post("/sendotpbyapi", async (req, res) => {
 
    try {
        const body:any = req.body
        const controller = new AuthController();
        const response = await controller.sendotpByApi(body);
        res.status(200).json(successResponse("sendotpbyapi", response, res.statusCode));
    } catch (error) {
        console.error("error in sendotpbyapi", error);
        res.status(500).json(errorResponse("error in sendotpbyapi", res.statusCode));
    }
})


router.post("/verifyotpByApi", async (req, res) => {
    try {
        const body = req.body ;
        const controller = new AuthController();
        const response = await controller.verifyotpByApi(body);
        res.status(200).json(successResponse("verifyotpByApi", response, res.statusCode));
    } catch (error) {
        console.error("error in verifyotpByApi", error);
        res.status(500).json(errorResponse("error in verifyotpByApi", res.statusCode));
    }
})
router.post("/verifyotp", async (req, res) => {
    try {
        const body = req.body ;
        const controller = new AuthController();
        const response:any = await controller.verifyotp(body);
        res.status(200).json(successResponse("verifyotp", response, res.statusCode));
    } catch (error) {
        console.error("error in verifyotp", error);
        res.status(500).json(errorResponse("error in verifyotp", res.statusCode));
    }
})
router.patch("/editprofile", async (req, res) => {
    try {
        const body = req.body ;
        const controller = new AuthController();
        const response = await controller.editProfile(body);
        res.status(200).json(successResponse("editprofile", response, res.statusCode));
    } catch (error) {
        console.error("error in editProfile", error);
        res.status(500).json(errorResponse("error in editProfile", res.statusCode));
    }
})


router.get("/viewProfile", async (req, res) => {
    try {
        const userId = req.query.userId ;
        const controller = new AuthController();
        const response = await controller.viewProfile(userId);
        res.status(200).json(successResponse("viewProfile", response, res.statusCode));
    } catch (error) {
        console.error("error in viewProfile", error);
        res.status(500).json(errorResponse("error in viewProfile", res.statusCode));
    }
});






//////////////////////////////////////////////////////////////////////




/////////////////////////////////////////////////eventguildlines////////////////////////

router.post("/createEventGuildLines", async (req, res) => {
    try {
        const body = req.body;
        const controller = new EventGuildLinesController();
        const response = await controller.createEventGuildLines(body);
        res.status(200).json(successResponse("create EventGuildLines", response, res.statusCode));
    } catch (error) {
        console.error("error in signup", error);
        res.status(500).json(errorResponse("error in create EventGuildLines", res.statusCode));
    }
});

router.patch("/EventGuildLines/:id", async (req, res) => {
    try {
        const EventGuildLinesId = req.params.id;
        const body = req.body as IEventGuildLines;
        const controller = new EventGuildLinesController();
        const response: IEventGuildLines = await controller.editEventGuildLines(body, EventGuildLinesId);
        res.status(200).json(successResponse("edit EventGuildLines", response, res.statusCode));
    } catch (error) {
        console.error("error in signup", error);
        res.status(500).json(errorResponse("error in edit EventGuildLines", res.statusCode));
    }
});

router.get("/EventGuildLinesList", async (req, res) => {
    try {
        const controller = new EventGuildLinesController();
        const CategoryId=req.query.CategoryId
        const response: IEventGuildLines[] = await controller.getEventGuildLinesList(CategoryId);
        res.status(200).json(successResponse("EventGuildLines list", response, res.statusCode));
    } catch (error) {
        console.error("error in signup", error);
        res.status(500).json(errorResponse("error in EventGuildLines list", res.statusCode));
    }
});


router.get("/EventGuildLines/:id", async (req, res) => {
    try {
        const EventGuildLinesId: string = req.params.id;
        const controller = new EventGuildLinesController();
        const response: IEventGuildLines = await controller.getEventGuildLinesInfoById(EventGuildLinesId);
        res.status(200).json(successResponse("get EventGuildLines", response, res.statusCode));
    } catch (error) {
        console.error("error in EventGuildLines", error);
        res.status(500).json(errorResponse("error in get EventGuildLines", res.statusCode));
    }
});


router.get("/deleteEventGuildLines/:id", async (req, res) => {
    try {
        const EventGuildLinesId = req.params.id;
        const controller = new EventGuildLinesController();
        const response: IEventGuildLines = await controller.deleteEventGuildLines(EventGuildLinesId);
        res.status(200).json(successResponse("delete EventGuildLines", response, res.statusCode));

    } catch (error) {
        console.error("error in delete EventGuildLines", error);
        res.status(500).json(errorResponse("error in delete EventGuildLines", res.statusCode));
    }
})
//////////////////////////////////////////////////////////////////////////
router.post("/createevent", async (req, res) => {
    try {
        const body = req.body as IEvent;

        const controller = new eventController();
        const response: IEvent = await controller.createevent(body);
        res.status(200).json(successResponse("create event", response, res.statusCode));
    } catch (error) {
        console.error("error in create event", error);
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
        console.error("error in event update", error);
        res.status(500).json(errorResponse("error in event update", res.statusCode));
    }
});

router.get("/getallevent", async (req, res) => {
    try {
        const controller = new eventController();
        const userId = req.body.userId;
        const response: IEvent[] = await controller.geteventEventScreen();
        res.status(200).json(successResponse("get event", response, res.statusCode));
    } catch (error) {
        console.error("error in get event", error);
        res.status(500).json(errorResponse("error in get event", res.statusCode));
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
        console.error("error in get event by Id", error);
        res.status(500).json(errorResponse("error in get event by Id", res.statusCode));
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
        console.error("error in eventActivity ", error);
        res.status(500).json(errorResponse("error in eventActivity", res.statusCode));
    }
})
router.post("/readActivity", async (req, res) => {
    try{
        
        const status:any =req.body.status;
        const eventId=req.body.eventId;
        const body=req.body;
        const controller=new eventController();
        const response:any =await controller.readActivity(eventId,status);
        res.status(200).json(successResponse("readActivity",response,res.statusCode));
    }catch(error) {
        console.error("error in readActivity ", error);
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
        console.error("error in eventCreateBYOrganizer", error);
        res.status(500).json(errorResponse("error in eventCreateBYOrganizer", res.statusCode));
    }
});
router.post("/bookForEventOrganize", async (req, res) => {
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
        console.error("error in eventCreateBYOrganizer", error);
        res.status(500).json(errorResponse("error in eventCreateBYOrganizer", res.statusCode));
    }
});
router.post("/bookEvent", async (req, res) => {
    try {
        const eventId = req.body.eventId; 
        const userId = req.body.userId; 
        const controller = new eventController();
        const response: any = await controller.bookEvent(eventId,userId);
        res.status(200).json(successResponse("eventCreateBYOrganizer ", response, res.statusCode));
    } catch (error) {
        console.error("error in eventCreateBYOrganizer", error);
        res.status(500).json(errorResponse("error in eventCreateBYOrganizer", res.statusCode));
    }
});
router.get("/filterEvent", async (req, res) => {
    try {
        console.log("req.query",req.query);
        const order = req.query.order;
        const category = req.query.category;
        const subCategory = req.query.subCategory; 
         const subSubCategory = req.query.subSubCategory; 
         const limit = req.query.limit;
           const skip = req.query.skip;
           const search = req.query.search;
        const controller = new eventController();
        const response: any = await controller.filterEvent(order, category, subCategory, subSubCategory, limit, skip, search);
        res.status(200).json(successResponse("filterEvent ", response, res.statusCode));
    } catch (error) {
        console.error("error in filterEvent", error);
        res.status(500).json(errorResponse("error filterEvent", res.statusCode));
    }
});


router.patch("/deleteevent/:id", async (req, res) => {
    try {
        const eventId = req.body.eventId;
        const userId = req.body.userId;
        const controller = new eventController();
        const response: IEvent = await controller.deleteevent(eventId, userId);
        res.status(200).json(successResponse("delete event", response, res.statusCode));
    } catch (error) {
        console.error("error in delete event", error);
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
        console.error("error in delete event", error);
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

router.post("/createCategory", async (req, res) => {
    try {
        const body = req.body as ICategory;
     
        const controller = new CategoryController();
        const response:ICategory = await controller.createCategory(body);
        res.status(200).json(successResponse("create category", response, res.statusCode));
    } catch(error) {
        console.error("error in create category", error);
        res.status(500).json(errorResponse("error in create category", res.statusCode));
    }
});

router.patch("/Category/:id", async (req, res) => {
    try {
        const categoryId = req.params.id;
        
        const body = req.body as ICategory;
        const controller = new CategoryController();
        const response: ICategory = await controller.editCategory(body, categoryId);
        res.status(200).json(successResponse("category update", response, res.statusCode));
    } catch(error) {
        console.error("error in category update", error);
        res.status(500).json(errorResponse("error in category update", res.statusCode));
    }
});

router.get("/categoryList", async (req, res) => {
    try {
        const controller = new CategoryController();
        const businessTypeId = req.query.businessTypeId;
        const response: ICategory[] = await controller.getCategory(businessTypeId);
        res.status(200).json(successResponse("get category", response, res.statusCode));
    } catch(error) {
        console.error("error in get category", error);
        res.status(500).json(errorResponse("error in get category", res.statusCode));
    }
});
router.get("/getCategoryCustomer", async (req, res) => {
    try {
        const controller = new CategoryController();

        const response: ICategory[] = await controller.getCategoryCustomer();
        res.status(200).json(successResponse("get category", response, res.statusCode));
    } catch (error) {
        console.error("error in get category", error);
        res.status(500).json(errorResponse("error in get category", res.statusCode));
    }
});

router.get("createCategory/:id", async (req, res) => {
    try {
        const shopId: string= req.params.id;
        const userId=req.body.userId;
        const controller = new CategoryController();
        const response: ICategory = await controller.getCategoryInfoById(shopId);
        res.status(200).json(successResponse("get category by Id ", response, res.statusCode));
    } catch(error) {
        console.error("error in get category by Id", error);
        res.status(500).json(errorResponse("error in get category by Id", res.statusCode));
    }
});
router.patch("/deleteCategory/:id", async (req, res) => {
    try {
        const categoryId = req.params.id;
        const controller = new CategoryController();
        const response: ICategory = await controller.deleteCategory(categoryId);
        res.status(200).json(successResponse("category update", response, res.statusCode));
    } catch(error) {
        console.error("error in category update", error);
        res.status(500).json(errorResponse("error in category update", res.statusCode));
    }
});
/////////////////////////////////////Institute////////////////////////////////////////////
router.post("/createInstitute", async (req, res) => {
    try {
        const body = req.body;
     
        const controller = new InstituteController();
        const response:IInstitute = await controller.createInstitute(body);
        res.status(200).json(successResponse("create Institute", response, res.statusCode));
    } catch(error) {
        console.error("error in create Institute", error);
        res.status(500).json(errorResponse("error in create Institute", res.statusCode));
    }
});
router.get("/searchInstitute", async (req, res) => {
    try {
        const controller = new InstituteController();
   const stateId =req.query.stateId
   const searchValue =req.query.searchValue
        const response: any = await controller.searchInstitute(stateId, searchValue);
        res.status(200).json(successResponse("get searchInstitute", response, res.statusCode));
    } catch (error) {
        console.error("error in get searchInstitute", error);
        res.status(500).json(errorResponse("error in get searchInstitute", res.statusCode));
    }
});

router.patch("/Institute/:id", async (req, res) => {
    try {
        const InstituteId = req.params.id;
        
        const body = req.body;
        const controller = new InstituteController();
        const response: IInstitute = await controller.editInstitute(body, InstituteId);
        res.status(200).json(successResponse("Institute update", response, res.statusCode));
    } catch(error) {
        console.error("error in Institute update", error);
        res.status(500).json(errorResponse("error in Institute update", res.statusCode));
    }
});

router.get("/InstituteList", async (req, res) => {
    try {
        const controller = new InstituteController();
        const stateId=req.query.stateId;
        const response: any= await controller.getInstitute(stateId);
        res.status(200).json(successResponse("get Institute", response, res.statusCode));
    } catch(error) {
        console.error("error in get Institute", error);
        res.status(500).json(errorResponse("error in get Institute", res.statusCode));
    }
});
router.get("/searchInstitute", async (req, res) => {
    try {
        const stateId=req.query.stateId;
        const searchValue=req.query.searchValue;
        const controller = new InstituteController();
  
        const response: any = await controller.searchInstitute(stateId, searchValue);
        res.status(200).json(successResponse("get Institute", response, res.statusCode));
    } catch(error) {
        console.error("error in get Institute", error);
        res.status(500).json(errorResponse("error in get Institute", res.statusCode));
    }
});

router.get("/getInstituteInfoById/:id", async (req, res) => {
    try {
        const Institute: string= req.params.id;
        const userId=req.body.userId;
        const controller = new InstituteController();
        const response:any = await controller.getInstituteInfoById(Institute);
        res.status(200).json(successResponse("get Institute by Id ", response, res.statusCode));
    } catch(error) {
        console.error("error in get Institute by Id", error);
        res.status(500).json(errorResponse("error in get Institute by Id", res.statusCode));
    }
});
router.patch("/deleteInstitute/:id", async (req, res) => {
    try {
        const InstituteId = req.params.id;
        const controller = new InstituteController();
        const response: any = await controller.deleteInstitute(InstituteId);
        res.status(200).json(successResponse("Institute update", response, res.statusCode));
    } catch(error) {
        console.error("error in Institute update", error);
        res.status(500).json(errorResponse("error in Institute update", res.statusCode));
    }
});
//////////////////////////////////////////USERROLE/////////////////////////////////////////
router.post("/createUserrole", async (req, res) => {
    try {
        const body = req.body as IUserrole;
     
        const controller = new UserroleController();
        const response:IUserrole = await controller.createUserrole(body);
        res.status(200).json(successResponse("create Userrole", response, res.statusCode));
    } catch(error) {
        console.error("error in create Userrole", error);
        res.status(500).json(errorResponse("error in create Userrole", res.statusCode));
    }
});

router.patch("/editUserrole/:id", async (req, res) => {
    try {
        const UserroleId = req.params.id;
        
        const body = req.body as IUserrole;
        const controller = new UserroleController();
        const response: IUserrole = await controller.editUserrole(body, UserroleId);
        res.status(200).json(successResponse("Userrole update", response, res.statusCode));
    } catch(error) {
        console.error("error in Userrole update", error);
        res.status(500).json(errorResponse("error in Userrole update", res.statusCode));
    }
});

router.get("/UserroleList", async (req, res) => {
    try {
        const controller = new UserroleController();
  
        const response: IUserrole[] = await controller.getUserrole();
        res.status(200).json(successResponse("get Userrole", response, res.statusCode));
    } catch(error) {
        console.error("error in get Userrole", error);
        res.status(500).json(errorResponse("error in get Userrole", res.statusCode));
    }
});


router.get("/getUserroleInfoById/:id", async (req, res) => {
    try {
        const shopId: string= req.params.id;
        const userId=req.body.userId;
        const controller = new UserroleController();
        const response: IUserrole = await controller.getUserroleInfoById(shopId);
        res.status(200).json(successResponse("get Userrole by Id ", response, res.statusCode));
    } catch(error) {
        console.error("error in get Userrole by Id", error);
        res.status(500).json(errorResponse("error in get Userrole by Id", res.statusCode));
    }
});
router.patch("/deleteUserrole/:id", async (req, res) => {
    try {
        const UserroleId = req.params.id;
        const controller = new UserroleController();
        const response: IUserrole = await controller.deleteUserrole(UserroleId);
        res.status(200).json(successResponse("Userrole update", response, res.statusCode));
    } catch(error) {
        console.error("error in Userrole update", error);
        res.status(500).json(errorResponse("error in Userrole update", res.statusCode));
    }
});
/////////////////////////////////////Hashtag/////////////////////////////////////////

router.post("/createHashtag", async (req, res) => {
    try {
        const body = req.body as IHashtag;
     
        const controller = new HashtagController();
        const response:IHashtag = await controller.createHashtag(body);
        res.status(200).json(successResponse("create Hashtag", response, res.statusCode));
    } catch(error) {
        console.error("error in create Hashtag", error);
        res.status(500).json(errorResponse("error in create Hashtag", res.statusCode));
    }
});

router.patch("/createHashtag/:id", async (req, res) => {
    try {
        const HashtagId = req.params.id;
        
        const body = req.body as IHashtag;
        const controller = new HashtagController();
        const response: IHashtag = await controller.editHashtag(body, HashtagId);
        res.status(200).json(successResponse("Hashtag update", response, res.statusCode));
    } catch(error) {
        console.error("error in Hashtag update", error);
        res.status(500).json(errorResponse("error in Hashtag update", res.statusCode));
    }
});

router.get("/HashtagList", async (req, res) => {
    try {
        const controller = new HashtagController();
        const businessTypeId = req.query.businessTypeId;
        const response: IHashtag[] = await controller.getHashtagList();
        res.status(200).json(successResponse("get Hashtag", response, res.statusCode));
    } catch(error) {
        console.error("error in get Hashtag", error);
        res.status(500).json(errorResponse("error in get Hashtag", res.statusCode));
    }
});


router.get("createHashtag/:id", async (req, res) => {
    try {
        const shopId: string= req.params.id;
        const userId=req.body.userId;
        const controller = new HashtagController();
        const response: IHashtag = await controller.getHashtagInfoById(shopId);
        res.status(200).json(successResponse("get Hashtag by Id ", response, res.statusCode));
    } catch(error) {
        console.error("error in get Hashtag by Id", error);
        res.status(500).json(errorResponse("error in get Hashtag by Id", res.statusCode));
    }
});

router.patch("/deleteHashtag/:id", async (req, res) => {
    try{
        const  HashtagId = req.body.HashtagId;
        const userId=req.body.userId;
        const controller=new HashtagController();
        const response:IHashtag =await controller.deleteHashtag(HashtagId,userId);
        res.status(200).json(successResponse("delete Hashtag",response,res.statusCode));
    }catch(error) {
        console.error("error in Hashtag ", error);
        res.status(500).json(errorResponse("error in delete Hashtag", res.statusCode));
    }
})

router.post("/HashtagActivity", async (req, res) => {
    try{
        
        const userId=req.body.userId;
        const eventId=req.body.eventId;
        const hashtagId=req.body.hashtagId; 
         const status=req.body.status; 
         const hashtagcomment=req.body.hashtagcomment;
        const hashtagcommentId=req.body.hashtagcommentId;
        const body=req.body;
        const controller=new HashtagController();
        const response:IHashtag =await controller.hashtagActivity(userId,eventId, hashtagId, status,hashtagcomment,hashtagcommentId, body);
        res.status(200).json(successResponse("hashtagActivity",response,res.statusCode));
    }catch(error) {
        console.error("error in hashtagActivity ", error);
        res.status(500).json(errorResponse("error in hashtagActivity", res.statusCode));
    }
})

router.post("/subCategory", async (req, res) => {
    try {
        const body = req.body as ISubCategory;

        const controller = new CategoryController();
        const response: ISubCategory = await controller.createSubCategory(body);
        res.status(200).json(successResponse("create subcategory", response, res.statusCode));
    } catch (error) {
        console.error("error in create subcategory", error);
        res.status(500).json(errorResponse("error in create subcategory", res.statusCode));
    }
});

router.patch("/subCategory/:id", async (req, res) => {
    try {
        const categoryId = req.params.id;

        const body = req.body as ISubCategory;
        const controller = new CategoryController();
        const response: ISubCategory = await controller.editSubCategory(body, categoryId);
        res.status(200).json(successResponse("subCategory update", response, res.statusCode));
    } catch (error) {
        console.error("error in subCategory update", error);
        res.status(500).json(errorResponse("error in subCategory update", res.statusCode));
    }
});

router.get("/subCategoryList", async (req, res) => {
    try {
        const controller = new CategoryController();
        const categoryId = req.query.categoryId
        const userId = req.body.userId;
        const response: ISubCategory[] = await controller.getSubCategory(categoryId);
        res.status(200).json(successResponse("get subCategory", response, res.statusCode));
    } catch (error) {
        console.error("error in get subCategory", error);
        res.status(500).json(errorResponse("error in get subCategory", res.statusCode));
    }
});

router.get("/getAllSubCategory", async (req, res) => {
    try {
        const controller = new CategoryController();
        const userId = req.body.userId;
        const response: ISubCategory[] = await controller.getAllSubCategory();
        res.status(200).json(successResponse("get subCategory", response, res.statusCode));
    } catch (error) {
        console.error("error in get subCategory", error);
        res.status(500).json(errorResponse("error in get subCategory", res.statusCode));
    }
});

router.get("/subCategory/:id", async (req, res) => {
    try {
        const subCategoryId: string = req.params.id;
        const userId = req.body.userId;
        const controller = new CategoryController();
        const response: ISubCategory = await controller.getSubCategoryInfoById(subCategoryId);
        res.status(200).json(successResponse("get subCategory by Id ", response, res.statusCode));
    } catch (error) {
        console.error("error in get subCategory by Id", error);
        res.status(500).json(errorResponse("error in get subCategory by Id", res.statusCode));
    }
});


router.patch("/subCategory/delete/:id", async (req, res) => {
    try {
        const subCategoryId = req.body.subCategoryId;
        const userId = req.body.userId;
        const controller = new CategoryController();
        const response: ISubCategory = await controller.deleteSubCategory(subCategoryId, userId);
        res.status(200).json(successResponse("delete subCategory", response, res.statusCode));
    } catch (error) {
        console.error("error in delete subCategory", error);
        res.status(500).json(errorResponse("error in delete subCategory", res.statusCode));
    }
})
router.post("/subSubCategory", async (req, res) => {
    try {
        const body = req.body as ISubSubCategory;

        const controller = new CategoryController();
        const response: ISubSubCategory = await controller.createsubSubCategory(body);
        res.status(200).json(successResponse("create subSubCategory", response, res.statusCode));
    } catch (error) {
        console.error("error in create subSubCategory", error);
        res.status(500).json(errorResponse("error in create subSubCategory", res.statusCode));
    }
});

router.patch("/subSubCategory/:id", async (req, res) => {
    try {
        const subSubCategoryId = req.params.id;

        const body = req.body as ISubSubCategory;
        const controller = new CategoryController();
        const response: ISubSubCategory = await controller.editsubSubCategory(body, subSubCategoryId);
        res.status(200).json(successResponse("subSubCategory update", response, res.statusCode));
    } catch (error) {
        console.error("error in subSubCategory update", error);
        res.status(500).json(errorResponse("error in subSubCategory update", res.statusCode));
    }
});

router.get("/subSubCategoryList", async (req, res) => {
    try {
        const subCategoryId = req.query.subCategoryId;
        const controller = new CategoryController();

        const response: ISubSubCategory[] = await controller.getSubSubCategory(subCategoryId);
        res.status(200).json(successResponse("get subSubCategory", response, res.statusCode));
    } catch (error) {
        console.error("error in get subSubCategory", error);
        res.status(500).json(errorResponse("error in get subSubCategory", res.statusCode));
    }
});


router.get("/subSubCategory/:id", async (req, res) => {
    try {
        const subSubCategoryId: string = req.params.id;
        const userId = req.body.userId;
        const controller = new CategoryController();
        const response: ISubSubCategory = await controller.getCategorySubSubInfoById(subSubCategoryId);
        res.status(200).json(successResponse("get subSubCategory by Id ", response, res.statusCode));
    } catch (error) {
        console.error("error in get subSubCategory by Id", error);
        res.status(500).json(errorResponse("error in get subSubCategory by Id", res.statusCode));
    }
});


router.patch("/subSubCategory/:id", async (req, res) => {
    try {
        const subSubCategoryId = req.body.subSubCategoryId;
        const userId = req.body.userId;
        const controller = new CategoryController();
        const response: ISubSubCategory = await controller.deleteSubSubCategory(subSubCategoryId, userId);
        res.status(200).json(successResponse("delete subSubCategory", response, res.statusCode));
    } catch (error) {
        console.error("error in delete subSubCategory", error);
        res.status(500).json(errorResponse("error in delete subSubCategory", res.statusCode));
    }
})
























//////////////////////////////////////////////////////////////////











///////////////////////////////////////////////////////////////////////////////////////////////////////////




router.post("/eventPartner/Registration", async (req, res) => {
    try {
        const body = req.body as IPartner;
        const controller = new eventPartnerController();
        const response: any = await controller.createeventPartner(body);
        res.status(200).json(successResponse("create shop", response, res.statusCode));
    } catch (error) {
        console.error("error in Registration", error);
        res.status(500).json(errorResponse("error in create shop", res.statusCode));
    }
});

router.patch("/Update/:id", async (req, res) => {
    try {
        const shopId = req.params.id;
        const body = req.body as IPartner;
        const controller = new eventPartnerController();
        const response: IPartner = await controller.editeventPartner(body, shopId);
        res.status(200).json(successResponse("edit shop", response, res.statusCode));
    } catch (error) {
        console.error("error in signup", error);
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
        console.log("error while fetching eventPartner shop", error);
        res.status(500).json(errorResponse("error in fetching eventPartner shop", res.statusCode));
    }
});

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

router.get("/CityList", async (req, res) => {
    try {
        const controller = new CityController();
        const stateId = req.query.stateId;
        const response: ICity[] = await controller.getCityList(stateId);
        res.status(200).json(successResponse("City list", response, res.statusCode));
    } catch (error) {
        console.error("error in City", error);
        res.status(500).json(errorResponse("error in City list", res.statusCode));
    }
});


router.get("/City/:id", async (req, res) => {
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







router.post("/logineventPartner", async (req, res) => {
    try {
        const body = req.body as IPartner;
        const controller = new eventPartnerController();
        const response: IPartner = await controller.logineventPartner(body);
        res.status(200).json(successResponse("logineventPartner", response, res.statusCode));
    } catch (error) {
        console.error("error in logineventPartner", error);
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
        console.error("error in signup", error);
        res.status(500).json(errorResponse("error in edit shop", res.statusCode));
    }
});

router.get("/geteventPartnerAdminPannel", async (req, res) => {
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
        const controller = new eventPartnerController();
        const response: any = await controller.geteventPartnerAdminPannel(latitude, longitude, area, status,
            categoryId, stateId, cityId, limit, skip, search);
        res.status(200).json(successResponse("shop list", response, res.statusCode));
    } catch (error) {
        console.error("error in signup", error);
        res.status(500).json(errorResponse("error in shop list", res.statusCode));
    }
});




router.get("/shopInfoById/:id", async (req, res) => {
    try {
        const shopId: string = req.params.id;
        const controller = new eventPartnerController();
        const response: IPartner = await controller.geteventPartnerInfoById(shopId);
        res.status(200).json(successResponse("get shop", response, res.statusCode));
    } catch (error) {
        console.error("error in signup", error);
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
        console.error("error in delete shop", error);
        res.status(500).json(errorResponse("error in delete shop", res.statusCode));
    }
})







export default router;

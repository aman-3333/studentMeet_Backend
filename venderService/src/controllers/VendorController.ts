import VendorShop, { IShop } from "../models/VendorShop";
import Category, { ICategory } from "../models/Category";
import User, { IUser } from "../models/User";
import { Item } from "../models/Item";
import { IProduct } from "../models/Product";
import { ObjectId } from "mongoose";
import { generateOtp } from "../services/generateOtp";
import { verifyOtp } from "../services/verifyOtp";
import Otp from "../models/Otp";
import FuzzySearch from "fuzzy-search";

import Worker from "../models/Worker"
import fs from "fs"
import { listeners } from "process";
import BusinessType from "../models/BusinessType";
const aws = require("aws-sdk");
const multer = require("multer");
const multerS3 = require("multer-s3");
var bodyParser = require('body-parser');

var cors = require('cors');


function generateOTP(length: Number) {
    var digits = "1234567890";
    let OTP = "";
    for (let i = 0; i < length; i++) {
        OTP += digits[Math.floor(Math.random() * 10)];
    }
    return OTP;
}
function generateToken(length: Number) {
    var digits = "1234567890";
    let token = "";
    for (let i = 0; i < length; i++) {
        token += digits[Math.floor(Math.random() * 10)];
    }
    return token;
}




export default class VendorController {







    ////////////////////////


    // public async createVendorShop(body: any) {
    //     let categoryInfo: any;
    //     let data: any;
    //     let resp: any;
    //     let otp: any;
    //     let info: any;
    //     let phone = body.country_code.toString() + body.contact.toString();
    //     const userInfo = await VendorShop.findOne({ contact: body.contact }).lean();

    //     // if (body.action == "checkexist") {
    //     //     if (!userInfo) {
    //     //         return {
    //     //             Status: "Error",
    //     //             Details: "Invalid number. Please recheck and enter again.",
    //     //         };
    //     //     }
    //     // }
    //     // if (body.action == "checknotexist") {
    //     //     if (userInfo) {
    //     //         return {
    //     //             Status: "Error",
    //     //             Details:
    //     //                 "This phone number is already taken. Please try with a new number.",
    //     //         };
    //     //     }
    //     // }



    //     const otpInfo = await Otp.findOne({
    //         contact: body.contact,
    //         country_code: body.country_code,
    //     }).lean();
    //     if (!otpInfo) {
    //         otp = generateOTP(6);
    //         resp = await generateOtp(phone, otp);
    //         console.log("resp", resp);

    //         const info = new Otp({
    //             contact: body.contact,
    //             country_code: body.country_code,
    //             otp: otp,
    //             otpId: resp.Details,
    //         });
    //         await info.save();

    //     }
    //     console.log("resp", resp);
    //     let categoryData: any = await Category.findOne({ _id: body.category, isDeleted: false }).lean()
    //     let businessTypeInfo: any = await BusinessType.findOne({ _id: categoryData.businessType, isDeleted: false }).lean()


    //     if (resp && !otpInfo && !userInfo && businessTypeInfo.BusinessTypeName == "business") {





    //         categoryInfo = await Category.findOne({ _id: body.category, isDeleted: false }).lean()
    //         console.log("categoryInfo", categoryInfo.categoryName);

    //         if (categoryInfo.categoryName == "Fashion" && body.gst && body.gstDocument && body.registrationNo) {
    //             data = await VendorShop.create(body);
    //             data = await VendorShop.findOneAndUpdate(
    //                 { _id: data._id },
    //                 { validContact: true, verifyShortToken: null, isVerified: false }
    //             ).lean();

    //         } else if (categoryInfo.categoryName == "Fashion" && body.registrationNo) {
    //             data = await VendorShop.create(body);
    //             data = await VendorShop.findOneAndUpdate(
    //                 { _id: data._id },
    //                 { validContact: true, verifyShortToken: null, isVerified: false }
    //             ).lean();

    //         }
    //         if (categoryInfo.categoryName == "Beauty" && body.gst && body.gstDocument && body.registrationNo) {
    //             data = await VendorShop.create(body);
    //             data = await VendorShop.findOneAndUpdate(
    //                 { _id: data._id },
    //                 { validContact: true, verifyShortToken: null, isVerified: false }
    //             ).lean();

    //         } else if (categoryInfo.categoryName == "Beauty" && body.registrationNo) {
    //             data = await VendorShop.create(body);
    //             data = await VendorShop.findOneAndUpdate(
    //                 { _id: data._id },
    //                 { validContact: true, verifyShortToken: null, isVerified: false }
    //             ).lean();

    //         }
    //         else if (categoryInfo.categoryName == "Electronics" && body.registrationNo && body.gst && body.gstDocument) {
    //             data = await VendorShop.create(body);
    //             data = await VendorShop.findOneAndUpdate(
    //                 { _id: data._id },
    //                 { validContact: true, verifyShortToken: null, isVerified: false }
    //             ).lean();
    //         }
    //         else if (categoryInfo.categoryName == "Electronics" && body.registrationNo) {
    //             data = await VendorShop.create(body);
    //             data = await VendorShop.findOneAndUpdate(
    //                 { _id: data._id },
    //                 { validContact: true, verifyShortToken: null, isVerified: false }
    //             ).lean();
    //         }
    //         else if (categoryInfo.categoryName == "Decore" && body.registrationNo && body.gst && body.gstDocument) {
    //             data = await VendorShop.create(body);
    //             data = await VendorShop.findOneAndUpdate(
    //                 { _id: data._id },
    //                 { validContact: true, verifyShortToken: null, isVerified: false }
    //             ).lean();
    //         } else if (categoryInfo.categoryName == "Decore" && body.registrationNo) {
    //             data = await VendorShop.create(body);
    //             data = await VendorShop.findOneAndUpdate(
    //                 { _id: data._id },
    //                 { validContact: true, verifyShortToken: null, isVerified: false }
    //             ).lean();
    //         } else if (categoryInfo.categoryName == "Food" && body.fssaiLicense) {
    //             data = await VendorShop.create(body);
    //             data = await VendorShop.findOneAndUpdate(
    //                 { _id: data._id },
    //                 { validContact: true, verifyShortToken: null, isVerified: false }
    //             ).lean();
    //         }
    //         else if (categoryInfo.categoryName == "Food" && body.fssaiLicense && body.registrationNo && body.gst && body.gstDocument) {
    //             data = await VendorShop.create(body);
    //             data = await VendorShop.findOneAndUpdate(
    //                 { _id: data._id },
    //                 { validContact: true, verifyShortToken: null, isVerified: false }
    //             ).lean();
    //         }




    //         data = await VendorShop.findOneAndUpdate(
    //             { _id: data._id }, {
    //             $set:
    //                 { validContact: true, verifyShortToken: null, isVerified: false, }
    //         }
    //         ).lean();
    //         console.log("data", data);


    //         return data
    //     } else if (!otpInfo && !userInfo && businessTypeInfo.BusinessTypeName == "business") {


    //         categoryInfo = await Category.findOne({ _id: body.category, isDeleted: false }).lean()
    //         console.log("categoryInfo", categoryInfo.categoryName);

    //         if (categoryInfo.categoryName == "Fashion" && body.gst && body.gstDocument && body.registrationNo) {
    //             data = await VendorShop.create(body);
    //             data = await VendorShop.findOneAndUpdate(
    //                 { _id: data._id },
    //                 { verifyShortToken: null, isVerified: false }
    //             ).lean();

    //         } else if (categoryInfo.categoryName == "Fashion" && body.registrationNo) {
    //             data = await VendorShop.create(body);
    //             data = await VendorShop.findOneAndUpdate(
    //                 { _id: data._id },
    //                 { verifyShortToken: null, isVerified: false }
    //             ).lean();

    //         }
    //         if (categoryInfo.categoryName == "Beauty" && body.gst && body.gstDocument && body.registrationNo) {
    //             data = await VendorShop.create(body);
    //             data = await VendorShop.findOneAndUpdate(
    //                 { _id: data._id },
    //                 { verifyShortToken: null, isVerified: false }
    //             ).lean();

    //         } else if (categoryInfo.categoryName == "Beauty" && body.registrationNo) {
    //             data = await VendorShop.create(body);
    //             data = await VendorShop.findOneAndUpdate(
    //                 { _id: data._id },
    //                 { verifyShortToken: null, isVerified: false }
    //             ).lean();

    //         }
    //         else if (categoryInfo.categoryName == "Electronics" && body.registrationNo && body.gst && body.gstDocument) {
    //             data = await VendorShop.create(body);
    //             data = await VendorShop.findOneAndUpdate(
    //                 { _id: data._id },
    //                 { verifyShortToken: null, isVerified: false }
    //             ).lean();
    //         }
    //         else if (categoryInfo.categoryName == "Electronics" && body.registrationNo) {
    //             data = await VendorShop.create(body);
    //             data = await VendorShop.findOneAndUpdate(
    //                 { _id: data._id },
    //                 { verifyShortToken: null, isVerified: false }
    //             ).lean();
    //         }
    //         else if (categoryInfo.categoryName == "Decore" && body.registrationNo && body.gst && body.gstDocument) {
    //             data = await VendorShop.create(body);
    //             data = await VendorShop.findOneAndUpdate(
    //                 { _id: data._id },
    //                 { verifyShortToken: null, isVerified: false }
    //             ).lean();
    //         } else if (categoryInfo.categoryName == "Decore" && body.registrationNo) {
    //             data = await VendorShop.create(body);
    //             data = await VendorShop.findOneAndUpdate(
    //                 { _id: data._id },
    //                 { verifyShortToken: null, isVerified: false }
    //             ).lean();
    //         } else if (categoryInfo.categoryName == "Food" && body.fssaiLicense) {
    //             data = await VendorShop.create(body);
    //             data = await VendorShop.findOneAndUpdate(
    //                 { _id: data._id },
    //                 { verifyShortToken: null, isVerified: false }
    //             ).lean();
    //         }
    //         else if (categoryInfo.categoryName == "Food" && body.fssaiLicense && body.registrationNo && body.gst && body.gstDocument) {
    //             data = await VendorShop.create(body);
    //             data = await VendorShop.findOneAndUpdate(
    //                 { _id: data._id },
    //                 { verifyShortToken: null, isVerified: false }
    //             ).lean();
    //         }


    //         return data


    //     } else if (resp && !userInfo && !otpInfo && businessTypeInfo.BusinessTypeName == "individual") {
    //         data = await VendorShop.create(body);
    //         data = await VendorShop.findOneAndUpdate(
    //             { _id: data._id },
    //             { validContact: true, verifyShortToken: null, isVerified: false }
    //         ).lean();
    //     }
    //     else if (!otpInfo && !userInfo && businessTypeInfo.BusinessTypeName == "individual") {
    //         data = await VendorShop.create(body);
    //         data = await VendorShop.findOneAndUpdate(
    //             { _id: data._id },
    //             { verifyShortToken: null, isVerified: false }
    //         ).lean();
    //     }


    // }


    // public async loginVendor(body: any) {
    //     let otp = body.otp;
    //     let data: any = await VendorShop.findOne({
    //         contact: body.contact,
    //         country_code: body.country_code,
    //         isDeleted: false,
    //     }).lean();

    //     if (data) {
    //         let otpInfo = await Otp.findOne({
    //             contact: body.contact,
    //             country_code: body.country_code,
    //         }).lean();

    //         let resp = await verifyOtp(otpInfo, otp);
    //         console.log("resp", resp);

    //         if (resp.Status == "Success" && resp.Details != "OTP Expired") {

    //             data = await VendorShop.findOneAndUpdate(
    //                 {
    //                     contact: body.contact,
    //                     country_code: body.country_code,
    //                     isBlackList: false,
    //                     isDeleted: false,
    //                 },
    //                 {
    //                     $set: {
    //                         contact_verify: true, appVersion: body.appVersion,
    //                         deviceVersion: body.deviceVersion,
    //                         deviceType: body.deviceType,
    //                         deviceName: body.deviceName
    //                     }
    //                 },
    //                 { new: true }
    //             ).lean();


    //         } else if (resp.Status == "Success" && resp.Details == "OTP Expired") {
    //             return { Status: "Error", Details: "OTP Expired" };
    //         } else {
    //             return resp;
    //         }
    //         return data
    //     }

    // }

    // public async sendotp(body: any) {
    //   let phone = body.country_code.toString() + body.contact.toString();
    //   const userInfo = await Users.findOne({ contact: body.contact }).lean();
    //   if (body.action == "checkexist") {
    //     if (!userInfo) {
    //       return {
    //         Status: "Error",
    //         Details: "Invalid number. Please recheck and enter again.",
    //       };
    //     }
    //   }
    //   if (body.action == "checknotexist") {
    //     if (userInfo) {
    //       return {
    //         Status: "Error",
    //         Details:
    //           "This phone number is already taken. Please try with a new number.",
    //       };
    //     }
    //   }
    //   let otp = generateOTP(6);
    //   let resp = await generateOtp(phone, otp);

    //   if (resp.Status == "Success") {
    //     const otpInfo = await Otp.findOne({
    //       contact: body.contact,
    //       country_code: body.country_code,
    //     }).lean();
    //     // const userInfo = await Users.findOne({ contact: body.contact }).lean();
    //     // if (userInfo) {
    //     //   const user = await Users.findOne({
    //     //     contact: body.contact,
    //     //     country_code: body.country_code,
    //     //   }).lean();
    //     //   if (!user) {
    //     //     await Users.findOneAndUpdate(
    //     //       { contact: body.contact },
    //     //       { $set: { country_code: body.country_code } }
    //     //     );
    //     //   }
    //     // }
    //     if (!otpInfo) {
    //       const info = new Otp({
    //         contact: body.contact,
    //         country_code: body.country_code,
    //         otp: otp,
    //         otpId: resp.Details,
    //       });
    //       const data = await info.save();
    //       await Otp.findOneAndUpdate({ _id: data._id }, { $set: { otp: "1234" } })
    //     } else {
    //       await Otp.findOneAndUpdate(
    //         { contact: body.contact, country_code: body.country_code },
    //         { otp: otp, otpId: resp.Details }
    //       );
    //     }
    //   }
    //   return resp;
    // }



    public async sendotp(body: any) {
        let otp: any;
        let createUser: any;
        let otpInfo: any;
        function couponGenerator() {
            let text = "";
            let possible = "0123456789";

            for (let i = 0; i < 4; i++)
                text += possible.charAt(Math.floor(Math.random() * possible.length));

            return text;
        }

        otp = couponGenerator();
        otpInfo = await Otp.findOneAndUpdate({ contact: body.contact }, { $set: { otp: otp } }, { new: true })
        if (otpInfo) {
            await Otp.findOneAndUpdate({ _id: otpInfo._id }, { $set: { otp: "1234" } }, { new: true })
            // }
        }
        else if (!otpInfo) {
            createUser = await User.create({
                contact
                    : body.contact, country_code
                    : body.country_code
            })
            otpInfo = await Otp.create({
                contact
                    : body.contact, country_code
                    : body.country_code,
                otp: otp,
                otpId: otp
            })

        await Otp.findOneAndUpdate({ _id: otpInfo._id }, { $set: { otp: "1234" } })
        }

        return {
            otpInfo, createUser
        }

    }

    // public async verifyotp(body: any) {
    //     const otpInfo = await Otp.findOne({
    //         contact: body.contact,
    //         country_code: body.country_code,
    //         otp: body.otp
    //     }).lean();
    //     console.log("otpInfo", otpInfo);

    //     // If details are not found by the requested details
    //     if (otpInfo === null || otpInfo === "null" || !otpInfo) {
    //         return { Status: "Error", Details: "Invalid request." };
    //     }
    //     let resp = await verifyOtp(otpInfo, body.otp);
    //     console.log("resp", resp);


    //     if (resp.Details != "OTP Expired" && otpInfo) {
    //         await Users.findOneAndUpdate({ contact: body.contact, isDeleted: false }, { $set: { contact_verify: true } }, { new: true }).lean()
    //         await Vendor.findOneAndUpdate({ contact: body.contact, contact_verify: false, isDeleted: false }, { $set: { contact_verify: true } }, { new: true }).lean()
    //         await Worker.findOneAndUpdate({ contact: body.contact, contact_verify: false, isDeleted: false }, { $set: { contact_verify: true } }, { new: true }).lean()
    //         return { Status: "Sucess", Details: "OTP Matched" };
    //     }
    //     else {
    //         return { Status: "Error", Details: "OTP MisMatched" };
    //     }

    // }

    public async verifyotp(body: any) {
        let otp = body.otp;
        let data: any = await VendorShop.findOne({
            contact: body.contact,
            country_code: body.country_code,
            isDeleted: false,
        }).lean();

        if (data) {
            let otpInfo = await Otp.findOne({
                contact: body.contact,
                country_code: body.country_code,
                otp: body.otp
            }).lean();



            if (otpInfo) {

                return { Status: "Sucess", Details: "OTP Match" };

            }

            else {

                return { Status: "Error", Details: "OTP Mismatch" };
            }

        }

    }





    public async createVendorShop(body: any) {
        let categoryInfo: any;
        let data: any;
        let resp: any;
        let otp: any;
        let info: any;
        let otpArray: any = [];
        let phone = body.country_code.toString() + body.contact.toString();
        const userInfo = await VendorShop.findOne({ contact: body.contact }).lean();





        const otpInfo = await Otp.findOne({
            contact: body.contact,
            country_code: body.country_code,
        }).lean();

        if (!otpInfo) {

            console.log("resp", resp);
            function couponGenerator() {
                let text = "";
                let possible = "0123456789";

                for (let i = 0; i < 4; i++)
                    text += possible.charAt(Math.floor(Math.random() * possible.length));

                return text;
            }
            const info = new Otp({
                contact: body.contact,
                country_code: body.country_code,
                otp: couponGenerator(),
                otpId: couponGenerator()
            });
            await info.save();

            await Otp.findOneAndUpdate({ _id: info._id }, { $set: { otp: "1234" } })
        }


        console.log("resp", resp);
        let categoryData: any = await Category.findOne({ _id: body.category, isDeleted: false }).lean()
        let businessTypeInfo: any = await BusinessType.findOne({ _id: categoryData.businessType, isDeleted: false }).lean()


        if (info && !otpInfo && !userInfo && businessTypeInfo.BusinessTypeName == "business") {





            categoryInfo = await Category.findOne({ _id: body.category, isDeleted: false }).lean()
            console.log("categoryInfo", categoryInfo.categoryName);

            if (categoryInfo.categoryName == "Fashion" && body.gst && body.gstDocument && body.registrationNo) {
                data = await VendorShop.create(body);
                data = await VendorShop.findOneAndUpdate(
                    { _id: data._id },
                    { validContact: true, verifyShortToken: null, isVerified: false }
                ).lean();

            } else if (categoryInfo.categoryName == "Fashion" && body.registrationNo) {
                data = await VendorShop.create(body);
                data = await VendorShop.findOneAndUpdate(
                    { _id: data._id },
                    { validContact: true, verifyShortToken: null, isVerified: false }
                ).lean();

            }
            if (categoryInfo.categoryName == "Beauty" && body.gst && body.gstDocument && body.registrationNo) {
                data = await VendorShop.create(body);
                data = await VendorShop.findOneAndUpdate(
                    { _id: data._id },
                    { validContact: true, verifyShortToken: null, isVerified: false }
                ).lean();

            } else if (categoryInfo.categoryName == "Beauty" && body.registrationNo) {
                data = await VendorShop.create(body);
                data = await VendorShop.findOneAndUpdate(
                    { _id: data._id },
                    { validContact: true, verifyShortToken: null, isVerified: false }
                ).lean();

            }
            else if (categoryInfo.categoryName == "Electronics" && body.registrationNo && body.gst && body.gstDocument) {
                data = await VendorShop.create(body);
                data = await VendorShop.findOneAndUpdate(
                    { _id: data._id },
                    { validContact: true, verifyShortToken: null, isVerified: false }
                ).lean();
            }
            else if (categoryInfo.categoryName == "Electronics" && body.registrationNo) {
                data = await VendorShop.create(body);
                data = await VendorShop.findOneAndUpdate(
                    { _id: data._id },
                    { validContact: true, verifyShortToken: null, isVerified: false }
                ).lean();
            }
            else if (categoryInfo.categoryName == "Decore" && body.registrationNo && body.gst && body.gstDocument) {
                data = await VendorShop.create(body);
                data = await VendorShop.findOneAndUpdate(
                    { _id: data._id },
                    { validContact: true, verifyShortToken: null, isVerified: false }
                ).lean();
            } else if (categoryInfo.categoryName == "Decore" && body.registrationNo) {
                data = await VendorShop.create(body);
                data = await VendorShop.findOneAndUpdate(
                    { _id: data._id },
                    { validContact: true, verifyShortToken: null, isVerified: false }
                ).lean();
            } else if (categoryInfo.categoryName == "Food" && body.fssaiLicense) {
                data = await VendorShop.create(body);
                data = await VendorShop.findOneAndUpdate(
                    { _id: data._id },
                    { validContact: true, verifyShortToken: null, isVerified: false }
                ).lean();
            }
            else if (categoryInfo.categoryName == "Food" && body.fssaiLicense && body.registrationNo && body.gst && body.gstDocument) {
                data = await VendorShop.create(body);
                data = await VendorShop.findOneAndUpdate(
                    { _id: data._id },
                    { validContact: true, verifyShortToken: null, isVerified: false }
                ).lean();
            }




            data = await VendorShop.findOneAndUpdate(
                { _id: data._id }, {
                $set:
                    { validContact: true, verifyShortToken: null, isVerified: false, }
            }
            ).lean();
            console.log("data", data);


            return data
        } else if (!otpInfo && !userInfo && businessTypeInfo.BusinessTypeName == "business") {


            categoryInfo = await Category.findOne({ _id: body.category, isDeleted: false }).lean()
            console.log("categoryInfo", categoryInfo.categoryName);

            if (categoryInfo.categoryName == "Fashion" && body.gst && body.gstDocument && body.registrationNo) {
                data = await VendorShop.create(body);
                data = await VendorShop.findOneAndUpdate(
                    { _id: data._id },
                    { verifyShortToken: null, isVerified: false }
                ).lean();

            } else if (categoryInfo.categoryName == "Fashion" && body.registrationNo) {
                data = await VendorShop.create(body);
                data = await VendorShop.findOneAndUpdate(
                    { _id: data._id },
                    { verifyShortToken: null, isVerified: false }
                ).lean();

            }
            if (categoryInfo.categoryName == "Beauty" && body.gst && body.gstDocument && body.registrationNo) {
                data = await VendorShop.create(body);
                data = await VendorShop.findOneAndUpdate(
                    { _id: data._id },
                    { verifyShortToken: null, isVerified: false }
                ).lean();

            } else if (categoryInfo.categoryName == "Beauty" && body.registrationNo) {
                data = await VendorShop.create(body);
                data = await VendorShop.findOneAndUpdate(
                    { _id: data._id },
                    { verifyShortToken: null, isVerified: false }
                ).lean();

            }
            else if (categoryInfo.categoryName == "Electronics" && body.registrationNo && body.gst && body.gstDocument) {
                data = await VendorShop.create(body);
                data = await VendorShop.findOneAndUpdate(
                    { _id: data._id },
                    { verifyShortToken: null, isVerified: false }
                ).lean();
            }
            else if (categoryInfo.categoryName == "Electronics" && body.registrationNo) {
                data = await VendorShop.create(body);
                data = await VendorShop.findOneAndUpdate(
                    { _id: data._id },
                    { verifyShortToken: null, isVerified: false }
                ).lean();
            }
            else if (categoryInfo.categoryName == "Decore" && body.registrationNo && body.gst && body.gstDocument) {
                data = await VendorShop.create(body);
                data = await VendorShop.findOneAndUpdate(
                    { _id: data._id },
                    { verifyShortToken: null, isVerified: false }
                ).lean();
            } else if (categoryInfo.categoryName == "Decore" && body.registrationNo) {
                data = await VendorShop.create(body);
                data = await VendorShop.findOneAndUpdate(
                    { _id: data._id },
                    { verifyShortToken: null, isVerified: false }
                ).lean();
            } else if (categoryInfo.categoryName == "Food" && body.fssaiLicense) {
                data = await VendorShop.create(body);
                data = await VendorShop.findOneAndUpdate(
                    { _id: data._id },
                    { verifyShortToken: null, isVerified: false }
                ).lean();
            }
            else if (categoryInfo.categoryName == "Food" && body.fssaiLicense && body.registrationNo && body.gst && body.gstDocument) {
                data = await VendorShop.create(body);
                data = await VendorShop.findOneAndUpdate(
                    { _id: data._id },
                    { verifyShortToken: null, isVerified: false }
                ).lean();
            }




        } else if (info && !userInfo && !otpInfo && businessTypeInfo.BusinessTypeName == "individual") {
            data = await VendorShop.create(body);
            data = await VendorShop.findOneAndUpdate(
                { _id: data._id },
                { validContact: true, verifyShortToken: null, isVerified: false }
            ).lean();
        }
        else if (!otpInfo && !userInfo && businessTypeInfo.BusinessTypeName == "individual") {
            data = await VendorShop.create(body);
            data = await VendorShop.findOneAndUpdate(
                { _id: data._id },
                { verifyShortToken: null, isVerified: false }
            ).lean();
        }

        return data

    }



    public async loginVendor(body: any) {
        let otp = body.otp;
        let data: any = await VendorShop.findOne({
            contact: body.contact,
            country_code: body.country_code,
            isDeleted: false,
        }).lean();
        let isAdmin: any = await User.findOne({
            contact: body.contact,
            country_code: body.country_code,
            role: "admin",
            isDeleted: false,
        }).lean();
        let customer: any = await User.findOne({
            contact: body.contact,
            country_code: body.country_code,

            isDeleted: false,
        }).lean();
        if (data) {
            let otpInfo = await Otp.findOne({
                contact: body.contact,
                country_code: body.country_code,
                otp: body.otp
            }).lean();



            if (otpInfo) {

                    data = await VendorShop.findOneAndUpdate(
                        {
                            contact: body.contact,
                            country_code: body.country_code,
                            isBlackList: false,
                            isDeleted: false,
                        },
                        {
                            $set: {
                                contact_verify: true, appVersion: body.appVersion,
                                deviceVersion: body.deviceVersion,
                                deviceType: body.deviceType,
                                deviceName: body.deviceName
                            }
                        },
                        { new: true }
                    ).lean();


            }


        }
        else if (isAdmin) {
            isAdmin = await User.findOne({
                contact: body.contact,
                country_code: body.country_code,
                role: "admin",
                isDeleted: false,
            }).lean();
            isAdmin = await User.findOneAndUpdate(
                {
                    contact: body.contact,
                    country_code: body.country_code,
                    isBlackList: false,
                    role: "admin",
                    isDeleted: false,
                },
                {
                    $set: {
                        contact_verify: true, appVersion: body.appVersion,
                        deviceVersion: body.deviceVersion,
                        deviceType: body.deviceType,
                        deviceName: body.deviceName
                    }
                },
                { new: true }
            ).lean();
            data = isAdmin

        } else if (customer) {
            customer = await User.findOne({
                contact: body.contact,
                country_code: body.country_code,

                isDeleted: false,
            }).lean();
            customer = await User.findOneAndUpdate(
                {
                    contact: body.contact,
                    country_code: body.country_code,
                    isBlackList: false,

                    isDeleted: false,
                },
                {
                    $set: {
                        contact_verify: true, appVersion: body.appVersion,
                        deviceVersion: body.deviceVersion,
                        deviceType: body.deviceType,
                        deviceName: body.deviceName
                    }
                },
                { new: true }
            ).lean();
            data = customer
        }
        else {
            return { Status: "Error", Details: "OTP Mismatch" };
        }
        return data

    }





    public async editVendorShop(body: IShop, shopId: string) {
        const shopInfo: IShop = await VendorShop.findOneAndUpdate({ _id: shopId, isDeleted: false }, body, { new: true }).lean();
        return shopInfo;
    }




    public async vendorActivate(status: any, ownerId: any, planId: any, vendorId: any) {
        let vendorInfo: any;
        if (status == 'Active') {
            vendorInfo = await VendorShop.findOneAndUpdate({ _id: vendorId, isDeleted: false }, { $set: { isActive: true } }).lean()
        } else if (status == 'Disactive') {
            vendorInfo = await VendorShop.findOneAndUpdate({ _id: vendorId, isDeleted: false }, { $set: { isActive: false } }).lean()
        } else if (status == 'Plan Active') {
            vendorInfo = await VendorShop.findOneAndUpdate({ _id: vendorId, isDeleted: false }, { $set: { planId: planId } }).lean()
        } else if (status == 'Plan DisActive') {
            vendorInfo = await VendorShop.findOneAndUpdate({ _id: vendorId, isDeleted: false }, { $set: { planId: 0 } }).lean()
        } else if (status == 'BlackList') {
            vendorInfo = await VendorShop.findOneAndUpdate({ _id: vendorId, isDeleted: false }, { $set: { isActive: false, isBlackList: true } }).lean()
        } else if (status == 'Remove BlackList') {
            vendorInfo = await VendorShop.findOneAndUpdate({ _id: vendorId, isDeleted: false }, { $set: { isActive: true, isBlackList: false } }).lean()
        }
        return vendorInfo
    }



    public async getVendorAdminPannel(latitude: any, longitude: any, area: any, status: any, categoryId: any, stateId: any, cityId: any, limit: any, skip: any, search: any) {
        let vendorInfo: any = await VendorShop.find({ category: categoryId, isDeleted: false });
        if (status == 'Active') {
            vendorInfo = vendorInfo.filter((item: any) => item.isActive == true)
        } else if (status == 'Disactive') {
            vendorInfo = vendorInfo = vendorInfo.filter((item: any) => item.isActive == false)
        } else if (status == 'BlackList') {
            vendorInfo = vendorInfo = vendorInfo.filter((item: any) => item.isBlackList == true)
        } else if (status == 'Remove BlackList') {
            vendorInfo = vendorInfo = vendorInfo.filter((item: any) => item.isBlackList == false)
        } else if (status == 'contact verify') {
            vendorInfo = vendorInfo = vendorInfo.filter((item: any) => item.contact_verify == true)
        } else if (status == 'contact notverify') {
            vendorInfo = vendorInfo = vendorInfo.filter((item: any) => item.contact_verify == false)
        } else if (stateId) {
            vendorInfo = vendorInfo = vendorInfo.filter((item: any) => item.state == stateId)
        } else if (cityId) {
            vendorInfo = vendorInfo = vendorInfo.filter((item: any) => item.city == cityId)
        }
        if (search) {
            const searcher = new FuzzySearch(vendorInfo, ["shopName"], {
                caseSensitive: false,
            });
            vendorInfo = searcher.search(search);
        }

        if (limit && skip) {

            vendorInfo = vendorInfo.slice(skip).slice(0, limit);

        }
        return vendorInfo;
    }













    public async getVendorListCustomers() {

    }












    public async getShopInfoById(vendorId: string) {
        const vendorInfo: IShop = await VendorShop.findOne({ _id: vendorId, isDeleted: false }).lean();
        return vendorInfo;
    }

    public async deleteShop(shopId: String) {
        const shopInfo: IShop = await VendorShop.findOneAndUpdate({ _id: shopId, isDeleted: false }, { $set: { isDeleted: true } }, { new: true }).lean();
        return shopInfo;
    }

}
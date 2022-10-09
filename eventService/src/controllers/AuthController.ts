// //npm libraries
// import * as jwt from "jsonwebtoken";
// import moment, { now } from "moment";
// import async, { nextTick } from "async";
// import bcrypt from "bcryptjs";
// import mongoose, { ObjectId } from "mongoose";
// //Edneed objects
// import Users, { IUser } from "../models/Users";
// import { IEdneedResponse, IError, IOtp } from "../models/Interfaces";
// import * as constants from "../utils/Constants";
// import nconf from "nconf";
// import { isUnparsedPrepend, tokenToString } from "typescript";
// import { mailer } from "../services/mailer";
// import { emailExistance } from "../services/emailExistance";
// import { generateOtp } from "../services/generateOtp";
// import { verifyOtp } from "../services/verifyOtp";
// import Otp from "../models/Otp";
// import { baseUrl } from "../middleware/authMiddleware";

// // import SignupOtp from "../models/SignupOtp";

// const fs = require("fs");
// const Hogan = require("hogan.js");
// const saltRounds = 10;

// function generateOTP(length: Number) {
//   var digits = "1234567890";
//   let OTP = "";
//   for (let i = 0; i < length; i++) {
//     OTP += digits[Math.floor(Math.random() * 10)];
//   }
//   return OTP;
// }
// function generateToken(length: Number) {
//   var digits = "1234567890";
//   let token = "";
//   for (let i = 0; i < length; i++) {
//     token += digits[Math.floor(Math.random() * 10)];
//   }
//   return token;
// }


// export default class AuthController {



//   public async editProfile(body:any){
//     let userInfo:any=await Users.findOneAndUpdate({ _id: body.userId, isDeleted: false }, body, { new: true }).lean();
// return  userInfo;
// }

// public async loginVendor(body: any) {
//     let otp = body.otp;
  
//     let isAdmin: any = await Users.findOne({
//         contact: body.contact,
//         country_code: body.country_code,
//         role: "admin",
//         isDeleted: false,
//     }).lean();
//     let customer: any = await Users.findOne({
//         contact: body.contact,
//         country_code: body.country_code,

//         isDeleted: false,
//     }).lean();
//     if (data) {
//         let otpInfo = await Otp.findOne({
//             contact: body.contact,
//             country_code: body.country_code,
//             otp: body.otp
//         }).lean();



//         if (otpInfo) {

//                 data = await VendorShop.findOneAndUpdate(
//                     {
//                         contact: body.contact,
//                         country_code: body.country_code,
//                         isBlackList: false,
//                         isDeleted: false,
//                     },
//                     {
//                         $set: {
//                             contact_verify: true, appVersion: body.appVersion,
//                             deviceVersion: body.deviceVersion,
//                             deviceType: body.deviceType,
//                             deviceName: body.deviceName
//                         }
//                     },
//                     { new: true }
//                 ).lean();


//         }


//     }
//     else if (isAdmin) {
//         isAdmin = await User.findOne({
//             contact: body.contact,
//             country_code: body.country_code,
//             role: "admin",
//             isDeleted: false,
//         }).lean();
//         isAdmin = await User.findOneAndUpdate(
//             {
//                 contact: body.contact,
//                 country_code: body.country_code,
//                 isBlackList: false,
//                 role: "admin",
//                 isDeleted: false,
//             },
//             {
//                 $set: {
//                     contact_verify: true, appVersion: body.appVersion,
//                     deviceVersion: body.deviceVersion,
//                     deviceType: body.deviceType,
//                     deviceName: body.deviceName
//                 }
//             },
//             { new: true }
//         ).lean();
//         data = isAdmin

//     } else if (customer) {
//         customer = await User.findOne({
//             contact: body.contact,
//             country_code: body.country_code,

//             isDeleted: false,
//         }).lean();
//         customer = await User.findOneAndUpdate(
//             {
//                 contact: body.contact,
//                 country_code: body.country_code,
//                 isBlackList: false,

//                 isDeleted: false,
//             },
//             {
//                 $set: {
//                     contact_verify: true, appVersion: body.appVersion,
//                     deviceVersion: body.deviceVersion,
//                     deviceType: body.deviceType,
//                     deviceName: body.deviceName
//                 }
//             },
//             { new: true }
//         ).lean();
//         data = customer
//     }
//     else {
//         return { Status: "Error", Details: "OTP Mismatch" };
//     }
//     return data

// }


// }


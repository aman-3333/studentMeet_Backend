//npm libraries
import * as jwt from "jsonwebtoken";
import moment, { now } from "moment";
import async, { nextTick } from "async";
import bcrypt from "bcryptjs";
import mongoose, { ObjectId } from "mongoose";
//Edneed objects
import Users from "../models/userDetails";
import friendActivity from '../models/friendEventActivity';
import { IEdneedResponse, IError, IOtp } from "../models/Interfaces";
import * as constants from "../utils/Constants";
import nconf from "nconf";
import { isUnparsedPrepend, tokenToString } from "typescript";
import { mailer } from "../services/mailer";
import { emailExistance } from "../services/emailExistance";
import { generateOtp } from "../services/generateOtp";
import { verifyOtp } from "../services/verifyOtp";
import Otp from "../models/Otp";
import { baseUrl } from "../middleware/authMiddleware";
import userActivity from "../models/userActivity";
import StarPerformer from "../models/StarPerformer";
import post from "../models/post";

// import SignupOtp from "../models/SignupOtp";

const fs = require("fs");
const Hogan = require("hogan.js");
const saltRounds = 10;

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


export default class AuthController {

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
    otpInfo = await Otp.findOneAndUpdate({ contact: body.contact }, { $set: { otp: "1234" } }, { new: true })

    if (!otpInfo) {
      createUser = await Users.create({
        contact
          : body.contact, country_code
          : body.country_code
      })
      await userActivity.create({
        userId
          : createUser._id
      })
      otpInfo = await Otp.create({

        contact: body.contact,
        country_code: body.country_code,
        otp: otp,
        otpId: otp
      })

      await Otp.findOneAndUpdate({ _id: otpInfo._id }, { $set: { otp: "1234" } })
    }
    else {
      createUser = await Users.findOne({
        contact
          : body.contact
      })
    }
    return {
      otpInfo, createUser
    }

  }

  public async editProfile(body: any) {
    let userInfo: any = await Users.findOneAndUpdate({ _id: body.userId, isDeleted: false }, body, { new: true }).lean();
    await StarPerformer.findOneAndUpdate({ starPerformerId: body.userId, isDeleted: false }, { $set: { starPerformerName: body.fullname } }).lean();
    await post.findOneAndUpdate({ userId: body.userId }, { $set: { userName: userInfo.fullname } })
    return userInfo;
  }

  public async viewProfile(userId: any) {
    let userInfo: any = await Users.findOne({ _id: userId, isDeleted: false }).lean();
    return userInfo;
  }
  public async verifyotp(body: any) {
    let otp = body.otp;
    let userInfo: any = await Users.findOne({
      contact: body.contact,
      country_code: body.country_code,
      isDeleted: false,
    }).lean();

    if (userInfo) {
      let otpInfo = await Otp.findOne({
        contact: body.contact,
        country_code: body.country_code,
        otp: body.otp
      }).lean();
      if (otpInfo) {

        return { Status: "Sucess", Details: "OTP Match", userInfo };

      }

      else {

        return { Status: "Error", Details: "OTP Mismatch" };
      }

    }
    return userInfo
  }

public async sendotpByApi(body: any) {
  let phone = body.country_code.toString() + body.contact.toString();
  let otp = generateOTP(6);
  let resp = await generateOtp(phone, otp);

  if (resp.Status == "Success") {
    const otpInfo = await Otp.findOne({
      contact: body.contact,
      country_code: body.country_code,
    }).lean();
    if (!otpInfo) {
      const info = new Otp({
        contact: body.contact,
        country_code: body.country_code,
        otp: otp,
        otpId: resp.Details,
      });
       await info.save();
    } else {
      await Otp.findOneAndUpdate(
        { contact: body.contact, country_code: body.country_code },
        { otp: otp, otpId: resp.Details }
      );
    }
  }
  return resp;
}


public async verifyotpByApi(body: any) {
  let data: any;
  let userInfo:any;
  data= await Users.findOne({
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
        
        userInfo =    await Users.findOneAndUpdate(
                  {
                    contact: body.contact,
                    country_code: body.country_code,
                    isDeleted: false,
                  },
                  { $set: { contact_verify: true,
                    fcmtoken: body.fcmtoken,
                    ipAddress:body.ipAddress,
                    modelName:body.modelName,
                    manufacturer:body.manufacturer,
                    maxMemorybigint:body.maxMemorybigint,
                    freeMemory:body.freeMemory,
                    osVersion: body.osVersion,
                    networkCarrier:body.networkCarrier,
                    dimension:body.dimension} }
                );
             
              
          return { Status: "Sucess", Details: "OTP Match",userInfo  };

      }

      else {

          return { Status: "Error", Details: "OTP Mismatch",userInfo };
      }

  }

  if (!data) {
    let otpInfo = await Otp.findOne({
        contact: body.contact,
        country_code: body.country_code,
        otp: body.otp
    }).lean();



    if (otpInfo) {
      userInfo= await Users.create({
                  
                    contact: body.contact,
                    country_code: body.country_code,
                    contact_verify: true,
                    fcmtoken: body.fcmtoken,
                    ipAddress:body.ipAddress,
                    modelName:body.modelName,
                    manufacturer:body.manufacturer,
                    maxMemorybigint:body.maxMemorybigint,
                    freeMemory:body.freeMemory,
                    osVersion: body.osVersion,
                    networkCarrier:body.networkCarrier,
                    dimension:body.dimension }
                );
                await userActivity.create({
                            userId
                              : userInfo._id
                          })
                     let data=     await friendActivity.create({
                            userId
                              : userInfo._id
                          })
                          console.log("dtaa",data);
                          
        return { Status: "Sucess", Details: "OTP Match",userInfo };

    }

    else {

        return { Status: "Error", Details: "OTP Mismatch" };
    }

}

}



}


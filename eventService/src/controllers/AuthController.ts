//npm libraries
import * as jwt from "jsonwebtoken";
import moment, { now } from "moment";
import async, { nextTick } from "async";
import bcrypt from "bcryptjs";
import mongoose, { ObjectId } from "mongoose";
//Edneed objects
import Users from "../models/userDetails";
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
import userDevice from "../models/userDevice";
import StarPerformer from "../models/StarPerformer";
import post from "../models/post";
import userConfig from "../models/userConfig";
const { createJwtToken } = require("../utils/JwtToken");
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

function makeid(length = 5) {
  let text = '';
  const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  for (let i = 0; i < length; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return text;
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
          : createUser._id,
          name:createUser.fullName
      })

       await userDevice.create(
        {
          userId
          : createUser._id,

          fcmtoken: body.fcmtoken,
          ipAddress:body.ipAddress,
          modelName:body.modelName,
          manufacturer:body.manufacturer,
          maxMemorybigint:body.maxMemorybigint,
          freeMemory:body.freeMemory,
          osVersion: body.osVersion,
          networkCarrier:body.networkCarrier,
          dimension:body.dimension} 
      );
      otpInfo = await Otp.create({

        contact: body.contact,
        country_code: body.country_code,
        otp: 1234,
        otpId: otp
      })

     
    }
  
    return {
      otpInfo, createUser
    }

  }

  public async editProfile(body: any) {
    console.log(body,"body");
    
    let userInfo: any = await Users.findOneAndUpdate({ _id: body.userId, isDeleted: false }, body, { new: true }).lean();
    console.log(userInfo,"userInfo");
    
    await userActivity.findOneAndUpdate({ userId: body.userId }, { $set: { name: userInfo.fullName } })
    return userInfo;
  }

  public async viewProfile(userId: any) {
    let userInfo: any = await Users.findOne({ _id: userId, isDeleted: false }).lean();
    return userInfo;
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
  let userData: any;
  let userInfo:any;
  userData= await Users.findOne({
      contact: body.contact,
      country_code: body.country_code,
      isDeleted: false,
  }).lean();

  if (userData) {
      let otpInfo = await Otp.findOne({
          contact: body.contact,
          country_code: body.country_code,
          otp: body.otp
      }).lean();
console.log(body);

      const token = createJwtToken({ userId: userData._id });
      if (otpInfo) {
        
       await userDevice.findOneAndUpdate(
                  {
                    userId: userData._id,
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
                    dimension:body.dimension
                  } }
                );
                
                await userConfig.findOneAndUpdate(
                  {
                    userId: userData._id,
                  },
                  { $set: { current_app_version: body.current_app_version,
                  device_token: body.device_token,
                  location_coords:body.location_coords,
                  uninstalled_on:body.uninstalled_on,
                  } }
                );

                await Users.findOneAndUpdate(
                  {
                    userId: userData._id,
                  },
                  { $set: { contact_verify: true
                  } }
                );
              }

        
              
                
          return { Status: "Sucess", Details: "OTP Match",userData,token  };
      }

      else {

          return { Status: "Error", Details: "OTP Mismatch",userInfo };
      }

  }


}


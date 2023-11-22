//npm libraries
import * as jwt from "jsonwebtoken";
import moment, { now } from "moment";
import async, { nextTick } from "async";
import bcrypt from "bcryptjs";
import mongoose, { ObjectId } from "mongoose";
//Edneed objects
import Users from "../models/userDetails";
import { sendNotification } from "../services/notification";
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
import academyOwner from "../models/academyOwner";
import sponsorPartner from "../models/sponsorPartner";
import schoolOwner from "../models/schoolsOwner.model";
const expiration = Math.floor(Date.now() / 1000) + (10 * 365 * 24 * 60 * 60);


import { log } from "util";
import userDetails from "../models/userDetails";
const { createJwtToken } = require("../utils/JwtToken");
const SECRET_KEY = "ffswvdxjhnxdlluuq";
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
  let text = "";
  const possible =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
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
  

   
      createUser = await Users.create({
        contact: body.contact,
        country_code: body.country_code,
      });
      await userActivity.create({
        userId: createUser._id,
        name: createUser.fullName,
      });

      await userDevice.create({
        userId: createUser._id,
        fcmtoken: body.fcmtoken,
        ipAddress: body.ipAddress,
        modelName: body.modelName,
        manufacturer: body.manufacturer,
        maxMemorybigint: body.maxMemorybigint,
        freeMemory: body.freeMemory,
        osVersion: body.osVersion,
        networkCarrier: body.networkCarrier,
        dimension: body.dimension,
      });
      otpInfo = await Otp.create({
        contact: body.contact,
        country_code: body.country_code,
        otp: 1234,
        otpId: otp,
      });
    

    return {
      otpInfo,
      createUser,
    };
  }

  public async editProfile(body: any) {
    let userInfo: any = await Users.findOneAndUpdate(
      { _id: body.userId, isDeleted: false },
      body,
      { new: true }
    ).lean();

    await userActivity.findOneAndUpdate(
      { userId: body.userId },
      { $set: { name: userInfo.fullName } }
    );
    return userInfo;
  }

  public async viewProfile(userId: any,loginUser:any) {
   let currentUser:any = await userActivity.findOne({
    userId: loginUser._id,
    isDeleted: false,
  }).lean();
    let userInfo: any = await Users.findOne({
      _id: userId,
      isDeleted: false,
    }).lean();

    if(loginUser._id.toString()==userId.toString()){
      console.log("hello")
      userInfo.isEditable = true;
    }
    if (currentUser.userFollowers.toString().includes(userId)) {
      userInfo.isFollow = true;
    }
    else{
      userInfo.isFollow = false;
      userInfo.isEditable =false;
    }
    return userInfo;
  }


  public async viewProfileMultiple(userId: any,) {
 
     let userInfo: any = await Users.aggregate([{
      $match:{
        _id:  { $in: userId.map((val:any) => new mongoose.Types.ObjectId(val)) }
       
      }
     },
     {
      $lookup: {
        localField: "stages",
        from: "stages",
        foreignField: "_id",
        as: "stage",
      },
    },
    { $unwind: { path: "$stage", preserveNullAndEmptyArrays: true } },
  ])
    
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
    let userInfo: any;
    console.log(body,"userData");
    userData = await Users.findOne({
      contact: body.contact,
      country_code: body.country_code,
      isDeleted: false,
    }).lean();
   
    if (userData) {

      let otpInfo = await Otp.findOne({
        contact: body.contact,
        country_code: body.country_code,
        otp: body.otp,
      }).lean();
      console.log(otpInfo,"otpInfo");
      const token = createJwtToken({ userId: userData._id });
      console.log(token,"token");
      
      if (otpInfo) {
        await userDevice.findOneAndUpdate(
          {
            userId: userData._id,
          },
          {
            $set: {
              contact_verify: true,
              fcmtoken: body.fcmtoken,
              ipAddress: body.ipAddress,
              modelName: body.modelName,
              manufacturer: body.manufacturer,
              maxMemorybigint: body.maxMemorybigint,
              freeMemory: body.freeMemory,
              osVersion: body.osVersion,
              networkCarrier: body.networkCarrier,
              dimension: body.dimension,
            },
          }
        );

        await userConfig.findOneAndUpdate(
          {
            userId: userData._id,
          },
          {
            $set: {
              current_app_version: body.current_app_version,
              device_token: body.device_token,
              location_coords: body.location_coords,
              uninstalled_on: body.uninstalled_on,
            },
          }
        );

        await Users.findOneAndUpdate(
          {
            userId: userData._id,
          },
          { $set: { contact_verify: true } }
        );
      }

      return { Status: "Sucess", Details: "OTP Match", userData, token };
    } else {
      return { Status: "Error", Details: "OTP Mismatch", userInfo };
    }
  }


public async suggestionUser(user:any){
let userInfo = await userDetails.findOne({_id:user._id,isDeleted:false}).lean()

let allUser=await userDetails.find({})


}


  public async signUpEmail(body: any, SECRET_KEY: any) {
    const { email, password, confirmPassword, type } = body;


    if (type == "academy" && confirmPassword == password) {
      
      
      const existingUser: any = await academyOwner.findOne({ email: email });
      if (existingUser) {
        return { message: "User Already exists" };
      }
 
      const hashedPassword = await bcrypt.hash(password, 10);
      
      
      let userData:any =await academyOwner.create({
        email: email,
        password: hashedPassword,
        userType:type
      });
    
     
     console.log(userData);
      const token = jwt.sign(
        { email: userData.email, id: userData._id },
        "Stack",
        {
          expiresIn: expiration
        },
        SECRET_KEY
      );
      console.log(token);
      
   let userInfo=    await academyOwner.findOneAndUpdate(
        { email: email },
        { $set: { token: token,otp:"1234" } },{new:true}
      );

return userInfo
      
    }
    if (type == "sponsor" && confirmPassword == password) {
      const existingUser: any = await sponsorPartner.findOne({ email: email });
      if (existingUser) {
        return { message: "User Already exists" };
      }
      const hashedPassword = await bcrypt.hash(password, 10);
     
      
      let userData:any = new sponsorPartner({
        email: email,
        password: hashedPassword,
        userType:type
      });
     await userData.save()
      console.log(userData,"userData");
     
      const token = jwt.sign(
        { email: userData.email, id: userData._id },
        "Stack",
        {
          expiresIn: expiration,
        },
        SECRET_KEY
      );
      console.log(token);
      
      userData=     await sponsorPartner.findOneAndUpdate(
        { _id: userData._id },
        { $set: { token: token,otp:"1234" } },{new:true}
      );

return userData
      
    }
    if (type == "school" && confirmPassword == password) {
      const existingUser: any = await schoolOwner.findOne({ email: email });
      if (existingUser) {
        return { message: "User Already exists" };
      }
      const hashedPassword = await bcrypt.hash(password, 10);
     
      
      let userData:any = new schoolOwner({
        email: email,
        password: hashedPassword,
        userType:type
      });
     await userData.save()
      console.log(userData,"userData");
     
      const token = jwt.sign(
        { email: userData.email, id: userData._id },
        "Stack",
        {
          expiresIn: expiration,
        },
        SECRET_KEY
      );
      console.log(token);
      
      userData=     await schoolOwner.findOneAndUpdate(
        { _id: userData._id },
        { $set: { token: token,otp:"1234" } },{new:true}
      );

return userData
      
    }

  }

  public async signInEmail(body: any, SECRET_KEY: any) {
    const { email, password, type } = body;
    if (type == "academy") {
      let existingUser: any = await academyOwner.findOne({ email: email });
      console.log(existingUser, "existingUser");
      if (!existingUser) {
        return { message: "User not exists" };
      }
    
      const matchPassword = await bcrypt.compare(
        password,
        existingUser.password
      );
      if (!matchPassword) {
        return { message: "Invalid Credentials" };
      }

      const token = jwt.sign(
        { email: existingUser.email, id: existingUser._id },
        "Stack",
        {
          expiresIn: expiration,
        },
        SECRET_KEY
      );
      existingUser = await academyOwner.findOneAndUpdate(
        { _id: existingUser._id },
        { $set: { token: token } }
      );
      return existingUser;
    }
    if (type == "sponsor") {
      let existingUser: any = await sponsorPartner.findOne({ email: email });
      console.log(existingUser, "existingUser");
      if (!existingUser) {
        return { message: "User not exists" };
      }
    
      const matchPassword = await bcrypt.compare(
        password,
        existingUser.password
      );
      if (!matchPassword) {
        return { message: "Invalid Credentials" };
      }

      const token = jwt.sign(
        { email: existingUser.email, id: existingUser._id },
        "Stack",
        {
          expiresIn: expiration,
        },
        SECRET_KEY
      );
      existingUser = await sponsorPartner.findOneAndUpdate(
        { _id: existingUser._id },
        { $set: { token: token } }
      );
      return existingUser;
    }
    if (type == "school") {
    
      let existingUser: any = await schoolOwner.findOne({ email: email });
      if (!existingUser) {
        return { message: "User not exists" };
      }
    
      const matchPassword = await bcrypt.compare(
        password,
        existingUser.password
      );
      if (!matchPassword) {
        return { message: "Invalid Credentials" };
      }

      const token = jwt.sign(
        { email: existingUser.email, id: existingUser._id },
        "Stack",
        {
          expiresIn: expiration,
        },
        SECRET_KEY
      );
      existingUser = await schoolOwner.findOneAndUpdate(
        { _id: existingUser._id },
        { $set: { token: token } }
      );
      return existingUser;
    }
  }

  public async verifyEmailotp(body: any) {
    const { email, type,otp } = body;
    let userData: any;
    let userInfo: any;
    if(type=="academy"){
      userData = await academyOwner.findOne({
        email:email,
     
        isDeleted: false,
      }).lean();
  
      if (userData) {
        let otpInfo = await academyOwner.findOne({
          email: email,
          otp:otp,
        }).lean();
        console.log(body);
  
       
        if (otpInfo) {
        
  
          await academyOwner.findOneAndUpdate(
            {
              _id: userData._id,
            },
            { $set: { email_verify: true } },{new:true}
          );
          return { Status: "Sucess", Details: "OTP Match", userData };
        }
        else {
          return { Status: "Error", Details: "OTP Mismatch", userInfo };
        }
        
      } 
   
    }
    if(type=="sponsor"){
      userData = await sponsorPartner.findOne({
        email:email,
     
        isDeleted: false,
      }).lean();
  
      if (userData) {
        let otpInfo = await sponsorPartner.findOne({
          email: email,
          otp:otp,
        }).lean();
        console.log(body);
  
       
        if (otpInfo) {
        
  
          await sponsorPartner.findOneAndUpdate(
            {
              _id: userData._id,
            },
            { $set: { email_verify: true } },{new:true}
          );
          return { Status: "Sucess", Details: "OTP Match", userData };
        }   else {
          return { Status: "Error", Details: "OTP Mismatch", userInfo };
        }
  
       
      }
    
    }
    if(type=="school"){
      userData = await schoolOwner.findOne({
        email:email,
     
        isDeleted: false,
      }).lean();
  
      if (userData) {
        let otpInfo = await schoolOwner.findOne({
          email: email,
          otp:otp,
        }).lean();
        console.log(body);
  
       
        if (otpInfo) {
        
  
          await schoolOwner.findOneAndUpdate(
            {
              _id: userData._id,
            },
            { $set: { email_verify: true } },{new:true}
          );
          return { Status: "Sucess", Details: "OTP Match", userData };
        }   else {
          return { Status: "Error", Details: "OTP Mismatch", userInfo };
        }
  
       
      }
    
    }
    }


    public async searchUser(search:any){
let userData=await Users.find( { fullName: { $regex: search, $options: "i" } })
return userData
    }



}

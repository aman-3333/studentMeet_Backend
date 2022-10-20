import eventPartner, { IPartner } from "../models/eventPartner";
import Category, { ICategory } from "../models/Category";




import { ObjectId } from "mongoose";
import { generateOtp } from "../services/generateOtp";
import { verifyOtp } from "../services/verifyOtp";
import Otp from "../models/Otp";
import FuzzySearch from "fuzzy-search";


import fs from "fs"
import { listeners } from "process";
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




export default class eventPartnerController {








    public async createeventPartner(body: any) {
        let createeventPartnerInfo: IPartner;
        createeventPartnerInfo = await eventPartner.create(body);

        return createeventPartnerInfo;
    }
    // public async createeventPartner(body: any) {
       
    //     let resp: any;
        
    //     let info: any;
    //     let otpArray: any = [];
    //     let phone = body.country_code.toString() + body.contact.toString();
    //     const userInfo = await eventPartner.findOne({ contact: body.contact }).lean();





    //     const otpInfo = await Otp.findOne({
    //         contact: body.contact,
    //         country_code: body.country_code,
    //     }).lean();

    //     if (!otpInfo) {

    //         console.log("resp", resp);
    //         function couponGenerator() {
    //             let text = "";
    //             let possible = "0123456789";

    //             for (let i = 0; i < 4; i++)
    //                 text += possible.charAt(Math.floor(Math.random() * possible.length));

    //             return text;
    //         }
    //         const info = new Otp({
    //             contact: body.contact,
    //             country_code: body.country_code,
    //             otp: couponGenerator(),
    //             otpId: couponGenerator()
    //         });
    //         await info.save();

    //         await Otp.findOneAndUpdate({ _id: info._id }, { $set: { otp: "1234" } })
    //     }


    //     console.log("resp", resp);
    //    if(info){
    //     let createeventPartnerInfo: IPartner;
    //         createeventPartnerInfo = await eventPartner.create(body);
    
    //         return createeventPartnerInfo;
    //    }


       

    // }



  
    public async logineventPartner(body: any) {
        let otp = body.otp;
        let data: any = await eventPartner.findOne({
            contact: body.contact,
            country_code: body.country_code,
            isDeleted: false,
        }).lean();

        if (data) {
            let otpInfo = await Otp.findOne({
                contact: body.contact,
                country_code: body.country_code,
            }).lean();

            let resp = await verifyOtp(otpInfo, otp);
            console.log("resp", resp);

            if (resp.Status == "Success" && resp.Details != "OTP Expired") {

                data = await eventPartner.findOneAndUpdate(
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


            } else if (resp.Status == "Success" && resp.Details == "OTP Expired") {
                return { Status: "Error", Details: "OTP Expired" };
            } else {
                return resp;
            }
            return data
        }

    }
    public async editeventPartner(body: IPartner, eventPartnerId: string) {
        const eventPartnerInfo: IPartner = await eventPartner.findOneAndUpdate({ _id: eventPartnerId, isDeleted: false }, body, { new: true }).lean();
        return eventPartnerInfo;
    }

    public async geteventPartnerByUserId(userId: any) {
        const eventPartnerInfo: IPartner = await eventPartner.findOne({ eventPartnerId: userId, isDeleted: false }).lean();
        return eventPartnerInfo;
    }

    public async eventPartnerActivate(status: any, ownerId: any, planId: any, eventPartnerId: any) {
        let eventPartnerInfo: any;
        if (status == 'Active') {
            eventPartnerInfo = await eventPartner.findOneAndUpdate({ _id: eventPartnerId, isDeleted: false }, { $set: { isActive: true } }).lean()
        } else if (status == 'Disactive') {
            eventPartnerInfo = await eventPartner.findOneAndUpdate({ _id: eventPartnerId, isDeleted: false }, { $set: { isActive: false } }).lean()
        } else if (status == 'Plan Active') {
            eventPartnerInfo = await eventPartner.findOneAndUpdate({ _id: eventPartnerId, isDeleted: false }, { $set: { planId: planId } }).lean()
        } else if (status == 'Plan DisActive') {
            eventPartnerInfo = await eventPartner.findOneAndUpdate({ _id: eventPartnerId, isDeleted: false }, { $set: { planId: 0 } }).lean()
        } else if (status == 'BlackList') {
            eventPartnerInfo = await eventPartner.findOneAndUpdate({ _id: eventPartnerId, isDeleted: false }, { $set: { isActive: false, isBlackList: true } }).lean()
        } else if (status == 'Remove BlackList') {
            eventPartnerInfo = await eventPartner.findOneAndUpdate({ _id: eventPartnerId, isDeleted: false }, { $set: { isActive: true, isBlackList: false } }).lean()
        }
        return eventPartnerInfo
    }



    public async geteventPartnerAdminPannel(latitude: any, longitude: any, area: any, status: any, categoryId: any, stateId: any, cityId: any, limit: any, skip: any, search: any) {
        let eventPartnerInfo: any = await eventPartner.find({ category: categoryId, isDeleted: false });
        if (status == 'Active') {
            eventPartnerInfo = eventPartnerInfo.filter((item: any) => item.isActive == true)
        } else if (status == 'Disactive') {
            eventPartnerInfo = eventPartnerInfo = eventPartnerInfo.filter((item: any) => item.isActive == false)
        } else if (status == 'BlackList') {
            eventPartnerInfo = eventPartnerInfo = eventPartnerInfo.filter((item: any) => item.isBlackList == true)
        } else if (status == 'Remove BlackList') {
            eventPartnerInfo = eventPartnerInfo = eventPartnerInfo.filter((item: any) => item.isBlackList == false)
        } else if (status == 'contact verify') {
            eventPartnerInfo = eventPartnerInfo = eventPartnerInfo.filter((item: any) => item.contact_verify == true)
        } else if (status == 'contact notverify') {
            eventPartnerInfo = eventPartnerInfo = eventPartnerInfo.filter((item: any) => item.contact_verify == false)
        } else if (stateId) {
            eventPartnerInfo = eventPartnerInfo = eventPartnerInfo.filter((item: any) => item.state == stateId)
        } else if (cityId) {
            eventPartnerInfo = eventPartnerInfo = eventPartnerInfo.filter((item: any) => item.city == cityId)
        }
        if (limit && skip) {

            eventPartnerInfo = eventPartnerInfo.slice(skip).slice(0, limit);

        }
        return eventPartnerInfo;
    }













   












    public async geteventPartnerInfoById(partnerId: any) {
        let eventPartnerInfo: any = await eventPartner.aggregate([{
            "$match": {
                _id: partnerId
            }
        }])
        return eventPartnerInfo;
    }

    public async deleteeventPartner(eventPartnerId: String) {
        const eventPartnerInfo: IPartner = await eventPartner.findOneAndUpdate({ _id: eventPartnerId, isDeleted: false }, { $set: { isDeleted: true } }, { new: true }).lean();
        return eventPartnerInfo;
    }

}
import SponsorsPartner, { IPartner } from "../models/sponserPartner";
import Category, { ICategory } from "../models/category";




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




export default class SponsorsPartnerController {








    public async createSponsorsPartner(body: any) {
        let createSponsorsPartnerInfo: IPartner;
        createSponsorsPartnerInfo = await SponsorsPartner.create(body);

        return createSponsorsPartnerInfo;
    }
    // public async createSponsorsPartner(body: any) {
       
    //     let resp: any;
        
    //     let info: any;
    //     let otpArray: any = [];
    //     let phone = body.country_code.toString() + body.contact.toString();
    //     const userInfo = await SponsorsPartner.findOne({ contact: body.contact }).lean();





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
    //     let createSponsorsPartnerInfo: IPartner;
    //         createSponsorsPartnerInfo = await SponsorsPartner.create(body);
    
    //         return createSponsorsPartnerInfo;
    //    }


       

    // }


public async getpartnerlist(){
    let partnerlist:any=await SponsorsPartner.aggregate([{
        $match:{
            isDeleted:false
        }
    }])
    return partnerlist
}
  
    public async loginSponsorsPartner(body: any) {
        let otp = body.otp;
        let data: any = await SponsorsPartner.findOne({
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
            

            if (resp.Status == "Success" && resp.Details != "OTP Expired") {

                data = await SponsorsPartner.findOneAndUpdate(
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
    public async editSponsorsPartner(body: IPartner, SponsorsPartnerId: string) {
        const SponsorsPartnerInfo: IPartner = await SponsorsPartner.findOneAndUpdate({ _id: SponsorsPartnerId, isDeleted: false }, body, { new: true }).lean();
        return SponsorsPartnerInfo;
    }

    public async getSponsorsPartnerByUserId(userId: any) {
        const SponsorsPartnerInfo: IPartner = await SponsorsPartner.findOne({ SponsorsPartnerId: userId, isDeleted: false }).lean();
        return SponsorsPartnerInfo;
    }

    public async SponsorsPartnerActivate(status: any, ownerId: any, planId: any, SponsorsPartnerId: any) {
        let SponsorsPartnerInfo: any;
        if (status == 'Active') {
            SponsorsPartnerInfo = await SponsorsPartner.findOneAndUpdate({ _id: SponsorsPartnerId, isDeleted: false }, { $set: { isActive: true } }).lean()
        } else if (status == 'Disactive') {
            SponsorsPartnerInfo = await SponsorsPartner.findOneAndUpdate({ _id: SponsorsPartnerId, isDeleted: false }, { $set: { isActive: false } }).lean()
        } else if (status == 'Plan Active') {
            SponsorsPartnerInfo = await SponsorsPartner.findOneAndUpdate({ _id: SponsorsPartnerId, isDeleted: false }, { $set: { planId: planId } }).lean()
        } else if (status == 'Plan DisActive') {
            SponsorsPartnerInfo = await SponsorsPartner.findOneAndUpdate({ _id: SponsorsPartnerId, isDeleted: false }, { $set: { planId: 0 } }).lean()
        } else if (status == 'BlackList') {
            SponsorsPartnerInfo = await SponsorsPartner.findOneAndUpdate({ _id: SponsorsPartnerId, isDeleted: false }, { $set: { isActive: false, isBlackList: true } }).lean()
        } else if (status == 'Remove BlackList') {
            SponsorsPartnerInfo = await SponsorsPartner.findOneAndUpdate({ _id: SponsorsPartnerId, isDeleted: false }, { $set: { isActive: true, isBlackList: false } }).lean()
        }
        return SponsorsPartnerInfo
    }



    public async getSponsorsPartnerAdminPannel(latitude: any, longitude: any, area: any, status: any, categoryId: any, stateId: any, cityId: any, limit: any, skip: any, search: any) {
        let SponsorsPartnerInfo: any = await SponsorsPartner.find({ category: categoryId, isDeleted: false });
        if (status == 'Active') {
            SponsorsPartnerInfo = SponsorsPartnerInfo.filter((item: any) => item.isActive == true)
        } else if (status == 'Disactive') {
            SponsorsPartnerInfo = SponsorsPartnerInfo = SponsorsPartnerInfo.filter((item: any) => item.isActive == false)
        } else if (status == 'BlackList') {
            SponsorsPartnerInfo = SponsorsPartnerInfo = SponsorsPartnerInfo.filter((item: any) => item.isBlackList == true)
        } else if (status == 'Remove BlackList') {
            SponsorsPartnerInfo = SponsorsPartnerInfo = SponsorsPartnerInfo.filter((item: any) => item.isBlackList == false)
        } else if (status == 'contact verify') {
            SponsorsPartnerInfo = SponsorsPartnerInfo = SponsorsPartnerInfo.filter((item: any) => item.contact_verify == true)
        } else if (status == 'contact notverify') {
            SponsorsPartnerInfo = SponsorsPartnerInfo = SponsorsPartnerInfo.filter((item: any) => item.contact_verify == false)
        } else if (stateId) {
            SponsorsPartnerInfo = SponsorsPartnerInfo = SponsorsPartnerInfo.filter((item: any) => item.state == stateId)
        } else if (cityId) {
            SponsorsPartnerInfo = SponsorsPartnerInfo = SponsorsPartnerInfo.filter((item: any) => item.city == cityId)
        }
        if (limit && skip) {

            SponsorsPartnerInfo = SponsorsPartnerInfo.slice(skip).slice(0, limit);

        }
        return SponsorsPartnerInfo;
    }

    public async getSponsorsPartnerInfoById(partnerId: any) {
        let SponsorsPartnerInfo: any = await SponsorsPartner.aggregate([{
            "$match": {
                _id: partnerId
            }
        }])
        return SponsorsPartnerInfo;
    }

    public async deleteSponsorsPartner(SponsorsPartnerId: String) {
        const SponsorsPartnerInfo: IPartner = await SponsorsPartner.findOneAndUpdate({ _id: SponsorsPartnerId, isDeleted: false }, { $set: { isDeleted: true } }, { new: true }).lean();
        return SponsorsPartnerInfo;
    }

}
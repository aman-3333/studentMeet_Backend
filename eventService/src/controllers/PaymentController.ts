import academy from "../models/academy"
import { CapturePayment, createVendorAccount } from "../services/razorpayServices"


import nconf, { any } from "nconf";
import Razorpay from "razorpay";
import crypto from "crypto";
import Sponsorship from "../models/sponsorshipDetails";
import userActivity from "../models/userActivity";

var razorpayConfig = require("../../config/razorpay/betaProperties").RAZORPAY
const fs = require('fs');
const Hogan = require('hogan.js');

export default class PaymentController {
  getRandomId:any = () => {
    var d = new Date();
    function f(n: any) {

      return n < 10 ? '0' + n : n;
    }
    var random_num = Math.floor(Math.random() * (99999999999 - 10000000000)) + 10000000000;
    random_num = d.getFullYear() + f(d.getMonth() + 1) + f(d.getDate()) + random_num;
    return random_num
  };
  public async createRegistration(academyId: any) {
    let shopDetails: any
    let resp
    const registrationDetail: any = await academy.findOne({ _id: academyId }).lean()
    let receiptID = this.getRandomId()
    const totalAmount = registrationDetail.orderTotal * 100
    let options = {
      amount: totalAmount,
      currency: 'INR',
      receipt: receiptID,
    };
    const razorpay = new Razorpay({
      key_id: razorpayConfig.key_id,
      key_secret: razorpayConfig.key_secret
    });
    const response = await razorpay.orders.create(options);
    if (response && response.id) {
      resp = await academy.findOneAndUpdate({ _id: academyId }, { $set: { order_id: response.id, receipt: receiptID, } }, { new: true });
    }
    return resp;
  }

  public async paymentCallback(data: any) {
    const orderData: any = await academy.findOne({ order_id: data.razorpayOrderId }).lean()
    let resp: any;
    let Paymentresp: any
    if (orderData && orderData._id) {
      const generated_signature = crypto.createHmac("sha256", razorpayConfig.key_secret).update(orderData.order_id + "|" + data.razorpayPaymentId).digest("hex");

        Paymentresp = await CapturePayment(data.razorpayPaymentId, orderData.orderTotal * 100, "INR", razorpayConfig.key_id, razorpayConfig.key_secret)
        if (Paymentresp.status == 'captured') {
          resp = await academy.findOneAndUpdate({ order_id: data.razorpayOrderId }, { payment_status: "Paid", payment_method: Paymentresp.method, payment_id: data.razorpayPaymentId },{new:true})
          let SponsorshipInfo: any = await Sponsorship.findOneAndUpdate({ _id: resp.SponsorshipId, isDeleted: false }, { $inc: { noOfParticipentBook: 1 } }, { new: true }).lean()
          let friendInfo:any=   await userActivity.findOneAndUpdate({userId:resp.userId,isDeleted:false}).lean()
           
          if (resp.isSponsorshipOrganizer == true) {
            await Sponsorship.findOneAndUpdate({ _id: SponsorshipInfo._id }, { $set: { isOrganized: true, isregistrationPaid: true,organizerId:resp.userId } },{new:true}).lean()
        
          }
          let remainingSeat = SponsorshipInfo.totalParticipent - SponsorshipInfo.noOfParticipentBook
          SponsorshipInfo = await Sponsorship.findOneAndUpdate({ _id: SponsorshipInfo._id, isDeleted: false }, { $set: { remainingSeat: remainingSeat } }, { new: true }).lean()
          if (SponsorshipInfo.remainingSeat == 0) await Sponsorship.findOneAndUpdate({ _id: SponsorshipInfo._id, isDeleted: false }, { $set: { isSeatfull: true } }).lean()
        }
      }

    
    return resp
  }


}
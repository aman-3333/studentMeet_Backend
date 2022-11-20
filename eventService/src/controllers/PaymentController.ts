import bookEvent from "../models/eventBook"
import { CapturePayment, createVendorAccount } from "../services/razorpayServices"


import nconf, { any } from "nconf";
import Razorpay from "razorpay";
import crypto from "crypto";
var razorpayConfig= require ("../../config/razorpay/betaProperties").RAZORPAY
const fs = require('fs');
const Hogan = require('hogan.js');

export default class PaymentController {
  getRandomId = () => {
    var d = new Date();
    function f(n: any) {

      return n < 10 ? '0' + n : n;
    }
    var random_num = Math.floor(Math.random() * (99999999999 - 10000000000)) + 10000000000;
    random_num = d.getFullYear() + f(d.getMonth() + 1) + f(d.getDate()) + random_num;
    return random_num
  };
  public async createbookEvent(bookEventId: any) {
    let shopDetails: any
    let resp
    const bookEventDetail: any = await bookEvent.findOne({ _id: bookEventId }).populate("eventId")
    // const EventDetail: any = await event.findOne({ _id: bookEventDetail.eventId })
    console.log("bookEventDetail",bookEventDetail);
    
    let receiptID = this.getRandomId()
    const totalAmount = bookEventDetail.eventId.priceForParticipent * 100
    const options = {
      amount: totalAmount,
      currency: 'INR',
      receipt: receiptID,
    };
   
    console.log(options, "options")
    const razorpay = new Razorpay({
      key_id: razorpayConfig.key_id,
      key_secret:razorpayConfig.key_secret
    });
    const response = await razorpay.orders.create(options);
    if (response && response.id) {
      // let prodresp: any[] = [];
     
      resp = await bookEvent.findOneAndUpdate({ _id: bookEventId }, {$set:{ order_id: response.id, receipt: receiptID, }}, { new: true });
     
    }
    return resp
  }





  public async paymentCallback(data: any) {
   
    const bookEventData: any = await bookEvent.findOne({ order_id: data.razorpayOrderId, isDeleted: false }).populate("eventId")
    console.log("bookEventData",bookEventData);
    
    let resp
    let Paymentresp: any

      const generated_signature = crypto.createHmac("sha256", razorpayConfig.key_secret).update(bookEventData.order_id + "|" + data.razorpayPaymentId).digest("hex");
    console.log("generated_signature",generated_signature);
    
      if (generated_signature) {
        Paymentresp = await CapturePayment(data.razorpayPaymentId, bookEventData.eventId.priceForParticipent * 100, "INR",  razorpayConfig.key_id, razorpayConfig.key_secret)
        
        if (Paymentresp.status == 'captured') {
          await bookEvent.updateOne({ bookEvent_id: data.razorpaybookEventId, isDeleted: false }, { payment_status: "Paid", payment_method: Paymentresp.method, payment_id: data.razorpayPaymentId })
        }
      }

    
    return resp
  }

 
}
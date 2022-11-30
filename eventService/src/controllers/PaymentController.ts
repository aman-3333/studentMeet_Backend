import bookEvent from "../models/eventBook"
import { CapturePayment, createVendorAccount } from "../services/razorpayServices"


import nconf, { any } from "nconf";
import Razorpay from "razorpay";
import crypto from "crypto";
import event from "../models/event";
var razorpayConfig = require("../../config/razorpay/betaProperties").RAZORPAY
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
    const bookEventDetail: any = await bookEvent.findOne({ _id: bookEventId }).lean()
    let receiptID = this.getRandomId()
    const totalAmount = bookEventDetail.orderTotal * 100
    const options = {
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
      resp = await bookEvent.findOneAndUpdate({ _id: bookEventId }, { $set: { order_id: response.id, receipt: receiptID, } }, { new: true });
    }
    return resp;
  }

  public async paymentCallback(data: any) {
    const orderData: any = await bookEvent.findOne({ order_id: data.razorpayOrderId, isDeleted: false }).lean()
    let resp: any;
    let Paymentresp: any
    if (orderData && orderData._id) {
      const generated_signature = crypto.createHmac("sha256", razorpayConfig.key_secret).update(orderData.order_id + "|" + data.razorpayPaymentId).digest("hex");
      if (generated_signature == data.razorpaySignature) {
        Paymentresp = await CapturePayment(data.razorpayPaymentId, orderData.orderTotal * 100, "INR", razorpayConfig.key_id, razorpayConfig.key_secret)
        if (Paymentresp.status == 'captured') {
          resp = await bookEvent.findOneAndUpdate({ order_id: data.razorpayOrderId, isDeleted: false }, { payment_status: "Paid", payment_method: Paymentresp.method, payment_id: data.razorpayPaymentId })
          let eventInfo: any = await event.findOneAndUpdate({ _id: resp.eventId, isDeleted: false }, { $inc: { noOfParticipentBook: 1 } }, { new: true }).lean()
          if (resp.isEventOrganizer == true) await event.findOneAndUpdate({ _id: eventInfo._id }, { $set: { isOrganized: true, isBookEventPaid: true } }).lean()
          let remainingSeat = eventInfo.totalParticipent - eventInfo.noOfParticipentBook
          eventInfo = await event.findOneAndUpdate({ _id: eventInfo._id, isDeleted: false }, { $set: { remainingSeat: remainingSeat } }, { new: true }).lean()
          if (eventInfo.remainingSeat == 0) await event.findOneAndUpdate({ _id: eventInfo._id, isDeleted: false }, { $set: { isSeatfull: true } }).lean()
        }
      }

    }
    return resp
  }


}
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
    console.log("response",response);
    
    if (response && response.id) {
      // let prodresp: any[] = [];
     
    await bookEvent.findOneAndUpdate({ _id: bookEventId }, {$set:{ order_id: response.id, receipt: receiptID, }}, { new: true });
     
    }
    return response
  }






  // public async paymentCallback(data: any) {
  //   console.log(data, "line64F")
  //   const orderData: any = await Order.findOne({ order_id: data.razorpayOrderId, isDeleted: false }).lean()

  //   console.log(orderData, "line 65")
  //   let resp
  //   let Paymentresp: any
  //   if (orderData && orderData._id) {
  //     const generated_signature = crypto.createHmac("sha256", razorpayConfig.key_secret).update(orderData.order_id + "|" + data.razorpayPaymentId).digest("hex");
  //     if (generated_signature == data.razorpaySignature) {
        
  //       resp = "success"
  //       Paymentresp = await CapturePayment(data.razorpayPaymentId, orderData.orderTotal * 100, "INR", this.razorpay_key_id, razorpayConfig.key_secret)
  //       let prodresp: any[] = [];
  //       if (orderData && orderData.orderProduct && orderData.orderProduct.length > 0) {
  //         const products: any = orderData.orderProduct;
  //         const orderUpdate = await Order.updateOne({ _id: orderData._id }, { Status: "Placed", receipt_generation_date: new Date() });
  //         for (let p = 0; p < orderData.orderProduct.length; p++) {
  //           if (products[p]._id && products[p].quantity) {
  //             const q = 0 - products[p].quantity;
  //             const resp1 = await Product.updateMany({ variations: { $elemMatch: { _id: products[p].variationId } } }, { $inc: { "variations.$.stock": q } }, { new: true }).lean();

  //             prodresp.push(resp1);
  //           }
  //         }
  //       }
        
       
  //       if (Paymentresp.status == 'captured') {
  //         await Order.updateOne({ order_id: data.razorpayOrderId, isDeleted: false }, { payment_status: "Paid", payment_method: Paymentresp.method, payment_id: data.razorpayPaymentId })
  //       }
  //     }

  //   }
  //   return resp
  // }

 
}
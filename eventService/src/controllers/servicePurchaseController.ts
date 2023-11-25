import achivement from "../models/achivement";
import bankDetails from "../models/bankDetails";
import servicePurchase, { IServicePurchase } from "../models/servicePurchase";
import post from "../models/post";
const razorpay = require('razorpay');
const razorpayKey= "rzp_test_sIR02kOhciAGll";
const  razorpaySecret="mg1EJI3f1zr07H6YeRkCF98O";
const mongoose = require("mongoose");
import {
  capturePayment,
  validatePayment
} from "../services/razorpayServices";
export default class servicePurchaseController {

    public async createOrder(body: any) {
        const { amount,type, senderId,postId,achivementId,schoolId,academyId,ownerId, email,userId,status,note,account_id } = body;
        var instance = new razorpay({ key_id: razorpayKey, key_secret: razorpaySecret })
  const orderDetail =  await   instance.orders.create({
          amount: amount,
          currency: "INR",
          transfers: [
            {
              account: account_id,
              amount: amount,
              currency: "INR",
              notes: {
                branch: "Acme Corp Bangalore North",
                name: "Gaurav Kumar"
              },
              linked_account_notes: [
                "branch"
              ],
              on_hold: 1,
              on_hold_until: 1771222870
            }
          ]
        })

if(type=="post"&& postId){

const serviceCreate= new servicePurchase({
    amount: amount,
    account_id: account_id,
    senderId: senderId,
    ownerId:ownerId,
    order_id: orderDetail.id,
    postId: postId,
    type: "post money",
    status: orderDetail.status,

})


await serviceCreate.save()

}

if(type=="achivement"&& achivementId){

  const serviceCreate= new servicePurchase({
      amount: amount,
      account_id: account_id,
      senderId: senderId,
      ownerId:ownerId,
      order_id: orderDetail.id,
      achivementId: achivementId,
      type: "achivement money",
      status: orderDetail.status,
  
  })
  
  
  await serviceCreate.save()
  
  }


  if(type=="academy registration"&& academyId){

    const serviceCreate= new servicePurchase({
        amount: amount,
        account_id: account_id,
        senderId: senderId,
        ownerId:ownerId,
        order_id: orderDetail.id,
        academyId: academyId,
        type: "academy registration",
        status: orderDetail.status,
    
    })
    
    
    await serviceCreate.save()
    
    }



    if(type=="school registration"&& schoolId){

      const serviceCreate= new servicePurchase({
          amount: amount,
          account_id: account_id,
          senderId: senderId,
          ownerId:ownerId,
          order_id: orderDetail.id,
          schoolId: schoolId,
          type: "school registration",
          status: orderDetail.status,
      
      })
      await serviceCreate.save()
      
      }





        return orderDetail;
    
    }


    
    public async capturePament(body: any) {
            const { order_id, payment_id, razorpay_signature, amount  } = body;
         
         const validatePament =  await validatePayment(order_id, payment_id, razorpay_signature);
        
         if (!validatePament) {

         }
         else{
        return   await capturePayment(payment_id, amount);
         }
        
    

    }


    public async getPostGiftTranstion(body: any) {
  const data=   await servicePurchase.aggregate([
      {
$match:{
  postId:new mongoose.Types.ObjectId(body.postId)
}
      },
      {
        $lookup: {
          localField: "senderId",
          from: "userdetails",
          foreignField: "_id",
          as: "senderData",
        },
      },
      { $unwind: { path: "$senderData", preserveNullAndEmptyArrays: true } },
    ])


    return data
}


public async getAchivementGiftTranstion(body: any) {
  const data=   await servicePurchase.aggregate([
      {
$match:{
  achivementId:new mongoose.Types.ObjectId(body.achivementId)
}
      },
      {
        $lookup: {
          localField: "senderId",
          from: "userdetails",
          foreignField: "_id",
          as: "senderData",
        },
      },
      { $unwind: { path: "$senderData", preserveNullAndEmptyArrays: true } },
    ])


    return data
}

public async userAccountDetailForPost(body: any) {
  let postDetail = await post.aggregate([
    { $match: {  _id:new mongoose.Types.ObjectId(body.postId), isDeleted: false } },
    {
      $lookup: {
        localField: "userId",
        from: "bank_details",
        foreignField: "user_id",
        as: "bankDetails",
      },
    },
    { $unwind: { path: '$bankDetails', preserveNullAndEmptyArrays: true } },
    {
      $lookup: {
        localField: "userId",
        from: "userdetails",
        foreignField: "_id",
        as: "user",
      },
    },
    { $unwind: { path: "$user", preserveNullAndEmptyArrays: true } },
    {
      $lookup: {
        localField: "state",
        from: "states",
        foreignField: "_id",
        as: "state",
      },
    },
    { $unwind: { path: "$state", preserveNullAndEmptyArrays: true } },
    {
      $lookup: {
        localField: "city",
        from: "cities",
        foreignField: "_id",
        as: "city",
      },
    },
    { $unwind: { path: "$city", preserveNullAndEmptyArrays: true } },
    {
      $lookup: {
        localField: "country",
        from: "countries",
        foreignField: "_id",
        as: "country",
      },
    },
    { $unwind: { path: "$country", preserveNullAndEmptyArrays: true } },
    {
      $lookup: {
        localField: "instituteId",
        from: "institutes",
        foreignField: "_id",
        as: "institutes",
      },
    },
   
 
  
  ]);



  return postDetail;
}










  public async userAccountDetailForAchivement(body: any) {
   
      const achivementList = await achivement.aggregate([
        {
          $match: {
            user_id: new mongoose.Types.ObjectId(body.userId),isDeleted: false,
          },
        },
        {
          $lookup: {
            localField: "userId",
            from: "bank_details",
            foreignField: "user_id",
            as: "bankDetails",
          },
        },
        { $unwind: { path: '$bankDetails', preserveNullAndEmptyArrays: true } },

        {
          $lookup: {
            localField: "userId",
            from: "userdetails",
            foreignField: "_id",
            as: "userDetail",
          },
        },
        { $unwind: { path: "$userDetail", preserveNullAndEmptyArrays: true } },
        {
          $lookup: {
            localField: "schoolId",
            from: "schools",
            foreignField: "_id",
            as: "school",
          },
        },
        { $unwind: { path: "$school", preserveNullAndEmptyArrays: true } },
        {
          $lookup: {
            localField: "city",
            from: "cities",
            foreignField: "_id",
            as: "city",
          },
        },
        { $unwind: { path: "$city", preserveNullAndEmptyArrays: true } },
        {
          $lookup: {
            localField: "state",
            from: "states",
            foreignField: "_id",
            as: "state",
          },
        },
        { $unwind: { path: "$state", preserveNullAndEmptyArrays: true } },
        {
          $lookup: {
            localField: "country",
            from: "countries",
            foreignField: "_id",
            as: "country",
          },
        },
        { $unwind: { path: "$country", preserveNullAndEmptyArrays: true } },
      ]);
  
     
  
      return achivementList;
    
    
    
    
   
   
  }




}
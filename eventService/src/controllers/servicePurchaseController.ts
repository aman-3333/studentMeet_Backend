import achivement from "../models/achivement";
import bankDetails from "../models/bankDetails";
import servicePurchase, { IServicePurchase } from "../models/servicePurchase";
import post from "../models/post";
const razorpay = require('razorpay');
const razorpayKey= "rzp_test_sIR02kOhciAGll";
const  razorpaySecret="mg1EJI3f1zr07H6YeRkCF98O";
const mongoose = require("mongoose");
const SendOtp = require('sendotp');
const sendOtp = new SendOtp('AuthKey');

import {
  capturePayment,
  validatePayment
} from "../services/razorpayServices";

import {
  currentDateTime
} from "../services/dateUtils";


export default class servicePurchaseController {

    public async createOrder(body: any) {
        const { amount,type, senderId,postId,achivementId,schoolId,academyId,ownerId,account_id } = body;
       const orderAmount =amount*100
       
        var instance = new razorpay({ key_id: razorpayKey, key_secret: razorpaySecret })
  const orderDetail =  await   instance.orders.create({
          amount: orderAmount,
          currency: "INR",
          transfers: [
            {
              account: account_id,
              amount: orderAmount,
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







        return orderDetail;
    
    }


    
    public async capturePament(body: any) {
            const { order_id, payment_id, razorpay_signature, amount,postId,account_id,senderId,ownerId,academyId,achivementId,schoolId  } = body;
            var instance = new razorpay({ key_id: razorpayKey, key_secret: razorpaySecret })

const Amount = amount*100
            const captureResponse = await  instance.payments.capture(payment_id,Amount );
            if(captureResponse.status == "captured"){


              if(postId){

                const serviceCreate= new servicePurchase({
                    amount: Amount,
                    account_id: account_id,
                    senderId: senderId,
                    ownerId:ownerId,
                    orderId: order_id,
                    paymentId:captureResponse.id,
                    postId: postId,
                    type: "post money",
                    status:captureResponse.status,
                
                })
                
                
                await serviceCreate.save()
                
                }
                
                if(achivementId){
                
                  const serviceCreate= new servicePurchase({
                      amount: Amount,
                      account_id: account_id,
                      senderId: senderId,
                      ownerId:ownerId,
                      orderId: order_id,
                      paymentId:captureResponse.id,
                      achivementId: achivementId,

                      type: "achivement money",
                      status:captureResponse.status,
                  
                  })
                  
                  
                  await serviceCreate.save()
                  
                  }
                
                  if(academyId){
                
                    const serviceCreate= new servicePurchase({
                        amount: Amount,
                        account_id: account_id,
                        senderId: senderId,
                        ownerId:ownerId,
                        orderId: order_id,
                        paymentId:captureResponse.id,
                        academyId: academyId,
  
                        type: "academy registration",
                        status:captureResponse.status,
                    
                    })
                    
                    
                    await serviceCreate.save()
                    
                    }
                    if(schoolId){
                
                      const serviceCreate= new servicePurchase({
                          amount: Amount,
                          account_id: account_id,
                          senderId: senderId,
                          ownerId:ownerId,
                          orderId: order_id,
                          paymentId:captureResponse.id,
                          schoolId: schoolId,
    
                          type: "school registration",
                          status:captureResponse.status,
                      
                      })
                      await serviceCreate.save()
                      
                      }


           
            }
            return   captureResponse;
      
        
  

    }


    public async getPostGiftTranstion(body: any) {
  const data=   await servicePurchase.aggregate([

    {
      $sort: {
        createdAt: -1
      }
    },
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
      
      {
        $lookup: {
          localField: "ownerId",
          from: "userdetails",
          foreignField: "_id",
          as: "ownerData",
        },
      },
      { $unwind: { path: "$ownerData", preserveNullAndEmptyArrays: true } },

      {
        $lookup: {
          localField: "postId",
          from: "posts",
          foreignField: "_id",
          as: "postData",
        },
      },
      { $unwind: { path: "$postData", preserveNullAndEmptyArrays: true } },
      {
        $addFields: {

          formattedCreatedAt: {
            $dateToString: {
              format: "%d/%m/%Y  %H:%M",
              date: {
                $add: [
                  "$createdAt", // assuming createdAt is your date field
                  { $multiply: [330, 60000] } // 330 minutes in milliseconds
                ]
              }
            }
          }
        }



        
      },

     



    ])




    return data
}








public async getAchivementGiftTranstion(body: any) {
  const data=   await servicePurchase.aggregate([

    {
      $sort: {
        createdAt: -1
      }
    },

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

      {
        $lookup: {
          localField: "ownerId",
          from: "userdetails",
          foreignField: "_id",
          as: "ownerData",
        },
      },
      { $unwind: { path: "$ownerData", preserveNullAndEmptyArrays: true } },

      {
        $lookup: {
          localField: "achivementId",
          from: "achivements",
          foreignField: "_id",
          as: "achivementData",
        },
      },
      { $unwind: { path: "$achivementData", preserveNullAndEmptyArrays: true } },
      {
        $addFields: {
          // Adding 330 minutes to the createdAt field
          adjustedTime: { $add: ["$createdAt", 330 * 60 * 1000] }
        }
      },

      {
        $addFields: {
          // Adding 330 minutes to the createdAt field
          adjustedOneTime: { $add: ["$createdAt", 330 * 60 * 1000] }
        }
      },

      {
        $addFields: {
          formattedCreatedAt: {
            $dateToString: {
              format: "%d/%m/%Y  %H:%M", // Customize the format as needed
              date:"$adjustedTime"
            }
          }
        }
      },

      {
        $addFields: {
          formattedUpdatedAt: {
            $dateToString: {
              format: "%d/%m/%Y  %H:%M", // Customize the format as needed
              date: "$adjustedOneTime"
            }
          }
        }
      }
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
            _id: new mongoose.Types.ObjectId(body.achivementId),isDeleted: false,
          },
        },
        {
          $lookup: {
            localField: "user_id",
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

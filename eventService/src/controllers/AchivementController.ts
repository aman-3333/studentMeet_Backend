import academy from "../models/academy";
import Achivement, { IAchivement } from "../models/achivement";
import school from "../models/school";
import userActivity from "../models/userActivity";

import userDetails from "../models/userDetails";
import userDevice from "../models/userDevice";
import { sendNotification } from "../services/notification";
const mongoose = require("mongoose");
const currentTime: any = new Date();
export default class AchivementController {
  public async createAchivement(body: any) {
    const {userId,academyId,schoolId} = body;
  
    let achivementInfo = await Achivement.create(body);

    if (body.userId) {
      let userInfo =  await userActivity.aggregate([
        {
          $match: {
            userId: new mongoose.Types.ObjectId(userId),
            isDeleted: false,
          },
        },
        {
          $lookup: {
            localField: "userId",
            from: "userdetails",
            foreignField: "_id",
            as: "userData",
          },
        },
        { $unwind: { path: "$userData", preserveNullAndEmptyArrays: true } },
      ]);
      let userName =  userInfo[0].userData.fullName;
      userInfo =  userInfo[0].userFollowers;
      for (let i = 0; i < userInfo.length; i++) {
        let userFcmToken = await userDevice.findOne({ userId : userInfo[i] });
   if(userFcmToken){
   const body=`${userName} Create a new acchivement please check and react`;
    sendNotification(userFcmToken.fcmtoken,body,"abc","user_achivement",userInfo[i],achivementInfo._id);
   }  
      }
    }
    if (body.academyId) {
    
      let academyInfo = await academy.aggregate([
        {
          $match: {
            _id: new mongoose.Types.ObjectId(academyId),
            isDeleted: false,
          },
        },
      ]);
      let academyName =  academyInfo[0].academyName;
      academyInfo = academyInfo[0].followers;
      for (let i = 0; i < academyInfo.length; i++) {
        let userFcmToken = await userDevice.findOne({ userId : academyInfo[i] });
   if(userFcmToken){
   const body=`${academyName} Create a new acchivement please check and react`
    sendNotification(userFcmToken.fcmtoken,body,"abc","academy_achivement",academyInfo[i],achivementInfo._id);
   }  
      }
    }
    if (schoolId) {
      let schoolInfo = await school.aggregate([
        {
          $match: {
            _id: new mongoose.Types.ObjectId(schoolId),
            isDeleted: false,
          },
        },
      ]);
      let schoolName =  schoolInfo[0].schoolName;
      schoolInfo = schoolInfo[0].followers;
      for (let i = 0; i < schoolInfo.length; i++) {
        let userFcmToken = await userDevice.findOne({ userId : schoolInfo[i] });
   if(userFcmToken){
   const body=`${schoolName} Create a new acchivement please check and react`
    sendNotification(userFcmToken.fcmtoken,body,"abc","school_achivement",schoolInfo[i],achivementInfo._id);
   }
  }
  }
  return achivementInfo;
  }
  public async deletAchivement(achivementId: String) {
    const achivementInfo = await Achivement.findOneAndUpdate(
      { _id: achivementId },
      { $set: { isDeleted: true } },
      { new: true }
    ).lean();
    return achivementInfo;
  }

  public async editAchivement(body: any) {
    const achivementInfo: any = await Achivement.findOneAndUpdate(
      { _id: body._id, isDeleted: false },
      body,
      { new: true }
    ).lean();
    return achivementInfo;
  }

  public async getAchivementList() {
    const achivementList: IAchivement[] = await Achivement.find({
      isDeleted: false,
    });
    return achivementList;
  }

  public async getAcademyAchivement(academyId: any, user: any) {

    const achivementList: IAchivement[] = await Achivement.aggregate([
      {
        $match: {
          academyId: new mongoose.Types.ObjectId(academyId),
          isDeleted: false,
        },
      },
      {
        $lookup: {
          localField: "academyUserId",
          from: "userdetails",
          foreignField: "_id",
          as: "userParticipient",
        },
      },
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
  
    achivementList.forEach((val: any) => {

      if(val.achivementLike.length>0){
        if ( val.achivementLike.toString().includes(user._id.toString())) {
          val.isLikes = true;
        } else {
          val.isLikes = false;
        }
      }
     
    });
    return achivementList;
  }

  public async getAcademyAchivementForAdmin(academyId: any) {

    const achivementList: IAchivement[] = await Achivement.aggregate([
      {
        $match: {
          academyId: new mongoose.Types.ObjectId(academyId),
          isDeleted: false,
        },
      },
      {
        $lookup: {
          localField: "academyUserId",
          from: "userdetails",
          foreignField: "_id",
          as: "userParticipient",
        },
      },
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


  public async getSchoolAchivement(schoolId: any, user: any) {
    const achivementList: IAchivement[] = await Achivement.aggregate([
      {
        $match: {
          schoolId: new mongoose.Types.ObjectId(schoolId),
        },
      },
      {
        $lookup: {
          localField: "academyUserId",
          from: "userdetails",
          foreignField: "_id",
          as: "userParticipient",
        },
      },
   
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

    achivementList.forEach((val: any) => {
      if (val.achivementLike.toString().includes(user._id.toString())) {
        val.isLikes = true;
      } else {
        val.isLikes = false;
      }
    });
    return achivementList;
  }

  public async getSchoolAchivementForAdmin(schoolId: any) {
    const achivementList: IAchivement[] = await Achivement.aggregate([
      {
        $match: {
          schoolId: new mongoose.Types.ObjectId(schoolId),
        },
      },
      {
        $lookup: {
          localField: "academyUserId",
          from: "userdetails",
          foreignField: "_id",
          as: "userParticipient",
        },
      },
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

  public async getUserAchivement(userId: any, loginUser: any) {
    if(userId==loginUser._id){
      const achivementList = await Achivement.aggregate([
        {
          $match: {
            user_id: new mongoose.Types.ObjectId(userId),
          },
        },
        {
          $lookup: {
            localField: "user_id",
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


        {
          $addFields: {
            isEditable: "true"
          }
        },
      ]);
  
      achivementList.forEach((val: any) => {
        if (val.achivementLike.toString().includes(loginUser._id)) {
          val.isLikes = true;
        } else {
          val.isLikes = false;
        }
      });
  
      return achivementList;
    }else{
      const achivementList = await Achivement.aggregate([
        {
          $match: {
            user_id: new mongoose.Types.ObjectId(userId),
          },
        },
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
        {
          $addFields: {
            isEditable: "false"
          }
        },
      ]);
  
      achivementList.forEach((val: any) => {
        if (val.achivementLike.toString().includes(loginUser._id)) {
          val.isLikes = true;
        } else {
          val.isLikes = false;
        }
      });
  
      return achivementList;
    }
   
  }





  public async getAchivementInfoById(AchivementId: any) {
    const achivementInfo: any = await Achivement.findOne({
      _id: AchivementId,
      isDeleted: false,
    }).lean();
    return achivementInfo;
  }

  public async deleteAchivement(_id: any) {
    const achivementInfo: IAchivement = await Achivement.findOneAndUpdate(
      { _id: _id, isDeleted: false },
      { $set: { isDeleted: true } },
      { new: true }
    ).lean();
    return achivementInfo;
  }

  public async achivementActivity(userId: any, status: any, body: any) {
    let achivementInfo: any;
    const achivement_id = body.achivementId;
    if (status == "achivementLike") {

       
      achivementInfo = await Achivement.updateOne(
        { _id: body.achivementId }, 
        { $push: { achivementLike: userId },
        $inc: { achivementLikeCount: 1 } }
     )
   

      achivementInfo = await Achivement.findOne(
        {
          _id: body.achivementId,
        },
      
      );

      let userInfo = await userActivity.aggregate([
        {
          $match: {
            userId: new mongoose.Types.ObjectId(userId),
          
            isDeleted: false,
          },
        },
        {
          $lookup: {
            localField: "userId",
            from: "userdetails",
            foreignField: "_id",
            as: "userData",
          },
        },
        { $unwind: { path: "$userData", preserveNullAndEmptyArrays: true } },
      ]);


      let userName =  userInfo[0].userData.fullName;
      if(achivementInfo.user_id) {
        const achivementUser= await  userDevice.findOne({ userId : achivementInfo.user_id });

        
        const body =`${userName} like Your Achivemnt check and react `;
        sendNotification(achivementUser.fcmtoken,body,"abc","user_achivement",achivementInfo.user_id,achivement_id);
      }
      userInfo = userInfo[0].userFollowers;
  
      if(userInfo.length>0){
        for (let i = 0; i < userInfo.length; i++) {
 
          let userFcmToken = await userDevice.findOne({ userId : userInfo[i] });
         
     if(userFcmToken){
     const body = `${userName} like Achivemnt check and react. `;
      sendNotification(userFcmToken.fcmtoken,body,"abc","user_achivement",userInfo[i],achivement_id);
     }  
      }
   

   
      }
      return achivementInfo;
    }
    if (status == "removAchivementLike") {



      achivementInfo = await Achivement.updateOne(
        { _id: body.achivementId }, 
        { $pull: { achivementLike: userId },
        $inc: { achivementLikeCount: -1 } }
     )

      return achivementInfo;
    }

    if (status == "achivementComment") {
      console.log("hello")
      let userInfo:any ;
  


        achivementInfo = await Achivement.updateOne(
          { _id: body.achivementId }, 
          { $push: { achivementComment: { comment: body.comment,userId:userId,dateTime: currentTime } },
          $inc: { achivementCommentCount: 1 } }
       )
       achivementInfo=await Achivement.findOne({_id: body.achivementId}).lean()
      console.log(achivementInfo,"achivementInfo")

       userInfo = await userActivity.aggregate([
        {
          $match: {
            userId: new mongoose.Types.ObjectId(body.userId),
          
            isDeleted: false,
          },
        },
        {
          $lookup: {
            localField: "userId",
            from: "userdetails",
            foreignField: "_id",
            as: "userData",
          },
        },
        { $unwind: { path: "$userData", preserveNullAndEmptyArrays: true } },
      ]);

        let userName =  userInfo[0].userData.fullName;
        if(achivementInfo.user_id) {
          const achivementUser= await userDevice.findOne({ userId : achivementInfo.user_id });
          const body =`${userName} Comment On  Your Achivemnt check and react.`;
          sendNotification(achivementUser.fcmtoken,body,"abc","user_achivement",achivementInfo.user_id,achivement_id);
        }
        userInfo = userInfo[0].userFollowers;

        if(userInfo.length>0){
          for (let i = 0; i < userInfo.length; i++) {
            let userFcmToken = await userDevice.findOne({ userId : userInfo[i] });
      if(userFcmToken){
        const body =`${userName} Comment on  Achivemnt check and react.`;
        sendNotification(userFcmToken.fcmtoken,body,"abc","user_achivement",userInfo[i],achivement_id);
      }

        
          }
        }
       

        return achivementInfo;
      
    }
    if (status == "removeAchivementComment") {
      console.log("hello")
      achivementInfo = await Achivement.updateOne(
        { _id: body.achivementId }, 
        { $pull: { achivementComment: { _id: body._id } },
        $inc: { achivementCommentCount: -1 } }
     )

     return achivementInfo
    }
  }





  public async readAchivementActivity(
    achivementId: any,
    status: any,
    userId: any
  ) {
    let achivementInfo: any;
    let isDeleteable: any;
    if (status == "readAchivementLike") {
      achivementInfo = await Achivement.findOne({ _id: achivementId }).populate(
        "achivementLike"
      );
      achivementInfo = achivementInfo.achivementLike;
      return achivementInfo;
    }
    if (status == "readAchivementComment") {
      let a = [];
      achivementInfo = await Achivement.findOne({ _id: achivementId }).lean();
      achivementInfo = achivementInfo.achivementComment;
      for (let i = 0; i < achivementInfo.length; i++) {
        let userInfo: any = await userDetails.findOne(
          { _id: achivementInfo[i].userId },
          { fullName: true, profile_picture: true }
        );
        let commentId = achivementInfo[i]._id;
        let comment = achivementInfo[i].comment;
        let DateTime: any = achivementInfo[i].dateTime;
        if (userId == achivementInfo[i].userId) {
          isDeleteable = true;
        } else {
          isDeleteable = false;
        }
        a.push({ userInfo, comment, DateTime, isDeleteable,commentId });
      }
      var data = [...a].reverse();
      return data;
    }
  }



  
  public async shareAchivement( body:any ) {
    const {achivementSharedByOther,userId}=body
    for (let i = 0; i < achivementSharedByOther.length; i++) {
      let  achivementInfo = await userActivity.findOneAndUpdate(
        {
          userId: achivementSharedByOther[i].friendId,
          isDeleted:false
        },
        {
          $push: {
            achivementSharedByOther: {
              friendId: userId,
              achivementId: achivementSharedByOther[i].achivementId,
              dateTime: currentTime,
            },
          },
        },{new:true}
      );
      let userData:any = await userDetails.findOne({_id:userId});
      let userToken:any = await userDevice.findOne({userId:achivementSharedByOther[i].friendId});
      const body =`${userData.fullName} share achivement to you  please check and react`;
      sendNotification(userToken.fcmtoken,body,"abc","sponsorship_home",userToken.userId,achivementSharedByOther[i].academyId);
      return achivementInfo;
    }
      }
  
}

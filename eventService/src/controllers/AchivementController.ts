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
    console.log(user,"useruser")
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
      console.log(val.achivementLike);
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
    let count: any = 1;
    let minuscount: any = -1;
    const achivement_id = body.achivementId;
    if (status == "achivementLike") {
      await Achivement.updateOne(
        {
          _id: body.achivementId,
        },

        {
          $inc: { achivementLikeCount: count },
        }
      );

      achivementInfo = await Achivement.findOneAndUpdate(
        {
          _id: body.achivementId,
        },
        {
          $push: {
            achivementLike: userId,
          },
        },
        { new: true }
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
      
      for (let i = 0; i < userInfo.length; i++) {
        let userFcmToken = await userDevice.findOne({ userId : userInfo[i] });
   if(userFcmToken){
   const body = `${userName} like Achivemnt check and react. `;
    sendNotification(userFcmToken.fcmtoken,body,"abc","user_achivement",userInfo[i],achivement_id);
   }  

   
      }
      return achivementInfo;
    }
    if (status == "removAchivementLike") {
      await Achivement.updateOne(
        {
          _id: body.achivementId,
        },
        {
          $inc: { achivementLikeCount: minuscount },
        }
      );

      achivementInfo = await Achivement.findOneAndUpdate(
        {
          _id: body.achivementId,
        },
        {
          $pull: {
            achivementLike: userId,
          },
        },
        { new: true }
      );

      return achivementInfo;
    }

    if (status == "achivementComment") {
      let userInfo:any ;
      for (let i = 0; i < body.achivementComment.length; i++) {
        achivementInfo = await Achivement.findOneAndUpdate(
          {
            _id: body.achivementId,
          },
          {
            $push: {
              achivementComment: {
                userId: body.achivementComment[i].userId,
                comment: body.achivementComment[i].comment,
                dateTime: currentTime,
              },
            },
          }
        );
        await Achivement.updateOne(
          {
            _id: body.achivementId,
          },
          {
            $inc: { achivementCommentCount: count },
          }
          
        );
        userInfo = await userActivity.aggregate([
          {
            $match: {
              userId: new mongoose.Types.ObjectId(body.achivementComment[i].userId),
            
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
        }
        let userName =  userInfo[0].userData.fullName;
        if(achivementInfo.user_id) {
          const achivementUser= await userDevice.findOne({ userId : achivementInfo.user_id });
          const body =`${userName} Comment On  Your Achivemnt check and react.`;
          sendNotification(achivementUser.fcmtoken,body,"abc","user_achivement",achivementInfo.user_id,achivement_id);
        }
        userInfo = userInfo[0].userFollowers;
        for (let i = 0; i < userInfo.length; i++) {
          let userFcmToken = await userDevice.findOne({ userId : userInfo[i] });
     if(userFcmToken){
     const body =`${userName} Comment on  Achivemnt check and react.`;
      sendNotification(userFcmToken.fcmtoken,body,"abc","user_achivement",userInfo[i],achivement_id);
     }  
        }

        return achivementInfo;
      
    }
    if (status == "removeAchivementComment") {
      for (let i = 0; i < body.achivementComment.length; i++) {
        achivementInfo = await Achivement.findOneAndUpdate(
          {
            _id: body.achivementComment[i].achivementId,
          },
          {
            $pull: {
              achivementComment: {
                _id: body.achivementComment[i]._id,
              },
            },
          }
        );

        await Achivement.updateOne(
          {
            _id: body.achivementId,
          },
          {
            $inc: { achivementCommentCount: minuscount },
          }
        );

        return achivementInfo;
      }
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
      console.log(achivementInfo);
      achivementInfo = achivementInfo.achivementComment;

      for (let i = 0; i < achivementInfo.length; i++) {
        let userInfo: any = await userDetails.findOne(
          { _id: achivementInfo[i].userId },
          { fullName: true, profile_picture: true }
        );

        let comment = achivementInfo[i].comment;
        let DateTime: any = achivementInfo[i].dateTime;
        if (userId == achivementInfo[i].userId) {
          isDeleteable = true;
        } else {
          isDeleteable = false;
        }
        a.push({ userInfo, comment, DateTime, isDeleteable });
      }
      var data = [...a].reverse();
      return data;
    }
  }

  
}

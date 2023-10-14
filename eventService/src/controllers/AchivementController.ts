import Achivement, { IAchivement } from "../models/achivement";
import userActivity from "../models/userActivity";
import userDetails from "../models/userDetails";
import { sendNotification } from "../services/notification";
const mongoose = require("mongoose");
const currentTime: any = new Date();
export default class AchivementController {
  public async createAchivement(body: any) {
    let achivementInfo = await Achivement.create(body);

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

  public async editAchivement(body: IAchivement, AchivementId: string) {
    const achivementInfo: IAchivement = await Achivement.findOneAndUpdate(
      { _id: AchivementId, isDeleted: false },
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

  public async getAcademyAchivement(academyId: any,user:any) {
    const achivementList: IAchivement[] = await Achivement.aggregate([
      {
        $match: {academyId: new mongoose.Types.ObjectId(academyId),isDeleted:false
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
      { $unwind: { path: '$school', preserveNullAndEmptyArrays: true } },
      {
        $lookup: {
          localField: "city",
          from: "cities",
          foreignField: "_id",
          as: "city",
        },
      },
      { $unwind: { path: '$city', preserveNullAndEmptyArrays: true } },
      {
        $lookup: {
          localField: "state",
          from: "states",
          foreignField: "_id",
          as: "state",
        },
      },
      { $unwind: { path: '$state', preserveNullAndEmptyArrays: true } },
      {
        $lookup: {
          localField: "country",
          from: "countries",
          foreignField: "_id",
          as: "country",
        },
      },
      { $unwind: { path: '$country', preserveNullAndEmptyArrays: true } },
    ]);
    achivementList.forEach((val:any)=>{
      if( val. achivementLike.toString().includes(user._id.toString())){ 
        val.isLikes=true
       }
      else{    
       val.isLikes=false;
       
      }
     })
    return achivementList;
  }

  public async getSchoolAchivement(schoolId: any,user:any) {
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
      { $unwind: { path: '$school', preserveNullAndEmptyArrays: true } },
      {
        $lookup: {
          localField: "city",
          from: "cities",
          foreignField: "_id",
          as: "city",
        },
      },
      { $unwind: { path: '$city', preserveNullAndEmptyArrays: true } },
      {
        $lookup: {
          localField: "state",
          from: "states",
          foreignField: "_id",
          as: "state",
        },
      },
      { $unwind: { path: '$state', preserveNullAndEmptyArrays: true } },
      {
        $lookup: {
          localField: "country",
          from: "countries",
          foreignField: "_id",
          as: "country",
        },
      },
      { $unwind: { path: '$country', preserveNullAndEmptyArrays: true } },
    ]);

    achivementList.forEach((val:any)=>{
      if( val. achivementLike.toString().includes(user._id.toString())){ 
        val.isLikes=true;
       }
      else{    
       val.isLikes=false;
       
      }
     })
    return achivementList;
  }

  public async getUserAchivement(userId: any,loginUser:any) {
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
      { $unwind: { path: '$userDetail', preserveNullAndEmptyArrays: true } },
      {
        $lookup: {
          localField: "schoolId",
          from: "schools",
          foreignField: "_id",
          as: "school",
        },
      },
      { $unwind: { path: '$school', preserveNullAndEmptyArrays: true } },
      {
        $lookup: {
          localField: "city",
          from: "cities",
          foreignField: "_id",
          as: "city",
        },
      },
      { $unwind: { path: '$city', preserveNullAndEmptyArrays: true } },
      {
        $lookup: {
          localField: "state",
          from: "states",
          foreignField: "_id",
          as: "state",
        },
      },
      { $unwind: { path: '$state', preserveNullAndEmptyArrays: true } },
      {
        $lookup: {
          localField: "country",
          from: "countries",
          foreignField: "_id",
          as: "country",
        },
      },
      { $unwind: { path: '$country', preserveNullAndEmptyArrays: true } },

      
    ]);

    achivementList.forEach((val:any)=>{
      if( val. achivementLike.toString().includes(loginUser._id.toString())){ 
        val.isLikes=true
       }
      else{    
       val.isLikes=false;
       
      }
     })

    return achivementList;
  }

  public async getAchivementInfoById(AchivementId: any) {
    const achivementInfo: any = await Achivement.findOne({
      _id: AchivementId,
      isDeleted: false,
    }).lean();
    return achivementInfo;
  }

  public async deleteAchivement(AchivementId: String) {
    const achivementInfo: IAchivement = await Achivement.findOneAndUpdate(
      { _id: AchivementId, isDeleted: false },
      { $set: { isDeleted: true } },
      { new: true }
    ).lean();
    return achivementInfo;
  }

  public async achivementActivity(
    userId: any,
    status: any,
    body: any
  ) {
    let achivementInfo: any;
    let count: any = 1;
    let minuscount: any = -1;
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

        return achivementInfo;
      }
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

  public async readAchivementActivity(achivementId: any, status: any, userId: any) {
    let achivementInfo: any;
    let isDeleteable: any;
    if (status == "readAchivementLike") {
      achivementInfo = await Achivement
        .findOne({ _id: achivementId })
        .populate("achivementLike");
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

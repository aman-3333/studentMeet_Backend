import academy, { IAcademy } from "../models/academy";
import achivement from "../models/achivement";
import userActivity from "../models/userActivity";
import userDetails from "../models/userDetails";
import Achivement from "../models/achivement";
import FuzzySearch from "fuzzy-search";
import { sendNotification } from "../services/notification";
import userDevice from "../models/userDevice";
const mongoose = require("mongoose");
const currentTime: any = new Date();
export default class academyController {
  public async createAcademy(body: any) {
    const academyInfo = await academy.create({
      fullAddress: body.fullAddress,
      academyOwnerId: body.academyOwnerId,
      academyTypeId: body.academyTypeId,
      academySubTypeId: body.academySubTypeId,
      session: body.session,
      Evening: body.Evening,
      Morning: body.Morning,
      workingDays: body.workingDays,
      contact_no: body.contact_no,
      academyRepresentativeId: body.academyRepresentativeId,
      country: body.country,
      state: body.state,
      city: body.city,
      description: body.description,
      banner_image: body.banner_image,
      schoolId: body.schoolId,
      instituteId: body.instituteId,
      academyName: body.academyName,
      coachId: body.coachId,
      feesPerMonth: body.feesPerMonth,
      feesPerYear: body.feesPerYear,
      feesDiscount: body.feesDiscount,
      profile_picture: body.profile_picture,
    });

    return academyInfo;
  }

  public async editAcademy(body: any) {
    const academyInfo: any = await academy
      .findOneAndUpdate({ _id: body.academyId }, body, {
        new: true,
      })
      .lean();
    return academyInfo;
  }

  public async getAcademyList(user: any) {
    let academyLike = await academy.aggregate([
      { $match: { isDeleted: false } },

      {
        $lookup: {
          localField: "_id",
          from: "State",
          foreignField: "state",
          as: "state",
        },
      },
      {
        $lookup: {
          localField: "_id",
          from: "city",
          foreignField: "city",
          as: "city",
        },
      },
      {
        $lookup: {
          localField: "country",
          from: "country",
          foreignField: "_id",
          as: "country",
        },
      },
      {
        $lookup: {
          localField: "instituteId",
          from: "institutes",
          foreignField: "_id",
          as: "state",
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
    ]);

    academyLike.forEach((val: any) => {
      if (val.followers.toString().includes(user._id.toString())) {
        val.isFollow = true;
      }
      if (val.academyLike.toString().includes(user._id.toString())) {
        val.isLikes = true;
      } else {
        val.isFollow = false;
        val.isLikes = false;
      }
    });

    return academyLike;
  }

  public async deleteAcademy(academyId: String) {
    const academyInfo: IAcademy = await academy
      .findOneAndUpdate(
        { _id: academyId },
        { $set: { isDeleted: true } },
        { new: true }
      )
      .lean();
    return academyInfo;
  }

  public async getAcademyfilter() {
    const academyInfo: any = await academy.findOne().lean();
    return academyInfo;
  }

  public async searchAcademy(search: any) {
    let academyInfo: any = await academy.aggregate([
      {
        $match: {
          isDeleted: false,
          academyName: {
            $regex: search,
            $options: "i",
          },
        },
      },
      {
        $lookup: {
          localField: "_id",
          from: "State",
          foreignField: "state",
          as: "state",
        },
      },
      { $unwind: { path: "$state", preserveNullAndEmptyArrays: true } },
      {
        $lookup: {
          localField: "_id",
          from: "city",
          foreignField: "city",
          as: "city",
        },
      },

      { $unwind: { path: "$city", preserveNullAndEmptyArrays: true } },
      {
        $lookup: {
          localField: "country",
          from: "country",
          foreignField: "_id",
          as: "country",
        },
      },

      { $unwind: { path: "$country", preserveNullAndEmptyArrays: true } },
    ]);

    return academyInfo;
  }

  public async academyActivity(
    userId: any,
    academyId: any,
    status: any,
    academyComment: any,
    academyCommentId: any,
    body: any
  ) {
    let userInfo: any;
    let data: any = [];
    let a: any = [];
    let info: any;
    let academyInfo: any;
    let count: any = 1;
    let minuscount: any = -1;
    const academy_id: any = body.academyId;

    if (status == "academyLike") {
      await academy.updateOne(
        {
          _id: body.academyId,
        },
        {
          $inc: { academyLikeCount: count },
        }
      );

      academyInfo = await academy.findOneAndUpdate(
        {
          _id: body.academyId,
        },
        {
          $push: {
            academyLike: userId,
          },
        },
        { new: true }
      );
      let userData = await userActivity.aggregate([
        {
          $match: {
            userId: new mongoose.Types.ObjectId(body.academyComment[0].userId),
            isDeleted: false,
          },
        },
        {
          $lookup: {
            localField: "userId",
            from: "userdetails",
            foreignField: "_id",
            as: "userdetails",
          },
        },
        { $unwind: { path: "$userdetails", preserveNullAndEmptyArrays: true } },
      ]);

      const followersData = userData[0].userFollowers;

      for (let i = 0; i < followersData.length; i++) {
        let userFcmToken = await userDevice.findOne({
          userId: followersData[i],
        });
        console.log(
          userData[0].userdetails.fullName,
          "userData[0].userdetails.fullName"
        );
        if (userFcmToken) {
          const body = `${userData[0].userdetails.fullName} like academy check and react.`;
          sendNotification(
            userFcmToken.fcmtoken,
            body,
            "abc",
            "academy_home",
            followersData[i],
            academy_id
          );
        }
      }
      return academyInfo;
    }
    if (status == "removAcademyLike") {
      // await academy.findOneAndUpdate(
      //   { _id: body.academyId },
      //   { $inc: { academyLikeCount: -1 } },
      //   { new: true }
      // );
      await academy.updateOne(
        {
          _id: body.academyId,
        },
        {
          $inc: { academyLikeCount: minuscount },
        }
      );

      academyInfo = await academy.findOneAndUpdate(
        {
          _id: body.academyId,
        },
        {
          $pull: {
            academyLike: userId,
          },
        },
        { new: true }
      );

      return academyInfo;
    }

    if (status == "academyComment") {
      for (let i = 0; i < body.academyComment.length; i++) {
        academyInfo = await academy.findOneAndUpdate(
          {
            _id: body.academyId,
          },
          {
            $push: {
              academyComment: {
                userId: body.academyComment[i].userId,
                comment: body.academyComment[i].comment,
                dateTime: currentTime,
              },
            },
          }
        );
        await academy.updateOne(
          {
            _id: body.academyId,
          },
          {
            $inc: { academyCommentCount: count },
          }
        );
      }
      let userData = await userActivity.aggregate([
        {
          $match: {
            userId: new mongoose.Types.ObjectId(body.academyComment[0].userId),
            isDeleted: false,
          },
        },
        {
          $lookup: {
            localField: "userId",
            from: "userdetails",
            foreignField: "_id",
            as: "userdetails",
          },
        },
        { $unwind: { path: "$userdetails", preserveNullAndEmptyArrays: true } },
      ]);

      const followersData = userData[0].userFollowers;

      for (let i = 0; i < followersData.length; i++) {
        let userFcmToken = await userDevice.findOne({
          userId: followersData[i],
        });
        if (userFcmToken) {
          const body = `${userData[0].userdetails.fullName} comment on academy check and react.`;
          sendNotification(
            userFcmToken.fcmtoken,
            body,
            "abc",
            "academy_home",
            followersData[i],
            academy_id
          );
        }
      }
      return academyInfo;
    }

    if (status == "removeAcademyComment") {
      for (let i = 0; i < body.academyComment.length; i++) {
        academyInfo = await academy.findOneAndUpdate(
          {
            _id: body.academyComment[i].academyId,
          },
          {
            $pull: {
              academyComment: {
                _id: body.academyComment[i]._id,
              },
            },
          }
        );

        await academy.updateOne(
          {
            _id: body.academyId,
          },
          {
            $inc: { academyCommentCount: minuscount },
          }
        );

        return academyInfo;
      }
    }
    if (status == "readacAdemyComment") {
      userInfo = await userActivity.findOne({ userId: body.userId }).lean();
      userInfo = userInfo.academyComment;

      for (let i = 0; i < userInfo.length; i++) {
        let academyInfo: any = await academy.findOne({
          _id: userInfo[i].academyId,
        });

        let comment: any = userInfo[i].comment;
        let DateTime: any = userInfo[i].dateTime;

        data.push({ academyInfo, comment, DateTime });
      }
      return data;
    }
  }

  public async readAcademyActivity(academyId: any, status: any, userId: any) {
    let academyInfo: any;
    let isDeleteable: any;
    if (status == "readAcademyLike") {
      let academyInfo: any = await academy.aggregate([
        {
          $match: {
            _id: new mongoose.Types.ObjectId(academyId),
            isDeleted: false,
          },
        },
        {
          $lookup: {
            localField: "academyLike",
            from: "userdetails",
            foreignField: "_id",
            as: "userdetails",
          },
        },
      ]);
      academyInfo = academyInfo[0].userdetails;

      let userData: any = await userActivity.findOne({ userId: userId });
      userData = userData.userFollowing;
      academyInfo.forEach((val: any) => {
        if (userData.toString().includes(val._id.toString())) {
          val.isFollow = true;
        } else {
          val.isFollow = false;
        }
      });
      return academyInfo;
    }
    if (status == "readAcademyComment") {
      let a = [];
      academyInfo = await academy.findOne({ _id: academyId }).lean();
      console.log(academyInfo);
      academyInfo = academyInfo.academyComment;

      for (let i = 0; i < academyInfo.length; i++) {
        let userInfo: any = await userDetails.findOne(
          { _id: academyInfo[i].userId },
          { fullName: true, profile_picture: true }
        );

        let comment = academyInfo[i].comment;
        let DateTime: any = academyInfo[i].dateTime;
        if (userId == academyInfo[i].userId) {
          isDeleteable = true;
        } else {
          isDeleteable = false;
        }
        a.push({ userInfo, comment, DateTime, isDeleteable });
      }
      var data = [...a].reverse();
      return data;
    }
    if (status == "readacademyFavourite") {
      academyInfo = await academy
        .findOne({ _id: academyId })
        .populate("academyFavourite");
      academyInfo = academyInfo.academyFavourite;
      return academyInfo;
    }
  }

  public async getAcademyDetails(academyId: any) {
    const academyList = await academy.aggregate([
      {
        $match: {
          _id: new mongoose.Types.ObjectId(academyId),
        },
      },
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

    return academyList;
  }

  public async getacademyInfoById(academyId: any, status: any) {
    var academyInfo: any;
    let coachDetails: any;
    let data: any = [];

    academyInfo = await academy.findOne({ _id: academyId });
    console.log(academyInfo.coachId, "academyInfo");

    if (status == "coachInfo") {
      coachDetails = await userDetails.find({
        _id: { $in: academyInfo.coachId },
        isDeleted: false,
      });

      for (let i = 0; i < coachDetails.length; i++) {
        let achivement: any = await Achivement.findOne({
          user_id: coachDetails[i]._id,
        });

        let profile_pucture = coachDetails[i].profile_pucture;
        let experienceYear = coachDetails[i].experienceYear;
        let experties = coachDetails[i].experties;
        let profile_picture = coachDetails[i].profile_picture;
        let fullName = coachDetails[i].fullName;
        let playFor = coachDetails[i].playFor;
        let experience = coachDetails[i].experience;

        data.push({
          achivement,
          profile_pucture,
          experienceYear,
          experties,
          profile_picture,
          fullName,
          playFor,
          experience,
        });
      }

      return data;
    }
    if (status == "academyAchivment") {
      const achivementList = await Achivement.aggregate([
        {
          $match: {
            academyId: new mongoose.Types.ObjectId(academyId),
          },
        },
        {
          $lookup: {
            from: "userdetails",
            localField: "academyUserId",
            foreignField: "_id",
            as: "academyUser",
          },
        },
        {
          $lookup: {
            from: "cities",
            localField: "city",
            foreignField: "_id",
            as: "city",
          },
        },
        { $unwind: { path: "$city", preserveNullAndEmptyArrays: true } },
        {
          $lookup: {
            from: "states",
            localField: "state",
            foreignField: "_id",
            as: "state",
          },
        },

        { $unwind: { path: "$state", preserveNullAndEmptyArrays: true } },
        {
          $lookup: {
            from: "countries",
            localField: "country",
            foreignField: "_id",
            as: "country",
          },
        },

        { $unwind: { path: "$country", preserveNullAndEmptyArrays: true } },
      ]);

      return achivementList;
    }
  }

  public async getAcademyRegistrationDetail(academyId: any) {
    console.log(academyId, "academyId");

    let academyInfo = await academy
      .findOne({ _id: academyId })
      .populate("academy_id");
    //  let   academyInfo= await academy.aggregate([{
    //         $match:{_id: academyId, isDeleted: false }

    //       },{
    //         $lookup: {
    //             'localField': 'academy_id',
    //             'from': 'academies',
    //             'foreignField': '_id',
    //             'as': 'academies',
    //           },
    //       }])

    return academyInfo;
  }

  public async filterAcademy(city: any, state: any, academySubTypeId: any) {
 

    if(academySubTypeId&&state&&city){
      const academyData = await academy.find({
        academySubTypeId: academySubTypeId,
        city: city,
        state: state
      });
      return academyData;
    }
    
 
    if(academySubTypeId&&city){
      const academyData = await academy.find({
        academySubTypeId: academySubTypeId,
        city: city,
        
      });
      return academyData;
    }

    
    if(academySubTypeId&&state){
      const academyData = await academy.find({
        academySubTypeId: academySubTypeId,
        state: state,
      });
      return academyData;
    }

 
 
  }

  public async shareAcademy(body: any) {
    for (let i = 0; i < body.academySharedByOther.length; i++) {
      let academyInfo = await userActivity.findOneAndUpdate(
        {
          userId: body.academySharedByOther[i].friendId,
          isDeleted: false,
        },
        {
          $push: {
            academySharedByOther: {
              friendId: body.userId,
              academyId: body.academySharedByOther[i].academyId,
              dateTime: currentTime,
            },
          },
        },
        { new: true }
      );

      return academyInfo;
    }
  }
}

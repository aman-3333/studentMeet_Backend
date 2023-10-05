import school from "../models/school";
import FuzzySearch from "fuzzy-search";
const mongoose = require("mongoose");

import School from "../models/school";
import userDetails from "../models/userDetails";
import userActivity from "../models/userActivity";

export default class SchoolController {
  //////////////////////////////school///////////////////////////////////////////////////////////

  public async createSchool(body: any) {
    let schoolInfo: any;
    schoolInfo = await school.create(body);

    return schoolInfo;
  }

  public async editSchool(body: any, schoolId: string) {
    const schoolInfo: any = await school
      .findOneAndUpdate({ _id: schoolId, isDeleted: false }, body, {
        new: true,
      })
      .lean();
    return schoolInfo;
  }

  public async getSchool(user:any) {
    let schoolListlike= await school.aggregate([
      { $match: { isDeleted: false, schoolLike: { $in: [user._id] } } },
      {
        $lookup: {
          localField: "faculty",
          from: "userdetails",
          foreignField: "_id",
          as: "faculty",
        },
      },
      {
        $lookup: {
          localField: "schoolOwnerId",
          from: "school_owners",
          foreignField: "_id",
          as: "schoolOwner",
        },
      },
      { $unwind: { path: '$schoolOwner', preserveNullAndEmptyArrays: true } },
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
      {
        $addFields: {
          isLikes: true,
        },
      },
    ]);
    const schoolListUnLike= await school.aggregate([
      { $match: { isDeleted: false, schoolLike: { $ne: [user._id] } } },
      {
        $lookup: {
          localField: "faculty",
          from: "userdetails",
          foreignField: "_id",
          as: "faculty",
        },
      },
      {
        $lookup: {
          localField: "schoolOwnerId",
          from: "school_owners",
          foreignField: "_id",
          as: "schoolOwner",
        },
      },
      { $unwind: { path: '$schoolOwner', preserveNullAndEmptyArrays: true } },
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
      {
        $addFields: {
          isLikes: false,
        },
      },
    ]);

    
    schoolListlike = schoolListlike.concat(schoolListUnLike);

    const mergedArray = [...schoolListlike, ...schoolListUnLike];

    mergedArray.sort((a, b) => b.createdAt - a.createdAt);

    return mergedArray;
  }
  public async searchSchool( searchValue: any) {
    if (searchValue) {
      let schoolList: any = await school.find({
       
        isDeleted: false,
      });
      schoolList = new FuzzySearch(schoolList, ["schoolName"], {
        caseSensitive: false,
      });
      schoolList = schoolList.search(searchValue);
      return schoolList;
    }
  }





  public async getSchoolInfoById(schoolId: any) {
  


      const schoolInfo= await school.aggregate([
        {
          $match: {
            _id:new mongoose.Types.ObjectId(schoolId), isDeleted: false,
          },
        },
        {
          $lookup: {
            localField: "faculty",
            from: "userdetails",
            foreignField: "_id",
            as: "faculty",
          },
        },
        {
          $lookup: {
            localField: "schoolOwnerId",
            from: "school_owners",
            foreignField: "_id",
            as: "schoolOwner",
          },
        },
        { $unwind: { path: '$schoolOwner', preserveNullAndEmptyArrays: true } },
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

    return schoolInfo;
  }

  public async deleteSchool(schoolId: any) {
    const schoolInfo: any = await school
      .findOneAndUpdate(
        { _id: schoolId, isDeleted: false },
        { $set: { isDeleted: true } }
      )
      .lean();
    return schoolInfo;
  }

  public async schoolActivity(
    userId: any,
    schoolId: any,
    status: any,
    schoolComment: any,
    schoolCommentId: any,
    body: any
  ) {
    let userInfo: any;
    let data: any = [];
    let a: any = [];
    let info: any;
    let schoolInfo: any;
console.log(body,"body");

    if (status == "schoolLike") {
      await school.findOneAndUpdate(
        { _id: body.schoolId },
        { $inc: { schoolLikeCount: 1 } },
        { new: true }
      ).lean();
      schoolInfo = await school.findOneAndUpdate(
        {
          _id: body.schoolId,isDeleted:false
        },
        {
          $push: {
            schoolLike: userId,
          },
        },
        { new: true }
      );

      console.log(schoolInfo);

      await userActivity.findOneAndUpdate(
        { userId: schoolInfo.userId },
        { $inc: { schoolLikeCount: 1 } },
        { new: true }
      );
      return schoolInfo;
    }
    if (status == "removeSchoolLike") {
      await school.findOneAndUpdate(
        { _id: body.schoolId ,isDeleted:false},
        { $inc: { schoolLikeCount: -1 } },
        { new: true }
      );

      schoolInfo = await school.findOneAndUpdate(
        {
          _id: body.schoolId,
        },
        {
          $pull: {
            schoolLike: userId,
          },
        },
        { new: true }
      );
      await userActivity.findOneAndUpdate(
        { userId: schoolInfo.userId },
        { $inc: { schoolLikeCount: -1 } },
        { new: true }
      );
      return schoolInfo;
    }

    if (status == "schoolComment") {
      let currentTime: any = new Date();
      for (let i = 0; i < body.schoolComment.length; i++) {
        schoolInfo = await school.findOneAndUpdate(
          {
            _id: body.schoolId,
            isDeleted:false
          },
          {
            $push: {
              schoolComment: {
                userId: body.schoolComment[i].userId,
                comment: body.schoolComment[i].comment,
                dateTime: currentTime,
              },
            },
          }
        );
        console.log(schoolInfo, "schoolInfo");

        schoolInfo = await school.findOneAndUpdate(
          { _id: body.schoolId,isDeleted:false },
          { $inc: { schoolCommentCount: 1 } },
          { new: true }
        );

        await userActivity.findOneAndUpdate(
          { userId: schoolInfo.userId,isDeleted:false },
          { $inc: { schoolCommentCount: 1 } },
          { new: true }
        );
        return schoolInfo;
      }
    }
    if (status == "removeSchoolComment") {

      schoolInfo = await school.updateOne(
  { _id: body.schoolId},
  {
    $pull: {
      schoolComment: { _id: body._id }
    }
  },
  {
    multi: true
  }
)






return schoolInfo


    
    }
    if (status == "readschoolComment") {
      userInfo = await userActivity.findOne({ userId: body.userId }).lean();
      userInfo = userInfo.schoolComment;

      for (let i = 0; i < userInfo.length; i++) {
        let schoolInfo: any = await school.findOne({ _id: userInfo[i].schoolId });

        let comment: any = userInfo[i].comment;
        let DateTime: any = userInfo[i].dateTime;

        data.push({ schoolInfo, comment, DateTime });
      }
      return data;
    }
  }





 

  public async readschoolActivity(schoolId: any, status: any, userId: any) {
    console.log(schoolId, status);
    let isDeleteable: any;
    let schoolInfo: any;
    if (status == "readSchoolLike") {
      schoolInfo = await school.findOne({ _id: schoolId }).populate("schoolLike");
      schoolInfo = schoolInfo.schoolLike;
      return schoolInfo;
    }
    if (status == "readSchoolComment") {
      let a = [];
      schoolInfo = await school.findOne({ _id: schoolId }).lean();
      schoolInfo = schoolInfo.schoolComment;

      for (let i = 0; i < schoolInfo.length; i++) {
        let userInfo: any = await userDetails.findOne(
          { _id: schoolInfo[i].userId },
          { fullName: true, profile_picture: true }
        );
        let comment = schoolInfo[i].comment;
        let DateTime: any = schoolInfo[i].dateTime;

        if (userId == schoolInfo[i].userId) {
          isDeleteable = true;
        } else {
          isDeleteable = false;
        }
        a.push({ userInfo, comment, DateTime,isDeleteable });
      }
      var y = [...a].reverse();
      return y;
    }
    if (status == "readSchoolFavourite") {
      schoolInfo = await school.findOne({ _id: schoolId }).populate("schoolFavourite");
      schoolInfo = schoolInfo.schoolFavourite;
      return schoolInfo;
    }
  }





}

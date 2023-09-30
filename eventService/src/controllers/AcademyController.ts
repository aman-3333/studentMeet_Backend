import academy, { IAcademy } from "../models/academy";
import achivement from "../models/achivement";
import userActivity from "../models/userActivity";
import userDetails from "../models/userDetails";
import Achivement from "../models/achivement";
import FuzzySearch from "fuzzy-search";
import { sendNotification } from "../services/notification";
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
    console.log(body.academyId, "body.academyId");

    const academyInfo: any = await academy
      .findOneAndUpdate({ _id: body.academyId }, body, {
        new: true,
      })
      .lean();
    return academyInfo;
  }

  public async getAcademyList(user: any) {
    let academyLike = await academy.aggregate([
      { $match: { isDeleted: false, academyLike: { $in: [user._id] } } },

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
      {
        $addFields: {
          isLikes: true,
        },
      },
    ]);
    let academyList = await academy.aggregate([
      { $match: { isDeleted: false, academyLike: { $ne: [user._id] } } },
      {
        $lookup: {
          localField: "state",
          from: "states",
          foreignField: "_id",
          as: "state",
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
      {
        $lookup: {
          localField: "country",
          from: "countries",
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
      {
        $addFields: {
          isLikes: true,
        },
      },
      {
        $addFields: {
          isLikes: false,
        },
      },
    ]);

    const mergedArray = [...academyLike, ...academyList];

    mergedArray.sort((a, b) => a.createdAt - b.createdAt);
    return mergedArray;
  }

  public async getAcademyInfoById(academyId: any) {
    const academyInfo: any = await academy.findOne({ _id: academyId }).lean();
    return academyInfo;
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
      { $match: { isDeleted: false } },
    ]);

    academyInfo = new FuzzySearch(academyInfo, ["academyName"], {
      caseSensitive: false,
    });
    academyInfo = academyInfo.search(search);
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
    let count:any=1
    let minuscount:any=-1
    if (status == "academyLike") {
      
       await academy.updateOne(
        {
          _id: body.academyId
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

      console.log(academyInfo,body.academyId,userId);

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
          _id: body.academyId
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
          }
        },
        { new: true }
      );

      return academyInfo;
    }

    if (status == "academyComment") {
      let currentTime: any = new Date();
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
            _id: body.academyId
          },
          {
            $inc: { academyCommentCount: count },
          }
        );

        return academyInfo;
      }
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
            _id: body.academyId
          },
          {
            $inc: { academyCommentCount:minuscount },
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



  public async readAcademyActivity(academyId: any, status: any) {
    let academyInfo: any;
    if (status == "readAcademyLike") {
      academyInfo = await academy
        .findOne({ _id: academyId })
        .populate("academyLike");
      academyInfo = academyInfo.academyLike;
      return academyInfo;
    }
    if (status == "readAcademyComment") {
      let a = [];
      academyInfo = await academy.findOne({ _id: academyId }).lean();
      console.log(academyInfo);
      academyInfo = academyInfo.academyComment;

      for (let i = 0; i < academyInfo.length; i++) {
        console.log(academyId);
        let userInfo: any = await userDetails.findOne(
          { _id: academyInfo[i].userId },
          { fullName: true, profile_picture: true }
        );

        let comment = academyInfo[i].comment;
        let DateTime: any = academyInfo[i].dateTime;

        a.push({ userInfo, comment, DateTime });
      }
      var y = [...a].reverse();
      return y;
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
    const academyList: any = await academy.find({ _id: academyId });
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
      console.log("academyAchivment", "academyAchivment");

      academyInfo = await achivement.findOne({
        isDeleted: false,
        academyId: academyId,
      });
      return academyInfo;
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





  public async filterAcademy(query:any){
const academyTypeId = query.academyTypeId ||{};
const academySubTypeId = query.academySubTypeId || {};
const city = query.city || {};
const state = query.state || {};
const academyData = await academy.find({
    state:state,
    city:city,
    academyTypeId: academyTypeId,
    academySubTypeId:academySubTypeId

})  

 return academyData;

}








}

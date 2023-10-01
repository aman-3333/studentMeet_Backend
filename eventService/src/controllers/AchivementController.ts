import Achivement, { IAchivement } from "../models/achivement";
import { sendNotification } from "../services/notification";
const mongoose = require("mongoose");
export default class AchivementController {
  public async createAchivement(body: any) {
  let  achivementInfo = await Achivement.create(body);

    return achivementInfo;
  }

 

  public async deletAchivement(achivementId: String) {
    const achivementInfo = await Achivement
      .findOneAndUpdate(
        { _id: achivementId },
        { $set: { isDeleted: true } },
        { new: true }
      )
      .lean();
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

  public async getAcademyAchivement(academyId: any) {
    const achivementList: IAchivement[] = await Achivement.aggregate([
      {
        $match: {
          academyId: new mongoose.Types.ObjectId(academyId),
        },
      },
      {
        $lookup: {
          localField: "achievements.user_id",
          from: "userdetails",
          foreignField: "_id",
          as: "users",
        },
      },
      {
        $lookup: {
          localField: "achievements.city",
          from: "cities",
          foreignField: "_id",
          as: "city",
        },
      },
      {
        $lookup: {
          localField: "achievements.state",
          from: "states",
          foreignField: "_id",
          as: "state",
        },
      },
      {
        $lookup: {
          localField: "achievements.country",
          from: "countries",
          foreignField: "_id",
          as: "country",
        },
      },
    ]);
    return achivementList;
  }

  public async getUserAchivement(userId: any) {
    const achivementList= await Achivement.aggregate([
      {
        $match: {
          user_id: new mongoose.Types.ObjectId(userId),
        },
      },
     
      {
        $lookup: {
          from: "cities",
          localField: "city",
          foreignField: "_id",
          as: "city"
        }
      },
      
      { $unwind: { path: '$city', preserveNullAndEmptyArrays: true } },
      {
        $lookup: {
          from: "states",
          localField: "state",
          foreignField: "_id",
          as: "state"
        }
      },
      
      { $unwind: { path: '$state', preserveNullAndEmptyArrays: true } },
      {
        $lookup: {
          from: "countries",
          localField: "country",
          foreignField: "_id",
          as: "country"
        }
      },
      
      { $unwind: { path: '$country', preserveNullAndEmptyArrays: true } },
      
    ]);




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
}

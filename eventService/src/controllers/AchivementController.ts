import Achivement, { IAchivement } from "../models/achivement";

const mongoose = require("mongoose");
export default class AchivementController {
  public async createAchivement(body: any) {
    const currentTime = new Date();
    let achivementInfo: any;
    achivementInfo = await Achivement.findOne({
      userId: body.userId,
      isDeleted: false,
    });
    let academyInfo = await Achivement.findOne({
      academyId: body.academyId,
      isDeleted: false,
    });
    if (achivementInfo) {
      for (let i = 0; i < body.achievements.length; i++) {
        achivementInfo = await Achivement.findOneAndUpdate(
          { userId: body.userId },
          {
            $push: {
              achievements: {
                picture: body.achievements[i].picture,
                description: body.achievements[i].description,
                state: body.achievements[i].state,
                city: body.achievements[i].city,
                country: body.achievements[i].country,
                tournament: body.achievements[i].tournament,
                achievements: body.achievements[i].achievements,
                user_id: body.achievements[i].user_id,
                dateTime: body.dateTime,
                tournament_match: body.achievements[i].tournament_match,
              },
            },
          }
        );
      }
    }
    if (academyInfo) {
      for (let i = 0; i < body.achievements.length; i++) {
        achivementInfo = await Achivement.findOneAndUpdate(
          { userId: body.userId },
          {
            $push: {
              achievements: {
                picture: body.achievements[i].picture,
                description: body.achievements[i].description,
                state: body.achievements[i].state,
                city: body.achievements[i].city,
                country: body.achievements[i].country,
                tournament: body.achievements[i].tournament,
                achievements: body.achievements[i].achievements,
                user_id: body.achievements[i].user_id,
                dateTime: body.dateTime,
                tournament_match: body.achievements[i].tournament_match,
              },
            },
          }
        );
      }
    } else {
        body.dateTime= currentTime,
      achivementInfo = await Achivement.create(body);
    }

    return achivementInfo;
  }

  public async deletePerticulerAchivement(body: any) {
    let achivementInfo: any;
    achivementInfo = await Achivement.findOne({
      userId: body.userId,
      isDeleted: false,
    });

    if (achivementInfo) {
      for (let i = 0; i < body.achievements.length; i++) {
        achivementInfo = await Achivement.findOneAndUpdate(
          { userId: body.userId },
          {
            $pull: {
              achievements: {
                _id: body.achievements[i]._id,
              },
            },
          }
        );

        console.log(achivementInfo, "achivementInfo");
      }
    }

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
    const achivementList: IAchivement[] = await Achivement.find({
      academyId: academyId,
      isDeleted: false,
    });
    return achivementList;
  }

  public async getUserAchivement(userId: any) {
    // const achivementList: IAchivement[] = await Achivement.find(
    //    {user_id:userId}).populate("achievements.$.city")
    const achivementList: IAchivement[] = await Achivement.aggregate([
      {
        $match: {
          user_id: new mongoose.Types.ObjectId(userId),
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

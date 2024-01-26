import SponsorshipModel, { ISponsorship } from "../models/sponsorshipDetails";
import userActivity from "../models/userActivity";
import userDetails from "../models/userDetails";
import post from "../models/post";
import userDevice from "../models/userDevice";
import { sendNotification } from "../services/notification";
const mongoose = require("mongoose");
let currentTime: any = new Date();
export default class SponsorshipController {
  //////////////////////////ADMIN SPONSORSHIP API/////////////////////////////////
  public async create(body: any) {
    const {
      sponsorshipDesription,
      sponsorshipName,
      sponsorshipFormId,
      sponsorshipPartnerId,
      sponsorshipGuideLines,
      sponsorshipBannerImage,
      sponsorshipTermsAndCondition,
      registrationStartDateTime,
      registrationEndDateTime,
      academyTypeId,
      academySubTypeId,
      eligibileId,
      stageId
    } = body;

    let createSponsorsPartnerInfo = await SponsorshipModel.create({
      sponsorshipDesription: sponsorshipDesription,
      sponsorshipName: sponsorshipName,
      sponsorshipFormId: sponsorshipFormId,
      sponsorshipPartnerId: sponsorshipPartnerId,
      sponsorshipGuideLines: sponsorshipGuideLines,
      sponsorshipBannerImage: sponsorshipBannerImage,
      sponsorshipTermsAndCondition: sponsorshipTermsAndCondition,
      registrationStartDateTime: registrationStartDateTime,
      registrationEndDateTime: registrationEndDateTime,
      academyTypeId: academyTypeId,
      academySubTypeId: academySubTypeId,
      eligibileId: eligibileId,
      stageId:stageId
    });

    return createSponsorsPartnerInfo;
  }

  public async editSponsorship(body: ISponsorship, sponsorshipId: string) {
    const sponsorshipInfo: ISponsorship =
      await SponsorshipModel.findOneAndUpdate(
        { _id: sponsorshipId, isDeleted: false },
        body,
        { new: true }
      ).lean();
    await SponsorshipModel.findOneAndUpdate(
      { _id: sponsorshipId },
      { $set: { sponsorshipName: sponsorshipInfo.sponsorshipName } }
    );
    return sponsorshipInfo;
  }

  public async deleteSponsorship(sponsorshipId: string, userId: String) {
    const sponsorshipInfo: ISponsorship =
      await SponsorshipModel.findOneAndUpdate(
        { _id: sponsorshipId, isDeleted: false },
        { $set: { isDeleted: true } }
      ).lean();
    return sponsorshipInfo;
  }

  /////////////////////////////////USER SCREEN SPONSORSHIP API/////////////////////////

  public async getsponsorshipList(user: any, index: any) {
    const indexData = parseInt(index) - 1;
    let sponsorshipLike: any = await SponsorshipModel.aggregate([
      {
        $sort: {
          createdAt: -1,
        },
      },
      { $skip: 50 * indexData },
      { $limit: 50 },
      { $match: { isDeleted: false } },
      {
        $addFields: {
          formattedCreatedAt: {
            $let: {
              vars: {
                timeDifferenceMillis: {
                  $subtract: [new Date(), "$createdAt"],
                },
              },
              in: {
                $cond: {
                  if: {
                    $lt: ["$$timeDifferenceMillis", 60000], // Less than 1 minute
                  },
                  then: {
                    $concat: [
                      {
                        $toString: {
                          $trunc: { $divide: ["$$timeDifferenceMillis", 1000] },
                        },
                      },
                      "s ago",
                    ],
                  },
                  else: {
                    $cond: {
                      if: { $lt: ["$$timeDifferenceMillis", 3600000] }, // Less than 1 hour
                      then: {
                        $concat: [
                          {
                            $toString: {
                              $trunc: {
                                $divide: ["$$timeDifferenceMillis", 60000],
                              },
                            },
                          },
                          "m ago",
                        ],
                      },
                      else: {
                        $cond: {
                          if: { $lt: ["$$timeDifferenceMillis", 86400000] }, // Less than 1 day
                          then: {
                            $concat: [
                              {
                                $toString: {
                                  $trunc: {
                                    $divide: [
                                      "$$timeDifferenceMillis",
                                      3600000,
                                    ],
                                  },
                                },
                              },
                              "h ago",
                            ],
                          },
                          else: {
                            $cond: {
                              if: {
                                $lt: ["$$timeDifferenceMillis", 2592000000],
                              }, // Less than 30 days (approximating to 30 days as 1 month)
                              then: {
                                $concat: [
                                  {
                                    $toString: {
                                      $trunc: {
                                        $divide: [
                                          "$$timeDifferenceMillis",
                                          86400000,
                                        ],
                                      },
                                    },
                                  },
                                  "d ago",
                                ],
                              },
                              else: {
                                $cond: {
                                  if: {
                                    $lt: [
                                      "$$timeDifferenceMillis",
                                      31536000000,
                                    ],
                                  }, // Less than 365 days (approximating to 365 days as 1 year)
                                  then: {
                                    $concat: [
                                      {
                                        $toString: {
                                          $trunc: {
                                            $divide: [
                                              "$$timeDifferenceMillis",
                                              2592000000,
                                            ],
                                          },
                                        },
                                      },
                                      "mo ago",
                                    ],
                                  },
                                  else: {
                                    $concat: [
                                      {
                                        $toString: {
                                          $trunc: {
                                            $divide: [
                                              "$$timeDifferenceMillis",
                                              31536000000,
                                            ],
                                          },
                                        },
                                      },
                                      "y ago",
                                    ],
                                  },
                                },
                              },
                            },
                          },
                        },
                      },
                    },
                  },
                },
              },
            },
          },
        },
      },
    ]);
    sponsorshipLike.forEach((val: any) => {
      val.isFollow = false;
      val.isLikes = false;
      if (val.followers.toString().includes(user._id.toString())) {
        val.isFollow = true;
      }
      if (val.sponsorshipLike.toString().includes(user._id.toString())) {
        val.isLikes = true;
      }
    });
    return sponsorshipLike;
  }

  public async getsponsorshipInfo(sponsorshipId: any, status: any) {
    let sponsorshipInfo: any;
    sponsorshipInfo = await SponsorshipModel.find({
      _id: sponsorshipId,
      isDeleted: false,
    });
    return sponsorshipInfo;
  }

  public async sponsorshipActivity(
    userId: any,
    sponsorshipId: any,
    status: any,
    sponsorshipComment: any,
    sponsorshipCommentId: any,
    body: any
  ) {
    let userInfo: any;
    let data: any = [];
    let a: any = [];
    let info: any;
    let sponsorshipInfo: any;
    let followersData: any;
    let sponsorship_id: any;
    if (status == "removeSponsorshipComment") {
      sponsorshipInfo = await SponsorshipModel.updateOne(
        { _id: body.sponsorshipId },
        {
          $pull: { sponsorshipComment: { _id: body._id } },
          $inc: { sponsorshipCommentCount: -1 },
        }
      );

      await userActivity.findOneAndUpdate(
        { userId: sponsorshipInfo.userId },
        { $inc: { sponsorshipCommentCount: -1 } },
        { new: true }
      );

      return sponsorshipInfo;
    }

    if (status == "sponsorshipLike") {
      sponsorshipInfo = await SponsorshipModel.updateOne(
        { _id: body.sponsorshipId },
        {
          $push: { sponsorshipLike: userId },
          $inc: { sponsorshipLikeCount: 1 },
        }
      );

      await userActivity.findOneAndUpdate(
        { userId: sponsorshipInfo.userId },
        { $inc: { sponsorshipLikeCount: 1 } },
        { new: true }
      );
      let userData = await userActivity.aggregate([
        {
          $match: {
            userId: new mongoose.Types.ObjectId(
              body.sponsorshipComment[0].userId
            ),
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

      if (userData[0].userFollowers.length > 0) {
        followersData = userData[0].userFollowers;
        sponsorship_id = body.sponsorshipId;
      }
      for (let i = 0; i < followersData.length; i++) {
        let userFcmToken = await userDevice.findOne({
          userId: followersData[i],
        });
        console.log(
          userData[0].userdetails.fullName,
          "userData[0].userdetails.fullName"
        );
        if (userFcmToken) {
          const body = `${userData[0].userdetails.fullName} like 😄 sponsorship check and react.`;
          sendNotification(
            userFcmToken.fcmtoken,
            body,
            "abc",
            "sponsorship_home",
            followersData[i],
            sponsorship_id,
            userData[0].userdetails._id
          );
        }
      }
      return sponsorshipInfo;
    }
    if (status == "removeSponsorshipLike") {
      sponsorshipInfo = await SponsorshipModel.updateOne(
        { _id: body.sponsorshipId },
        {
          $pull: { sponsorshipLike: userId },
          $inc: { sponsorshipLikeCount: -1 },
        }
      );
      return sponsorshipInfo;
    }

    if (status == "sponsorshipComment") {
      sponsorshipInfo = await SponsorshipModel.updateOne(
        { _id: body.sponsorshipId },
        {
          $push: {
            sponsorshipComment: {
              comment: body.comment,
              userId: userId,
              dateTime: currentTime,
            },
          },
          $inc: { sponsorshipCommentCount: 1 },
        }
      );

      let userData = await userActivity.aggregate([
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
            as: "userdetails",
          },
        },
        { $unwind: { path: "$userdetails", preserveNullAndEmptyArrays: true } },
      ]);

      if (userData[0].userFollowers.length > 0) {
        followersData = userData[0].userFollowers;
        sponsorship_id = body.sponsorshipId;
      }

      for (let i = 0; i < followersData.length; i++) {
        let userFcmToken = await userDevice.findOne({
          userId: followersData[i],
        });
        console.log(
          userData[0].userdetails.fullName,
          "userData[0].userdetails.fullName"
        );
        if (userFcmToken) {
          const body = `${userData[0].userdetails.fullName} comment on sponsorship check and react  `;
          sendNotification(
            userFcmToken.fcmtoken,
            body,
            "abc",
            "sponsorship_home",
            followersData[i],
            sponsorship_id,
            userData[0].userdetails._id
          );
        }
      }

      return sponsorshipInfo;
    }

    if (status == "readSponsorshipComment") {
      userInfo = await userActivity.findOne({ userId: body.userId }).lean();
      userInfo = userInfo.sponsorshipComment;
      for (let i = 0; i < userInfo.length; i++) {
        let sponsorshipInfo: any = await SponsorshipModel.findOne({
          _id: userInfo[i].sponsorshipId,
        });
        let comment: any = userInfo[i].comment;
        let DateTime: any = userInfo[i].dateTime;
        data.push({ sponsorshipInfo, comment, DateTime });
      }

      return data;
    }
  }

  public async searchSponsorship(search: any) {
    let sponsorshipInfo: any = await SponsorshipModel.aggregate([
      {
        $match: {
          isDeleted: false,
          sponsorshipName: {
            $regex: search,
            $options: "i",
          },
        },
      },
    ]);
    return sponsorshipInfo;
  }

  public async SponsorshipModel(sponsorshipId: any, userId: any, status: any) {
    let sponsorshipInfo: any;
    let SponsorshipModelData: any;
    sponsorshipInfo = await SponsorshipModel.findOne({
      _id: sponsorshipId,
      isDeleted: false,
    }).lean();

    if (SponsorshipModelData)
      return { message: "you already booked this Sponsorship" };
    SponsorshipModelData = await SponsorshipModel.create({
      sponsorshipId: sponsorshipId,
      userId: userId,
    });
    // SponsorshipModelData = await SponsorshipModelModel.findOneAndUpdate({ _id: SponsorshipModelData._id, isDeleted: false }, { $set: { orderTotal: sponsorshipInfo.priceForParticipent } }, { new: true }).lean()
    return SponsorshipModelData;
  }

  public async applySponsorship(sponsorshipId: any, userId: any, body: any) {
    let sponsorshipInfo: any = await SponsorshipModel.findOne({
      _id: sponsorshipId,
    }).lean();
    sponsorshipInfo = sponsorshipInfo.applyInfo.filter(
      (e: any) => e.userId == userId
    );
    if (sponsorshipInfo.lenght > 0) {
      return { message: "already book" };
    } else {
      sponsorshipInfo = await SponsorshipModel.findOneAndUpdate(
        {
          _id: sponsorshipId,
        },
        {
          $push: {
            applyInfo: {
              userId: userId,

              dateTime: currentTime,
            },
          },
        },
        { new: true }
      );

      sponsorshipInfo = await SponsorshipModel.findOneAndUpdate(
        { _id: sponsorshipId },
        { $inc: { applyCount: 1 } },
        { new: true }
      );

      return sponsorshipInfo;
    }
  }
  ////////////////////////////////////////////////////////////////////////////
  public async getAppliedUser(sponsorshipId: any) {
    var appliedUserInfo: any = await SponsorshipModel.findOne({
      _id: sponsorshipId,
      isDeleted: false,
    });

    appliedUserInfo = appliedUserInfo.applyInfo; 
  let  userInfo = await userDetails.aggregate([
      {
        $match: {
          _id: {$in:appliedUserInfo.map((val:any)=>new mongoose.Types.ObjectId(val.userId))},
          isDeleted: false,
        },
      },
      {
        $lookup: {
          localField: "profectionDomain",
          from: "academytypes",
          foreignField: "_id",
          as: "profectionDomain",
        },
      },
      { $unwind: { path: "$profectionDomain", preserveNullAndEmptyArrays: true } },
      {
        $lookup: {
          localField: "profection",
          from: "academysubtypes",
          foreignField: "_id",
          as: "profection",
        },
      },
      { $unwind: { path: "$profection", preserveNullAndEmptyArrays: true } },

      {
        $lookup: {
          localField: "stages",
          from: "stages",
          foreignField: "_id",
          as: "stages",
        },
      },
  

      {
        $sort: {
          createdAt: -1,
        },
      },
    ]);

 
    return userInfo;
  }

  public async getsponsorshipByPartnerId(sponsorshipPartnerId: any) {
    var sponsorshipInfo: any = await SponsorshipModel.find({
      sponsorshipPartnerId: sponsorshipPartnerId,
      isDeleted: false,
    });

    return sponsorshipInfo;
  }

  public async getsponsorshipPostPartnerId(sponsorshipPartnerId: any) {
    let postInfo;
    var sponsorshipInfo: any = await SponsorshipModel.find({
      sponsorshipPartnerId: sponsorshipPartnerId,
      isDeleted: false,
    });


    postInfo = await post.aggregate([
      {
        $match: {
          sponsorId: {$in:sponsorshipInfo.map((val:any)=>val._id)},
          isDeleted: false,
        },
      },
      {
        $sort: {
          createdAt: -1,
        },
      },
    ]);

  
    return postInfo;
  }

  public async shareSponsorship(body: any) {
    const { userId, sponsorshipSharedByOther } = body;
    for (let i = 0; i < sponsorshipSharedByOther.length; i++) {
      let sponsorshipInfo = await userActivity.findOneAndUpdate(
        {
          userId: sponsorshipSharedByOther[i].friendId,
          isDeleted: false,
        },
        {
          $push: {
            sponsorshipSharedByOther: {
              friendId: userId,
              sponsorshipId: sponsorshipSharedByOther[i].sponsorshipId,
              dateTime: currentTime,
            },
          },
        },
        { new: true }
      );
      let userData: any = await userDetails.findOne({ _id: userId });
      let userToken: any = await userDevice.findOne({
        userId: sponsorshipSharedByOther[i].friendId,
      });
      const body = `${userData.fullName} share  sponsorship to you please check and react`;
      sendNotification(
        userToken.fcmtoken,
        body,
        "abc",
        "sponsorship_home",
        userToken.userId,
        sponsorshipSharedByOther[i].sponsorshipId,
        userData._id
      );
      return sponsorshipInfo;
    }
  }

  public async readActivity(sponsorshipId: any, status: any, userId: any) {
    let sponsorshipInfo: any;
    let isDeleteable: any;
    if (status == "readsponsorshipLike") {
      let sponsorshipInfo: any = await SponsorshipModel.aggregate([
        {
          $match: {
            _id: new mongoose.Types.ObjectId(sponsorshipId),
            isDeleted: false,
          },
        },
        {
          $lookup: {
            localField: "sponsorshipLike",
            from: "userdetails",
            foreignField: "_id",
            as: "userdetails",
          },
        },
      ]);
      sponsorshipInfo = sponsorshipInfo[0].userdetails;

      let userData: any = await userActivity.findOne({ userId: userId });
      userData = userData.userFollowing;
      sponsorshipInfo.forEach((val: any) => {
        if (userData.toString().includes(val._id.toString())) {
          val.isFollow = true;
        } else {
          val.isFollow = false;
        }
      });

      return sponsorshipInfo;
    }
    if (status == "readsponSorshipComment") {
      let a = [];
      sponsorshipInfo = await SponsorshipModel.findOne({
        _id: sponsorshipId,
      }).lean();

      sponsorshipInfo = sponsorshipInfo.sponsorshipComment;

      for (let i = 0; i < sponsorshipInfo.length; i++) {
        let userInfo: any = await userDetails.findOne(
          { _id: sponsorshipInfo[i].userId },
          { fullName: true, profile_picture: true }
        );
        let commentId = sponsorshipInfo[i]._id;
        let comment = sponsorshipInfo[i].comment;
        let DateTime: any = sponsorshipInfo[i].dateTime;

        if (userId == sponsorshipInfo[i].userId) {
          isDeleteable = true;
        } else {
          isDeleteable = false;
        }

        a.push({ userInfo, comment, DateTime, isDeleteable, commentId });
      }
      var y = [...a].reverse();

      return y;
    }
    if (status == "readSponsorshipFavourite") {
      sponsorshipInfo = await SponsorshipModel.findOne({
        _id: sponsorshipId,
      }).populate("sponsorshipFavorite");
      sponsorshipInfo = sponsorshipInfo.sponsorshipFavorite;
      return sponsorshipInfo;
    }
  }

  ///////////////////////////////////SponsorshipActivity/////////////////////////////////////////////////

  public async feadBackSponsorship(
    body: any,
    sponsorshipId: any,
    reting: any,
    feadBackComment: any
  ) {
    let sponsorshipInfo: any;

    for (let i = 0; i < body.feadBackSponsorshipModel.length; i++) {
      sponsorshipInfo = await SponsorshipModel.findOneAndUpdate(
        {
          _id: body.sponsorshipId,
        },
        {
          $push: {
            feadBackSponsorship: {
              reting: body.feadBackSponsorship[i].reting,
              userId: body.feadBackSponsorship[i].userId,
              feadBackComment: body.feadBackSponsorship[i].feadBackComment,
            },
          },
        }
      );
    }

    return sponsorshipInfo;
  }

  public async getActivity(userId: any, status: any) {
    let userInfo: any;
    if (status == "following") {
      userInfo = await userActivity
        .find({ userId: userId, isDeleted: false })
        .populate("following", "fullname");
    }
    if (status == "followers") {
      userInfo = await userActivity
        .find({ userId: userId, isDeleted: false })
        .populate("followers", "fullname");
    }
    if (status == "blockbyOther") {
      userInfo = await userActivity
        .find({ userId: userId, isDeleted: false })
        .populate("blockbyOther", "fullname");
    }
    if (status == "friendList") {
      userInfo = await userActivity
        .find({ userId: userId, isDeleted: false })
        .populate("friendList", "fullname");
    }
    if (status == "blockList") {
      userInfo = await userActivity
        .find({ userId: userId, isDeleted: false })
        .populate("blockList", "fullname");
    }
    if (status == "sendFriendRequest") {
      userInfo = await userActivity
        .find({ userId: userId, isDeleted: false })
        .populate("sendFriendRequest", "fullname");
    }
    return userInfo;
  }

  public async RemoveActivity(userId: any, status: any, removeUserId: any) {
    let userInfo: any;
    if (status == "removeFollowing") {
      userInfo = await userActivity.findOneAndUpdate(
        { userId: userId, isDeleted: false },
        {
          $pull: {
            following: removeUserId,
          },
        }
      );
    }
    if (status == "removeFollowers") {
      userInfo = await userActivity.findOneAndUpdate(
        { userId: userId, isDeleted: false },
        {
          $pull: {
            followers: removeUserId,
          },
        }
      );
    }
    if (status == "removeFriendList") {
      userInfo = await userActivity.findOneAndUpdate(
        { userId: userId, isDeleted: false },
        {
          $pull: {
            friendList: { $in: removeUserId },
          },
        }
      );
    }
    if (status == "removeSendFriendRequest") {
      userInfo = await userActivity.findOneAndUpdate(
        { userId: userId, isDeleted: false },
        {
          $pull: {
            sendFriendRequest: { $in: removeUserId },
          },
        },
        { new: true }
      );
    }
    if (status == "removeBlockList") {
      userInfo = await userActivity.findOneAndUpdate(
        { userId: userId, isDeleted: false },
        {
          $pull: {
            blockList: { $in: removeUserId },
          },
        },
        { new: true }
      );
    }

    return userInfo;
  }

  public async filterSponsorship(query: any) {
    const queryParam: any = {};
    const searchParams = {
      academySubTypeId: query.academySubTypeId ? query.academySubTypeId : "",
      academyTypeId: query.academyTypeId ? query.academyTypeId : "",
      stage: query.stage ? query.stage : "",
    };

    if (
      searchParams.hasOwnProperty("academySubTypeId") &&
      searchParams.academySubTypeId !== ""
    ) {
      queryParam.academySubTypeId = searchParams.academySubTypeId;
    }

    if (
      searchParams.hasOwnProperty("academyTypeId") &&
      searchParams.academyTypeId !== ""
    ) {
      queryParam.academyTypeId = searchParams.academyTypeId;
    }

    if (searchParams.hasOwnProperty("stage") && searchParams.stage !== "") {
      queryParam.stage = searchParams.stage;
    }

    if (query.stage) {
      const sponsorshipData = await SponsorshipModel.aggregate([
        {
          $match: {
            stageId: { $in: [query.stage] },
            academySubTypeId: new mongoose.Types.ObjectId(
              query.academySubTypeId
            ),
            academyTypeId: new mongoose.Types.ObjectId(query.academyTypeId),
          },
        },
      ]);
      return sponsorshipData;
    }

    if (!query.stage) {
      const sponsorshipData = await SponsorshipModel.find(queryParam);

      return sponsorshipData;
    }
  }

  public async applyByUser(userId: any) {
    let sponsrData: any = await SponsorshipModel.find({
      applyInfo: {
        $elemMatch: {
          userId: userId,
        },
      },
    },{sponsorshipComment:0,applyInfo:0}).sort({ createdAt: -1 });

  

    return sponsrData;
  }

  public async selectUser(userId: any, sponsorshipId: any) {
    const sponsrData: any = await SponsorshipModel.findOne({
      _id: sponsorshipId,
    });

    await SponsorshipModel.updateOne(
      { _id: sponsorshipId },
      { $push: { slectedUser: userId } }
    );

    let userFcmToken = await userDevice.findOne({ userId: userId });
    let userData = await userDetails.findOne({ _id: userId });
    if (userFcmToken) {
      const body = `Hii, ${userData.fullName} you got selected for ${sponsrData.sponsorshipName} scloarship `;
      sendNotification(
        userFcmToken.fcmtoken,
        body,
        "abc",
        "sponsorship_home",
        userId,
        sponsorshipId,
        userId
      );
    }

    return sponsrData;
  }


  public async removedAppliedUser(userId: any, sponsorshipId: any) {
   const sponsorshipInfo = await SponsorshipModel.updateOne(
      { _id: sponsorshipId },
      {
        $pull: { applyInfo: { userId:userId } },
          $inc: { applyCount: -1 },
      }
    );
   

    return sponsorshipInfo;
  }
  
}

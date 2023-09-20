import FuzzySearch from "fuzzy-search";
import moment from "moment";

import SponsorshipModel, { ISponsorship } from "../models/sponsorshipDetails";
import userActivity from "../models/userActivity";

import User from "../models/userDetails";

import userDetails from "../models/userDetails";
import { sendNotification } from "../services/notification";

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
      eligibileId
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
      eligibileId:eligibileId
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

  public async getsponsorshipList(user: any) {
    let sponsorshipLike = await SponsorshipModel.aggregate([
      { $match: { isDeleted: false, sponsorshipLike: { $in: [user._id] } } },

      {
        $addFields: {
          isLikes: true,
        },
      },
    ]);
    let PostList = await SponsorshipModel.aggregate([
      { $match: { isDeleted: false, sponsorshipLike: { $ne: [user._id] } } },

      {
        $addFields: {
          isLikes: false,
        },
      },
    ]);

    sponsorshipLike = sponsorshipLike.concat(PostList);

    const mergedArray = [...sponsorshipLike, ...PostList];

    mergedArray.sort((a, b) => a.createdAt - b.createdAt);

    return mergedArray;
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

    if (status == "sponsorshipLike") {
      await SponsorshipModel.findOneAndUpdate(
        { _id: body.sponsorshipId },
        { $inc: { sponsorshipLikeCount: 1 } },
        { new: true }
      ).lean();
      sponsorshipInfo = await SponsorshipModel.findOneAndUpdate(
        {
          _id: body.sponsorshipId,
        },
        {
          $push: {
            sponsorshipLike: userId,
          },
        },
        { new: true }
      );

      console.log(sponsorshipInfo);

      await userActivity.findOneAndUpdate(
        { userId: sponsorshipInfo.userId },
        { $inc: { sponsorshipLikeCount: 1 } },
        { new: true }
      );
      return sponsorshipInfo;
    }
    if (status == "removeSponsorshipLike") {
      await SponsorshipModel.findOneAndUpdate(
        { _id: body.sponsorshipId },
        { $inc: { sponsorshipLikeCount: -1 } },
        { new: true }
      );

      sponsorshipInfo = await SponsorshipModel.findOneAndUpdate(
        {
          _id: body.sponsorshipId,
        },
        {
          $pull: {
            sponsorshipLike: userId,
          },
        },
        { new: true }
      );

      await userActivity.findOneAndUpdate(
        { userId: sponsorshipInfo.userId },
        { $inc: { sponsorshipLikeCount: -1 } },
        { new: true }
      );
      return sponsorshipInfo;
    }

    if (status == "sponsorshipComment") {
      let currentTime: any = new Date();
      for (let i = 0; i < body.sponsorshipComment.length; i++) {
        sponsorshipInfo = await SponsorshipModel.findOneAndUpdate(
          {
            _id: body.sponsorshipId,
          },
          {
            $push: {
              sponsorshipComment: {
                userId: body.sponsorshipComment[i].userId,
                comment: body.sponsorshipComment[i].comment,
                dateTime: currentTime,
              },
            },
          }
        );
        console.log(sponsorshipInfo, "sponsorshipInfo");

        sponsorshipInfo = await SponsorshipModel.findOneAndUpdate(
          { _id: body.sponsorshipId },
          { $inc: { sponsorshipCommentCount: 1 } },
          { new: true }
        );

        await userActivity.findOneAndUpdate(
          { userId: sponsorshipInfo.userId },
          { $inc: { sponsorshipCommentCount: 1 } },
          { new: true }
        );
        return sponsorshipInfo;
      }
    }
    if (status == "removeSponsorshipComment") {
      for (let i = 0; i < body.sponsorshipComment.length; i++) {
        sponsorshipInfo = await SponsorshipModel.findOneAndUpdate(
          {
            _id: body.sponsorshipComment[i].sponsorshipId,
          },
          {
            $pull: {
              sponsorshipComment: {
                _id: body.sponsorshipComment[i]._id,
                userId: userId,
              },
            },
          }
        );

        sponsorshipInfo = await SponsorshipModel.findOneAndUpdate(
          { _id: body.sponsorshipComment[i].sponsorshipId },
          { $inc: { sponsorshipCommentCount: -1 } },
          { new: true }
        );

        await userActivity.findOneAndUpdate(
          { userId: sponsorshipInfo.userId },
          { $inc: { sponsorshipCommentCount: -1 } },
          { new: true }
        );
        return sponsorshipInfo;
      }
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

  public async filterSponsorship(
    type: any,
    sort: any,
    category: any,
    subCategory: any,
    subSubCategory: any,
    limit: any,
    skip: any,
    search: any
  ) {
    let sponsorshipInfo: any;

    if (category) {
    } else if (sort == "lessEarning") {
      sponsorshipInfo = await SponsorshipModel.find({ isDeleted: false });

      sponsorshipInfo = sponsorshipInfo.sort(function (a: any, b: any) {
        return a.organizerTotalIncome - b.organizerTotalIncome;
      });
      return sponsorshipInfo;
    } else if (sort == "mostEarning") {
      sponsorshipInfo = await SponsorshipModel.find({ isDeleted: false });
      sponsorshipInfo = sponsorshipInfo.sort(function (a: any, b: any) {
        return b.organizerTotalIncome - a.organizerTotalIncome;
      });
      return sponsorshipInfo;
    } else if (sort == "oldtonew") {
      sponsorshipInfo = await SponsorshipModel.find({ isDeleted: false });
      sponsorshipInfo = sponsorshipInfo.sort(function (a: any, b: any) {
        return a.createdAt - b.createdAt;
      });
      return sponsorshipInfo;
    } else if (sort == "newtoold") {
      sponsorshipInfo = await SponsorshipModel.find({ isDeleted: false });
      sponsorshipInfo = sponsorshipInfo.sort(function (a: any, b: any) {
        return b.createdAt - a.createdAt;
      });
      return sponsorshipInfo;
    }
    if (limit && skip) {
      sponsorshipInfo = sponsorshipInfo.slice(skip).slice(0, limit);
    }
  }

  public async searchSponsorship(search: any) {
    let sponsorshipInfo: any = await SponsorshipModel.aggregate([
      { $match: { isDeleted: false } },
    ]);

    sponsorshipInfo = new FuzzySearch(sponsorshipInfo, ["sponsorshipName"], {
      caseSensitive: false,
    });
    sponsorshipInfo = sponsorshipInfo.search(search);
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
              text: body.text,
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

  ///////////////////////////////////////////////////////////////////////////////////////////////////

  public async getAppliedUser(sponsorshipId: any) {
    var appliedUserInfo: any = await SponsorshipModel.findOne({
      _id: sponsorshipId,
      isDeleted: false,
    })
let data=[]

    appliedUserInfo=appliedUserInfo.applyInfo;
    for (let i = 0; i < appliedUserInfo.length; i++) {
     let userInfo=await userDetails.findOne({_id:appliedUserInfo[i].userId}).lean()
     data.push(userInfo)
    }
    return data;
  }

  public async getsponsorshipByPartnerId(sponsorshipPartnerId: any) {
    var sponsorshipInfo: any = await SponsorshipModel.find({
      sponsorshipPartnerId: sponsorshipPartnerId,
      isDeleted: false,
    })

    return sponsorshipInfo;
  }




  public async readActivity(sponsorshipId: any, status: any) {
    let sponsorshipInfo: any;
    if (status == "readsponsorshipLike") {
      sponsorshipInfo = await SponsorshipModel.findOne({
        _id: sponsorshipId,
      }).populate("sponsorshipLikeship");
      sponsorshipInfo = sponsorshipInfo.sponsorshipLikeship;

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

        let comment = sponsorshipInfo[i].comment;
        let DateTime: any = sponsorshipInfo[i].dateTime;

        a.push({ userInfo, comment, DateTime });
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
}

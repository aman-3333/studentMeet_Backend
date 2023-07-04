import FuzzySearch from 'fuzzy-search';
import moment from 'moment';

import SponsorshipModel, { ISponsorship } from '../models/sponsorshipDetails'
import userActivity from '../models/userActivity';

import User from "../models/userDetails"
import bookSponsorship from "../models/sponsorshipBook"
import userDetails from '../models/userDetails';
import { sendNotification } from '../services/notification';
import post from '../models/post';
export default class SponsorshipController {
//////////////////////////ADMIN SPONSORSHIP API/////////////////////////////////
    public async create(body: any) {
        let createSponsorsPartnerInfo = new SponsorshipModel({
            sponsorshipDesription:body.sponsorshipDesription,
            sponsorshipName:body.sponsorshipName,   
            sponsorshipFormId: body.sponsorshipFormId,
            sponsorshipPartnerId: body.sponsorshipPartnerId,
            sponsorshipGuideLines:body.sponsorshipGuideLines,
            sponsorshipBannerImage:body.sponsorshipBannerImage ,
            sponsorshipTermsAndCondition:body.sponsorshipTermsAndCondition ,
         registrationStartDateTime: body.registrationStartDateTime,
        registrationEndDateTime: body.registrationEndDate,
        });
        createSponsorsPartnerInfo.save();
        return createSponsorsPartnerInfo;
    }

    public async editSponsorship(body: ISponsorship, SponsorshipId: string) {
        const sponsorshipInfo: ISponsorship = await SponsorshipModel.findOneAndUpdate({ _id: SponsorshipId, isDeleted: false }, body, { new: true }).lean();
        await post.findOneAndUpdate({ _id: SponsorshipId }, { $set: { sponsorshipName: sponsorshipInfo.sponsorshipName } })
        return sponsorshipInfo;

    }



    public async deleteSponsorship(SponsorshipId: string, userId: String) {
        const sponsorshipInfo: ISponsorship = await SponsorshipModel.findOneAndUpdate({ _id: SponsorshipId, isDeleted: false }, { $set: { isDeleted: true } }).lean()
        return sponsorshipInfo;
    }





   









/////////////////////////////////USER SCREEN SPONSORSHIP API/////////////////////////



public async getsponsorshipList( ) {
    let sponsorshipInfo: any;
    sponsorshipInfo = await SponsorshipModel.find({isDeleted:false})
    return  sponsorshipInfo;
}

public async getsponsorshipInfo(SponsorshipId: any, status: any) {
    let sponsorshipInfo: any;
    sponsorshipInfo = await SponsorshipModel.find({ _id: SponsorshipId, isDeleted: false })
    return  sponsorshipInfo;
}







public async SponsorshipActivity(userId: any, SponsorshipId: any, status: any, sponsorshipComment: any, sponsorshipCommentId: any, body: any) {
    let userInfo: any;
    let sponsorshipInfo: any;
    let data: any = []
    let a: any = []
    let info: any;

    userInfo = await userActivity.findOne({ userId: userId }).lean();


    if (!userInfo) {
        userInfo = await userActivity.create({ userId: userId })

    }
    if (status == "sponsorshipLike") {
        info = await userActivity.findOne({ sponsorshipLike: body.sponsorshipLike }).lean();
        if (info) return { message: "alreadysponsorshipLike" }

        if (!info) {
            userInfo = await userActivity.findOneAndUpdate(
                {
                    userId: userId,
                },
                {
                    $push: {
                        sponsorshipLike:
                            body.sponsorshipLike
                    }
                })

            sponsorshipInfo = await SponsorshipModel.findOneAndUpdate({ _id: body.sponsorshipLike },
                { $inc: { sponsorshipLikeCount: 1 } }, { new: true }).lean()
            sponsorshipInfo = await SponsorshipModel.findOneAndUpdate({
                _id: body.sponsorshipLike
            }, {
                $push: {
                    likeSponsorship:
                        userId

                }
            })
            
          
            return sponsorshipInfo;
        }
    }
    if (status == "removesponsorshipLike") {
        userInfo = await userActivity.findOneAndUpdate(
            {
                userId: userId,
            },
            {
                $pull: {
                    sponsorshipLike
                        : body.sponsorshipLike
                }
            })

        sponsorshipInfo = await SponsorshipModel.findOneAndUpdate({ _id: body.sponsorshipLike },
            { $inc: { sponsorshipLikeCount: -1 } }, { new: true })
        sponsorshipInfo = await SponsorshipModel.findOneAndUpdate({
            _id: body.sponsorshipLike
        }, {
            $pull: {
                likeSponsorship:
                    userId
            }
        })
        return sponsorshipInfo;
    } if (status == "readsponsorshipLike") {
        userInfo = await userActivity.findOne({ userId: userId }).lean();
        userInfo = userInfo.sponsorshipLike;


        sponsorshipInfo = await SponsorshipModel.find({ _id: { $in: userInfo } })



        return sponsorshipInfo;
    }


    if (status == "sponsorshipFavorite") {
        info = await userActivity.findOne({ sponsorshipFavorite: { $in: body.sponsorshipFavorite } }).lean();
        if (info) return { message: "already sponsorshipFavorite" }

        if (!info) {
            userInfo = await userActivity.findOneAndUpdate(
                {
                    userId: userId,
                },
                {
                    $push: {
                        sponsorshipFavorite:
                            body.sponsorshipFavorite
                    }
                })
            sponsorshipInfo = await SponsorshipModel.findOneAndUpdate({ _id: body.sponsorshipFavorite },
                { $inc: { sponsorshipFavoriteCount: 1 } }, { new: true })
            sponsorshipInfo = await SponsorshipModel.findOneAndUpdate({
                _id: body.sponsorshipFavorite
            }, {
                $push: {
                    sponsorshipFavorite:
                        userId

                }
            })
          
         
            return sponsorshipInfo;
        }
    }
    if (status == "removesponsorshipFavorite") {
        sponsorshipInfo = userInfo = await userActivity.findOneAndUpdate(
            {
                userId: userId,
            },
            {
                $pull: {
                    sponsorshipFavorite:
                        body.sponsorshipFavorite
                }
            })
        sponsorshipInfo = await SponsorshipModel.findOneAndUpdate({ _id: body.sponsorshipFavorite },
            { $inc: { sponsorshipFavoriteCount: -1 } }, { new: true })

        sponsorshipInfo = await SponsorshipModel.findOneAndUpdate({
            _id: body.sponsorshipFavorite
        }, {
            $pull: {
                sponsorshipFavorite:
                    userId
            }
        })
        return sponsorshipInfo;
    } if (status == "readsponsorshipFavorite") {
        userInfo = await userActivity.findOne({ userId: userId }).lean();
        userInfo = userInfo.sponsorshipFavorite;


        sponsorshipInfo = await SponsorshipModel.find({ _id: { $in: userInfo } })



        return sponsorshipInfo;
    }

    if (status == "sponsorshipComment") {


        let currentTime: any = new Date();
        for (let i = 0; i < body.sponsorshipComment.length; i++) {
            userInfo = await userActivity.findOneAndUpdate(
                {
                    userId: userId,
                },
                {
                    $push: {
                        sponsorshipComment: {
                            SponsorshipId: body.sponsorshipComment[i].SponsorshipId,
                            comment: body.sponsorshipComment[i].comment,
                            dateTime: currentTime
                        }
                    }
                })
            sponsorshipInfo = await SponsorshipModel.findOneAndUpdate(
                {
                    _id: body.sponsorshipComment[i].SponsorshipId,
                },
                {
                    $push: {
                        sponsorshipComment: {
                            userId: userId,
                            comment: body.sponsorshipComment[i].comment,
                            dateTime: currentTime
                        }
                    }
                })
            sponsorshipInfo = await SponsorshipModel.findOneAndUpdate({ _id: body.sponsorshipComment[i].SponsorshipId },
                { $inc: { sponsorshipCommentCount: 1 } }, { new: true })


            return sponsorshipInfo;
        }
    }
    if (status == "removesponsorshipComment") {
        for (let i = 0; i < body.sponsorshipComment.length; i++) {
            userInfo = await userActivity.findOneAndUpdate(
                {
                    userId: userId,
                },
                {
                    $pull: {
                        sponsorshipComment: {
                            SponsorshipId: body.sponsorshipComment[i].SponsorshipId,
                            comment: body.sponsorshipComment[i].comment,

                        }
                    }
                })
            sponsorshipInfo = await SponsorshipModel.findOneAndUpdate(
                {
                    _id: body.sponsorshipComment[i].SponsorshipId,
                },
                {
                    $pull: {
                        sponsorshipComment: {
                            userId: userId,
                            comment: body.sponsorshipComment[i].comment,

                        }
                    }
                })

            sponsorshipInfo = await SponsorshipModel.findOneAndUpdate({ _id: body.sponsorshipComment[i].SponsorshipId },
                { $inc: { sponsorshipCommentCount: -1 } }, { new: true })

            return sponsorshipInfo;
        }

    } if (status == "readsponsorshipComment") {
        userInfo = await userActivity.findOne({ userId: userId }).lean();
        userInfo = userInfo.sponsorshipComment;


        for (let i = 0; i < userInfo.length; i++) {
            let sponsorshipInfo: any = await SponsorshipModel.findOne({ _id: userInfo[i].SponsorshipId })

            let comment: any = userInfo[i].comment
            let DateTime: any = userInfo[i].dateTime

            data.push({ sponsorshipInfo, comment, DateTime })
        }
        return data;
    }
}


public async filterSponsorship(type: any, sort: any, category: any, subCategory: any, subSubCategory: any, limit: any, skip: any, search: any) {
    let sponsorshipInfo: any;
    if (type == "Sponsorship") {
        if (category) {
            sponsorshipInfo = await SponsorshipModel.find({ category: category, type: "Sponsorship", isDeleted: false });
            return sponsorshipInfo
        }
        else if (sort == "lessEarning") {
            sponsorshipInfo = await SponsorshipModel.find({ isDeleted: false, type: "Sponsorship" });

            sponsorshipInfo = sponsorshipInfo.sort(function (a: any, b: any) { return a.organizerTotalIncome - b.organizerTotalIncome });
            return sponsorshipInfo
        }
        else if (sort == "mostEarning") {
            sponsorshipInfo = await SponsorshipModel.find({ isDeleted: false, type: "Sponsorship" });
            sponsorshipInfo = sponsorshipInfo.sort(function (a: any, b: any) { return b.organizerTotalIncome - a.organizerTotalIncome });
            return sponsorshipInfo
        }
        else if (sort == "oldtonew") {
            sponsorshipInfo = await SponsorshipModel.find({ isDeleted: false, type: "Sponsorship" });
            sponsorshipInfo = sponsorshipInfo.sort(function (a: any, b: any) { return a.createdAt - b.createdAt });
            return sponsorshipInfo

        } else if (sort == "newtoold") {
            sponsorshipInfo = await SponsorshipModel.find({ isDeleted: false, type: "Sponsorship" });
            sponsorshipInfo = sponsorshipInfo.sort(function (a: any, b: any) { return b.createdAt - a.createdAt });
            return sponsorshipInfo
        } else if (sort == "lessAdvanced") {
            sponsorshipInfo = await SponsorshipModel.find({ isDeleted: false, type: "Sponsorship" });
            sponsorshipInfo = sponsorshipInfo.sort(function (a: any, b: any) { return a.advancedSponsorshipMoney - b.advancedSponsorshipMoney });
            return sponsorshipInfo
        } else if (sort == "mostAdvanced") {
            sponsorshipInfo = await SponsorshipModel.find({ isDeleted: false, type: "Sponsorship" });
            sponsorshipInfo = sponsorshipInfo.sort(function (a: any, b: any) { return b.advancedSponsorshipMoney - a.advancedSponsorshipMoney });
            return sponsorshipInfo
        }
        if (search) {
            sponsorshipInfo = await SponsorshipModel.find({ isDeleted: false, type: "Sponsorship" }).populate("organizerId","fullname");


            const searcher = new FuzzySearch(sponsorshipInfo, ["sponsorshipName", "SponsorshipPartnerName"], {
                caseSensitive: false,
            });
            sponsorshipInfo = searcher.search(search);
            return sponsorshipInfo
        }

        if (limit && skip) {

            sponsorshipInfo = sponsorshipInfo.slice(skip).slice(0, limit);

        }

        return sponsorshipInfo
    }
    if (type == "affilate") { 
        if (category) {
            sponsorshipInfo = await SponsorshipModel.find({ category: category, type: "affilate", isDeleted: false });

        } else if (subCategory) {
            sponsorshipInfo = await SponsorshipModel.find({ subCategory: subCategory, type: "affilate", isDeleted: false });
        } else if (subSubCategory) {
            sponsorshipInfo = await SponsorshipModel.find({ subSubCategory: subSubCategory, type: "affilate", isDeleted: false });
        }
        else if (sort == "lessEarning") {
            sponsorshipInfo = await SponsorshipModel.find({ isDeleted: false, type: "affilate" });

            sponsorshipInfo = sponsorshipInfo.sort(function (a: any, b: any) { return a.organizerTotalIncome - b.organizerTotalIncome });
            return sponsorshipInfo
        }
        else if (sort == "mostEarning") {
            sponsorshipInfo = await SponsorshipModel.find({ isDeleted: false, type: "affilate" });
            sponsorshipInfo = sponsorshipInfo.sort(function (a: any, b: any) { return b.organizerTotalIncome - a.organizerTotalIncome });
            return sponsorshipInfo
        }
        else if (sort == "oldtonew") {
            sponsorshipInfo = await SponsorshipModel.find({ isDeleted: false, type: "affilate" });
            sponsorshipInfo = sponsorshipInfo.sort(function (a: any, b: any) { return a.createdAt - b.createdAt });
            return sponsorshipInfo

        } else if (sort == "newtoold") {
            sponsorshipInfo = await SponsorshipModel.find({ isDeleted: false, type: "affilate" });
            sponsorshipInfo = sponsorshipInfo.sort(function (a: any, b: any) { return b.createdAt - a.createdAt });
            return sponsorshipInfo
        } else if (sort == "lessAdvanced") {
            sponsorshipInfo = await SponsorshipModel.find({ isDeleted: false, type: "affilate" });
            sponsorshipInfo = sponsorshipInfo.sort(function (a: any, b: any) { return a.advancedSponsorshipMoney - b.advancedSponsorshipMoney });
            return sponsorshipInfo
        } else if (sort == "mostAdvanced") {
            sponsorshipInfo = await SponsorshipModel.find({ isDeleted: false, type: "affilate" });
            sponsorshipInfo = sponsorshipInfo.sort(function (a: any, b: any) { return b.advancedSponsorshipMoney - a.advancedSponsorshipMoney });
            return sponsorshipInfo
        }
        if (search) {
            sponsorshipInfo = await SponsorshipModel.find({ isDeleted: false, type: "affilate" });


            const searcher = new FuzzySearch(sponsorshipInfo, ["sponsorshipName", "SponsorshipPartnerName"], {
                caseSensitive: false,
            });
            sponsorshipInfo = searcher.search(search);
            return sponsorshipInfo
        }

        if (limit && skip) {

            sponsorshipInfo = sponsorshipInfo.slice(skip).slice(0, limit);

        }
        return sponsorshipInfo

    }
    else {
        if (category) {
            sponsorshipInfo = await SponsorshipModel.find({ category: category, isDeleted: false });

        } else if (subCategory) {
            sponsorshipInfo = await SponsorshipModel.find({ subCategory: subCategory, isDeleted: false });
        } else if (subSubCategory) {
            sponsorshipInfo = await SponsorshipModel.find({ subSubCategory: subSubCategory, isDeleted: false });
        }
        else if (sort == "lessEarning") {
            sponsorshipInfo = await SponsorshipModel.find({ isDeleted: false });

            sponsorshipInfo = sponsorshipInfo.sort(function (a: any, b: any) { return a.organizerTotalIncome - b.organizerTotalIncome });
            return sponsorshipInfo
        }
        else if (sort == "mostEarning") {
            sponsorshipInfo = await SponsorshipModel.find({ isDeleted: false });
            sponsorshipInfo = sponsorshipInfo.sort(function (a: any, b: any) { return b.organizerTotalIncome - a.organizerTotalIncome });
            return sponsorshipInfo
        }
        else if (sort == "oldtonew") {
            sponsorshipInfo = await SponsorshipModel.find({ isDeleted: false });
            sponsorshipInfo = sponsorshipInfo.sort(function (a: any, b: any) { return a.createdAt - b.createdAt });
            return sponsorshipInfo

        } else if (sort == "newtoold") {
            sponsorshipInfo = await SponsorshipModel.find({ isDeleted: false });
            sponsorshipInfo = sponsorshipInfo.sort(function (a: any, b: any) { return b.createdAt - a.createdAt });
            return sponsorshipInfo
        } else if (sort == "lessAdvanced") {
            sponsorshipInfo = await SponsorshipModel.find({ isDeleted: false });
            sponsorshipInfo = sponsorshipInfo.sort(function (a: any, b: any) { return a.advancedSponsorshipMoney - b.advancedSponsorshipMoney });
            return sponsorshipInfo
        } else if (sort == "mostAdvanced") {
            sponsorshipInfo = await SponsorshipModel.find({ isDeleted: false });
            sponsorshipInfo = sponsorshipInfo.sort(function (a: any, b: any) { return b.advancedSponsorshipMoney - a.advancedSponsorshipMoney });
            return sponsorshipInfo
        }
        if (search) {
            sponsorshipInfo = await SponsorshipModel.find({ isDeleted: false });


            const searcher = new FuzzySearch(sponsorshipInfo, ["sponsorshipName", "SponsorshipPartnerName"], {
                caseSensitive: false,
            });
            sponsorshipInfo = searcher.search(search);
            return sponsorshipInfo
        }
        if (limit && skip) {

            sponsorshipInfo = sponsorshipInfo.slice(skip).slice(0, limit);

        }

    }


}


 
public async searchSponsorship(search:any){
    let sponsorshipInfo:any=await SponsorshipModel.aggregate(
    [
        {
          $search: {
            index: "search-text",
            text: {
              query: search,
              path: {
                wildcard: "*"
              }
            }
          }
        }
      ])
  return  sponsorshipInfo 

}


public async bookSponsorship(SponsorshipId: any, userId: any, status: any) {
    let sponsorshipInfo: any
    let bookSponsorshipData: any 
    sponsorshipInfo = await SponsorshipModel.findOne({ _id: SponsorshipId,  isDeleted: false }).lean()
   

    if (bookSponsorshipData) return ({ message: "you already booked this Sponsorship" })
    bookSponsorshipData = await bookSponsorship.create({ SponsorshipId: SponsorshipId, userId: userId })
   // bookSponsorshipData = await bookSponsorshipModel.findOneAndUpdate({ _id: bookSponsorshipData._id, isDeleted: false }, { $set: { orderTotal: sponsorshipInfo.priceForParticipent } }, { new: true }).lean()
    return bookSponsorshipData
}

public async applyForSponsorship(SponsorshipId: any, userId: any, formId: any, status: any) {
    let sponsorshipInfo: any = await SponsorshipModel.findOne({ _id: SponsorshipId,  isDeleted: false,  }).lean()
    if (sponsorshipInfo) {
        return ({ message: "already book" })
    }
    else {

        sponsorshipInfo = await SponsorshipModel.findOne({ _id: SponsorshipId,  isDeleted: false  }).lean()

        let bookSponsorshipData: any = await bookSponsorship.create({ SponsorshipId: SponsorshipId, userId: userId ,isSponsorshipOrganizer:true })
       
        return bookSponsorshipData
    }
}

    ///////////////////////////////////////////////////////////////////////////////////////////////////
    

   
  
    
  




    public async getParticipantsList(SponsorshipId: any) {

        var ParticipantInfo: any = await SponsorshipModel.find({ SponsorshipId: SponsorshipId, isDeleted: false }).populate("userId")
        ParticipantInfo=ParticipantInfo.map((e:any)=>e.userId)
        return ParticipantInfo;


    }

   

    public async readActivity(SponsorshipId: any, status: any) {
        let sponsorshipInfo: any
        if (status == "readsponsorshipLike") {
            sponsorshipInfo = await SponsorshipModel.findOne({ _id: SponsorshipId }).populate("likeSponsorship");
            sponsorshipInfo = sponsorshipInfo.likeSponsorship;

            return sponsorshipInfo
        }
        if (status == "readsponsorshipComment") {
            let a = []
            sponsorshipInfo = await SponsorshipModel.findOne({ _id: SponsorshipId }).lean();

            sponsorshipInfo = sponsorshipInfo.sponsorshipComment;




            for (let i = 0; i < sponsorshipInfo.length; i++) {
                
                let userInfo: any = await userDetails.findOne({ _id: sponsorshipInfo[i].userId }, { fullname: true })


                let comment = sponsorshipInfo[i].comment
                let DateTime: any = sponsorshipInfo[i].dateTime
          
                a.push({ userInfo, comment, DateTime })

            }
            var y = [...a].reverse();
 
     
            return y 

        } if (status == "readSponsorshipFavourite") {
            sponsorshipInfo = await SponsorshipModel.findOne({ _id: SponsorshipId }).populate("sponsorshipFavorite");
            sponsorshipInfo = sponsorshipInfo.sponsorshipFavorite;
            return sponsorshipInfo
        }
    }
 
 
  
   




    ///////////////////////////////////SponsorshipActivity/////////////////////////////////////////////////
  

    public async feadBackSponsorship(body: any, SponsorshipId: any, reting: any, feadBackComment: any) {
        let sponsorshipInfo: any;

        for (let i = 0; i < body.feadBackSponsorship.length; i++) {
            sponsorshipInfo = await SponsorshipModel.findOneAndUpdate(
                {
                    _id: body.SponsorshipId
                },
                {
                    $push: {
                        feadBackSponsorship: {
                            reting: body.feadBackSponsorship[i].reting,
                            userId: body.feadBackSponsorship[i].userId,
                            feadBackComment: body.feadBackSponsorship[i].feadBackComment
                        }
                    }
                })


        }

        return sponsorshipInfo
    }
    public async getActivity(userId: any, status: any) {
        let userInfo: any;
        if (status == "following") {
            userInfo = await userActivity.find({ userId: userId, isDeleted: false }).populate("following", "fullname")
        } if (status == "followers") {
            userInfo = await userActivity.find({ userId: userId, isDeleted: false }).populate("followers", "fullname")
        } if (status == "blockbyOther") {
            userInfo = await userActivity.find({ userId: userId, isDeleted: false }).populate("blockbyOther", "fullname")
        } if (status == "friendList") {
            userInfo = await userActivity.find({ userId: userId, isDeleted: false }).populate("friendList", "fullname")
        } if (status == "blockList") {
            userInfo = await userActivity.find({ userId: userId, isDeleted: false }).populate("blockList", "fullname")
        } if (status == "sendFriendRequest") {
            userInfo = await userActivity.find({ userId: userId, isDeleted: false }).populate("sendFriendRequest", "fullname")
        }
        return userInfo
    }
    public async RemoveActivity(userId: any, status: any, removeUserId: any) {
        let userInfo: any;
        if (status == "removeFollowing") {
            userInfo = await userActivity.findOneAndUpdate({ userId: userId, isDeleted: false }, {
                $pull: {
                    following: removeUserId
                }
            })


        }
        if (status == "removeFollowers") {
            userInfo = await userActivity.findOneAndUpdate({ userId: userId, isDeleted: false }, {
                $pull: {
                    followers: removeUserId
                }
            })
        } if (status == "removeFriendList") {
            userInfo = await userActivity.findOneAndUpdate({ userId: userId, isDeleted: false }, {
                $pull: {
                    friendList: { $in: removeUserId }
                }
            })
        } if (status == "removeSendFriendRequest") {
            userInfo = await userActivity.findOneAndUpdate({ userId: userId, isDeleted: false }, {
                $pull: {
                    sendFriendRequest: { $in: removeUserId }
                }
            }, { new: true })
        } if (status == "removeBlockList") {
            userInfo = await userActivity.findOneAndUpdate({ userId: userId, isDeleted: false }, {
                $pull: {
                    blockList: { $in: removeUserId }
                }
            }, { new: true })
        }

        return userInfo

    }












}




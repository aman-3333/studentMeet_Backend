import FuzzySearch from 'fuzzy-search';
import moment from 'moment';
import Sponsorship, { ISponsorship } from '../models/sponser'
import userActivity from '../models/userActivity';
 import friendActivity from '../models/friendSponsershipActivity';
import User from "../models/userDetails"
import bookSponsorship from "../models/sponsershipBook"
import userDetails from '../models/userDetails';
import { sendNotification } from '../services/notification';
import post from '../models/post';
export default class SponsorshipController {

    public async createSponsorship(body: ISponsorship) {

        let sponsorshipInfo: ISponsorship;
        sponsorshipInfo = await Sponsorship.create(body);

        return sponsorshipInfo;
    }
    public async editSponsorship(body: ISponsorship, SponsorshipId: string) {

        const sponsorshipInfo: ISponsorship = await Sponsorship.findOneAndUpdate({ _id: SponsorshipId, isDeleted: false }, body, { new: true }).lean();
        await post.findOneAndUpdate({ _id: SponsorshipId }, { $set: { sponsorshipName: sponsorshipInfo.sponsorshipName } })
        return sponsorshipInfo;

    }
    public async getSponsorshipSponsorshipScreen(type: any) {
        const SponsorshipList: ISponsorship[] = await Sponsorship.find({ type: type, isDeleted: false }).populate("organizerId");
        return SponsorshipList;
    }

    public async getSponsorshipByUserId(userId: any) {
        const SponsorshipList: ISponsorship[] = await Sponsorship.find({ organizerId: userId, isDeleted: false })
        return SponsorshipList;
    }
    public async getSponsorshipCreateByUser(userId: any) {
        const SponsorshipList: ISponsorship[] = await Sponsorship.find({ organizerId: userId, isDeleted: false, isCreateByOrganizer: true })
        return SponsorshipList;
    }
    public async getSponsorshipOnHomeScreen(type: any) {
        const SponsorshipList: ISponsorship[] = await Sponsorship.find({ type: type, isDeleted: false, isActive: true, isSponsorshipVerified: true, isBookSponsorshipPaid: true, }).populate("organizerId", "fullname");;
        return SponsorshipList;
    }
    public async getsponsorshipInfo(SponsorshipId: any, status: any) {
        let sponsorshipInfo: any;
        sponsorshipInfo = await Sponsorship.find({ _id: SponsorshipId, isDeleted: false }).populate("organizerId")
        return  sponsorshipInfo;
    }

    public async getFriendActivity(userId:any){
        
        let ActivityInfo: any;
        ActivityInfo = await friendActivity.find({ userId: userId }).populate("friendActivity.SponsorshipId").populate("friendActivity.friendId")
        return ActivityInfo;
    }


    public async deleteSponsorship(SponsorshipId: string, userId: String) {

        const sponsorshipInfo: ISponsorship = await Sponsorship.findOneAndUpdate({ _id: SponsorshipId, isDeleted: false }, { $set: { isDeleted: true } }).lean()
        return sponsorshipInfo;


    }


    public async getParticipantsList(SponsorshipId: any) {

        var ParticipantInfo: any = await bookSponsorship.find({ SponsorshipId: SponsorshipId, isDeleted: false }).populate("userId")
        ParticipantInfo=ParticipantInfo.map((e:any)=>e.userId)
        return ParticipantInfo;


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
        if (status == "sponsershipLike") {
            info = await userActivity.findOne({ sponsershipLike: body.sponsershipLike }).lean();
            if (info) return { message: "alreadysponsershipLike" }

            if (!info) {
                userInfo = await userActivity.findOneAndUpdate(
                    {
                        userId: userId,
                    },
                    {
                        $push: {
                            sponsershipLike:
                                body.sponsershipLike
                        }
                    })

                sponsorshipInfo = await Sponsorship.findOneAndUpdate({ _id: body.sponsershipLike },
                    { $inc: { sponsershipLikeCount: 1 } }, { new: true }).lean()
                sponsorshipInfo = await Sponsorship.findOneAndUpdate({
                    _id: body.sponsershipLike
                }, {
                    $push: {
                        likeSponsorship:
                            userId

                    }
                })
                
                let friendInfo=userInfo.friendList;
                friendInfo.forEach(async(element:any) => {
                    await friendActivity.findOneAndUpdate({userId:element},
                        {$push:{
                            friendActivity:{
                                friendId:userId,
                                SponsorshipId:body.sponsershipLike,
                                Activity:"Like Sponsorship"
                               }
                    }})
                  });
                return sponsorshipInfo;
            }
        }
        if (status == "removesponsershipLike") {
            userInfo = await userActivity.findOneAndUpdate(
                {
                    userId: userId,
                },
                {
                    $pull: {
                        sponsershipLike
                            : body.sponsershipLike
                    }
                })

            sponsorshipInfo = await Sponsorship.findOneAndUpdate({ _id: body.sponsershipLike },
                { $inc: { sponsershipLikeCount: -1 } }, { new: true })
            sponsorshipInfo = await Sponsorship.findOneAndUpdate({
                _id: body.sponsershipLike
            }, {
                $pull: {
                    likeSponsorship:
                        userId
                }
            })
            return sponsorshipInfo;
        } if (status == "readsponsershipLike") {
            userInfo = await userActivity.findOne({ userId: userId }).lean();
            userInfo = userInfo.sponsershipLike;


            sponsorshipInfo = await Sponsorship.find({ _id: { $in: userInfo } })



            return sponsorshipInfo;
        }


        if (status == "sponsershipFavorite") {
            info = await userActivity.findOne({ sponsershipFavorite: { $in: body.sponsershipFavorite } }).lean();
            if (info) return { message: "already sponsershipFavorite" }

            if (!info) {
                userInfo = await userActivity.findOneAndUpdate(
                    {
                        userId: userId,
                    },
                    {
                        $push: {
                            sponsershipFavorite:
                                body.sponsershipFavorite
                        }
                    })
                sponsorshipInfo = await Sponsorship.findOneAndUpdate({ _id: body.sponsershipFavorite },
                    { $inc: { sponsershipFavoriteCount: 1 } }, { new: true })
                sponsorshipInfo = await Sponsorship.findOneAndUpdate({
                    _id: body.sponsershipFavorite
                }, {
                    $push: {
                        sponsershipFavorite:
                            userId

                    }
                })
              
                let friendInfo=userInfo.friendList;
                friendInfo.forEach(async(element:any) => {
                    await friendActivity.findOneAndUpdate({userId:element},
                        {$push:{
                            friendActivity:{
                                friendId:userId,
                                SponsorshipId:body.sponsershipFavorite,
                                Activity:"Favorite Sponsorship"
                               }
                    }})
                  });
                return sponsorshipInfo;
            }
        }
        if (status == "removesponsershipFavorite") {
            sponsorshipInfo = userInfo = await userActivity.findOneAndUpdate(
                {
                    userId: userId,
                },
                {
                    $pull: {
                        sponsershipFavorite:
                            body.sponsershipFavorite
                    }
                })
            sponsorshipInfo = await Sponsorship.findOneAndUpdate({ _id: body.sponsershipFavorite },
                { $inc: { sponsershipFavoriteCount: -1 } }, { new: true })

            sponsorshipInfo = await Sponsorship.findOneAndUpdate({
                _id: body.sponsershipFavorite
            }, {
                $pull: {
                    sponsershipFavorite:
                        userId
                }
            })
            return sponsorshipInfo;
        } if (status == "readsponsershipFavorite") {
            userInfo = await userActivity.findOne({ userId: userId }).lean();
            userInfo = userInfo.sponsershipFavorite;


            sponsorshipInfo = await Sponsorship.find({ _id: { $in: userInfo } })



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
                sponsorshipInfo = await Sponsorship.findOneAndUpdate(
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
                sponsorshipInfo = await Sponsorship.findOneAndUpdate({ _id: body.sponsorshipComment[i].SponsorshipId },
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
                sponsorshipInfo = await Sponsorship.findOneAndUpdate(
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

                sponsorshipInfo = await Sponsorship.findOneAndUpdate({ _id: body.sponsorshipComment[i].SponsorshipId },
                    { $inc: { sponsorshipCommentCount: -1 } }, { new: true })

                return sponsorshipInfo;
            }

        } if (status == "readsponsorshipComment") {
            userInfo = await userActivity.findOne({ userId: userId }).lean();
            userInfo = userInfo.sponsorshipComment;


            for (let i = 0; i < userInfo.length; i++) {
                let sponsorshipInfo: any = await Sponsorship.findOne({ _id: userInfo[i].SponsorshipId })

                let comment: any = userInfo[i].comment
                let DateTime: any = userInfo[i].dateTime

                data.push({ sponsorshipInfo, comment, DateTime })
            }
            return data;
        }
    }

    public async readActivity(SponsorshipId: any, status: any) {
        let sponsorshipInfo: any
        if (status == "readsponsershipLike") {
            sponsorshipInfo = await Sponsorship.findOne({ _id: SponsorshipId }).populate("likeSponsorship");
            sponsorshipInfo = sponsorshipInfo.likeSponsorship;

            return sponsorshipInfo
        }
        if (status == "readsponsorshipComment") {
            let a = []
            sponsorshipInfo = await Sponsorship.findOne({ _id: SponsorshipId }).lean();

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
            sponsorshipInfo = await Sponsorship.findOne({ _id: SponsorshipId }).populate("sponsershipFavorite");
            sponsorshipInfo = sponsorshipInfo.sponsershipFavorite;
            return sponsorshipInfo
        }
    }
    public async SponsorshipCreateBYOrganizer(body: any) {
        let sponsorshipInfo: any;
        sponsorshipInfo = await Sponsorship.create(body);

        return sponsorshipInfo;

    }
 
    public async filterSponsorship(type: any, sort: any, category: any, subCategory: any, subSubCategory: any, limit: any, skip: any, search: any) {
        let sponsorshipInfo: any;
        if (type == "Sponsorship") {
            if (category) {
                sponsorshipInfo = await Sponsorship.find({ category: category, type: "Sponsorship", isDeleted: false });
                return sponsorshipInfo
            }
            else if (sort == "lessEarning") {
                sponsorshipInfo = await Sponsorship.find({ isDeleted: false, type: "Sponsorship" });

                sponsorshipInfo = sponsorshipInfo.sort(function (a: any, b: any) { return a.organizerTotalIncome - b.organizerTotalIncome });
                return sponsorshipInfo
            }
            else if (sort == "mostEarning") {
                sponsorshipInfo = await Sponsorship.find({ isDeleted: false, type: "Sponsorship" });
                sponsorshipInfo = sponsorshipInfo.sort(function (a: any, b: any) { return b.organizerTotalIncome - a.organizerTotalIncome });
                return sponsorshipInfo
            }
            else if (sort == "oldtonew") {
                sponsorshipInfo = await Sponsorship.find({ isDeleted: false, type: "Sponsorship" });
                sponsorshipInfo = sponsorshipInfo.sort(function (a: any, b: any) { return a.createdAt - b.createdAt });
                return sponsorshipInfo

            } else if (sort == "newtoold") {
                sponsorshipInfo = await Sponsorship.find({ isDeleted: false, type: "Sponsorship" });
                sponsorshipInfo = sponsorshipInfo.sort(function (a: any, b: any) { return b.createdAt - a.createdAt });
                return sponsorshipInfo
            } else if (sort == "lessAdvanced") {
                sponsorshipInfo = await Sponsorship.find({ isDeleted: false, type: "Sponsorship" });
                sponsorshipInfo = sponsorshipInfo.sort(function (a: any, b: any) { return a.advancedSponsorshipMoney - b.advancedSponsorshipMoney });
                return sponsorshipInfo
            } else if (sort == "mostAdvanced") {
                sponsorshipInfo = await Sponsorship.find({ isDeleted: false, type: "Sponsorship" });
                sponsorshipInfo = sponsorshipInfo.sort(function (a: any, b: any) { return b.advancedSponsorshipMoney - a.advancedSponsorshipMoney });
                return sponsorshipInfo
            }
            if (search) {
                sponsorshipInfo = await Sponsorship.find({ isDeleted: false, type: "Sponsorship" }).populate("organizerId","fullname");


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
                sponsorshipInfo = await Sponsorship.find({ category: category, type: "affilate", isDeleted: false });

            } else if (subCategory) {
                sponsorshipInfo = await Sponsorship.find({ subCategory: subCategory, type: "affilate", isDeleted: false });
            } else if (subSubCategory) {
                sponsorshipInfo = await Sponsorship.find({ subSubCategory: subSubCategory, type: "affilate", isDeleted: false });
            }
            else if (sort == "lessEarning") {
                sponsorshipInfo = await Sponsorship.find({ isDeleted: false, type: "affilate" });

                sponsorshipInfo = sponsorshipInfo.sort(function (a: any, b: any) { return a.organizerTotalIncome - b.organizerTotalIncome });
                return sponsorshipInfo
            }
            else if (sort == "mostEarning") {
                sponsorshipInfo = await Sponsorship.find({ isDeleted: false, type: "affilate" });
                sponsorshipInfo = sponsorshipInfo.sort(function (a: any, b: any) { return b.organizerTotalIncome - a.organizerTotalIncome });
                return sponsorshipInfo
            }
            else if (sort == "oldtonew") {
                sponsorshipInfo = await Sponsorship.find({ isDeleted: false, type: "affilate" });
                sponsorshipInfo = sponsorshipInfo.sort(function (a: any, b: any) { return a.createdAt - b.createdAt });
                return sponsorshipInfo

            } else if (sort == "newtoold") {
                sponsorshipInfo = await Sponsorship.find({ isDeleted: false, type: "affilate" });
                sponsorshipInfo = sponsorshipInfo.sort(function (a: any, b: any) { return b.createdAt - a.createdAt });
                return sponsorshipInfo
            } else if (sort == "lessAdvanced") {
                sponsorshipInfo = await Sponsorship.find({ isDeleted: false, type: "affilate" });
                sponsorshipInfo = sponsorshipInfo.sort(function (a: any, b: any) { return a.advancedSponsorshipMoney - b.advancedSponsorshipMoney });
                return sponsorshipInfo
            } else if (sort == "mostAdvanced") {
                sponsorshipInfo = await Sponsorship.find({ isDeleted: false, type: "affilate" });
                sponsorshipInfo = sponsorshipInfo.sort(function (a: any, b: any) { return b.advancedSponsorshipMoney - a.advancedSponsorshipMoney });
                return sponsorshipInfo
            }
            if (search) {
                sponsorshipInfo = await Sponsorship.find({ isDeleted: false, type: "affilate" });


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
                sponsorshipInfo = await Sponsorship.find({ category: category, isDeleted: false });

            } else if (subCategory) {
                sponsorshipInfo = await Sponsorship.find({ subCategory: subCategory, isDeleted: false });
            } else if (subSubCategory) {
                sponsorshipInfo = await Sponsorship.find({ subSubCategory: subSubCategory, isDeleted: false });
            }
            else if (sort == "lessEarning") {
                sponsorshipInfo = await Sponsorship.find({ isDeleted: false });

                sponsorshipInfo = sponsorshipInfo.sort(function (a: any, b: any) { return a.organizerTotalIncome - b.organizerTotalIncome });
                return sponsorshipInfo
            }
            else if (sort == "mostEarning") {
                sponsorshipInfo = await Sponsorship.find({ isDeleted: false });
                sponsorshipInfo = sponsorshipInfo.sort(function (a: any, b: any) { return b.organizerTotalIncome - a.organizerTotalIncome });
                return sponsorshipInfo
            }
            else if (sort == "oldtonew") {
                sponsorshipInfo = await Sponsorship.find({ isDeleted: false });
                sponsorshipInfo = sponsorshipInfo.sort(function (a: any, b: any) { return a.createdAt - b.createdAt });
                return sponsorshipInfo

            } else if (sort == "newtoold") {
                sponsorshipInfo = await Sponsorship.find({ isDeleted: false });
                sponsorshipInfo = sponsorshipInfo.sort(function (a: any, b: any) { return b.createdAt - a.createdAt });
                return sponsorshipInfo
            } else if (sort == "lessAdvanced") {
                sponsorshipInfo = await Sponsorship.find({ isDeleted: false });
                sponsorshipInfo = sponsorshipInfo.sort(function (a: any, b: any) { return a.advancedSponsorshipMoney - b.advancedSponsorshipMoney });
                return sponsorshipInfo
            } else if (sort == "mostAdvanced") {
                sponsorshipInfo = await Sponsorship.find({ isDeleted: false });
                sponsorshipInfo = sponsorshipInfo.sort(function (a: any, b: any) { return b.advancedSponsorshipMoney - a.advancedSponsorshipMoney });
                return sponsorshipInfo
            }
            if (search) {
                sponsorshipInfo = await Sponsorship.find({ isDeleted: false });


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

    public async createSponsorshipOrganizerTeam(organizerId: any, SponsorshipId: any, suborganizerId: any) {

        let sponsorshipInfo: any = await Sponsorship.findOneAndUpdate({
            _id: SponsorshipId,
            organizerId: organizerId
        },
            {
                $push: {
                    suborganizerId: suborganizerId
                }
            })
        return sponsorshipInfo
    }

    public async bookSponsorship(SponsorshipId: any, userId: any, status: any) {
        let sponsorshipInfo: any
        let bookSponsorshipData: any 
        sponsorshipInfo = await Sponsorship.findOne({ _id: SponsorshipId,  isDeleted: false }).lean()
        bookSponsorshipData = await bookSponsorship.findOne({ SponsorshipId: SponsorshipId, userId: userId, isDeleted: false, isSponsorshipBook: true }).lean()

        if (bookSponsorshipData) return ({ message: "you already booked this Sponsorship" })
        bookSponsorshipData = await bookSponsorship.create({ SponsorshipId: SponsorshipId, userId: userId })
        bookSponsorshipData = await bookSponsorship.findOneAndUpdate({ _id: bookSponsorshipData._id, isDeleted: false }, { $set: { orderTotal: sponsorshipInfo.priceForParticipent } }, { new: true }).lean()
        return bookSponsorshipData
    }

    public async applyForSponsorshipOrganize(SponsorshipId: any, organizerId: any, formId: any, status: any) {
        let sponsorshipInfo: any = await Sponsorship.findOne({ _id: SponsorshipId, isOrganized: true, isDeleted: false, isBookSponsorshipPaid: true }).lean()
        if (sponsorshipInfo) {
            return ({ message: "already book" })
        }
        else {

            sponsorshipInfo = await Sponsorship.findOne({ _id: SponsorshipId,  isDeleted: false  }).lean()

            let bookSponsorshipData: any = await bookSponsorship.create({ SponsorshipId: SponsorshipId, userId: organizerId,isSponsorshipOrganizer:true,orderTotal:sponsorshipInfo.priceForParticipent })
           
            return bookSponsorshipData
        }
    }

   




    ///////////////////////////////////SponsorshipActivity/////////////////////////////////////////////////
  

    public async feadBackSponsorship(body: any, SponsorshipId: any, reting: any, feadBackComment: any) {
        let sponsorshipInfo: any;

        for (let i = 0; i < body.feadBackSponsorship.length; i++) {
            sponsorshipInfo = await Sponsorship.findOneAndUpdate(
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




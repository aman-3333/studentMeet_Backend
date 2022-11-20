import Hashtag, { IHashtag } from "../models/Hashtag";
import event from "../models/event";
import UserActivity from "../models/userActivity"
import FuzzySearch from "fuzzy-search";
import userDetails from "../models/userDetails";
import userActivity from "../models/userActivity";
export default class HashtagController {

    public async createHashtag(body: any) {
        let HashtagInfo: any;
        HashtagInfo = await Hashtag.create(body);
        return HashtagInfo;
    }
    public async createHashtageeee(body: any) {
        let HashtagInfo: any;
        HashtagInfo = await Hashtag.create(body);
        return HashtagInfo;
    }
    public async editHashtag(body: IHashtag, HashtagId: string) {
        const HashtagInfo: IHashtag = await Hashtag.findOneAndUpdate({ _id: HashtagId, isDeleted: false }, body, { new: true }).lean();
        return HashtagInfo;
    }

    public async getHashtagList() {
        const HashtagList: IHashtag[] = await Hashtag.find({ isDeleted: false });
        return HashtagList;
    }
    public async getHashtagListByUserId(userId:any) {
        const HashtagList: IHashtag[] = await Hashtag.find({userId:userId ,isDeleted: false });
        return HashtagList;
    }

    public async getHashtagInfoById(HashtagId: any) {
        const HashtagInfo: any = await Hashtag.findOne({ _id: HashtagId, isDeleted: false }).lean();
        return HashtagInfo;
    }
  

public async getAllEventByUserId(userId:any){
    let eventInfo:any=await event.find({organizerId:{$in:userId},isDeleted:false}).lean()
    return eventInfo
}


public async searchHashtag(search:any){
    if(search){
        let hashtagInfo:any=await Hashtag.find({isDeleted:false})
        hashtagInfo = new FuzzySearch(hashtagInfo, ["Hashtag"], {
            caseSensitive: false,
        });
        hashtagInfo = hashtagInfo.search(search);
        return hashtagInfo

    }

}
    public async deleteHashtag(HashtagId: String, userId: any) {
        const HashtagInfo: IHashtag = await Hashtag.findOneAndUpdate({ _id: HashtagId, isDeleted: false }, { $set: { isDeleted: true, deletedPersonId: userId } }, { new: true }).lean();
        return HashtagInfo;
    }
    public async HashtagActivity(userId: any, HashtagId: any, status: any, Hashtagcomment: any, HashtagcommentId: any, body: any) {
        let userInfo: any;
        let data: any = []
        let a: any = []
        let info: any;
        let HashtagInfo: any
        userInfo = await userActivity.findOne({ userId: userId }).lean();
    
    
        if (!userInfo) {
            userInfo = await userActivity.create({ userId: userId })
    
        }
    
    
        if (status == "HashtagLike") {
            info = await userActivity.findOne({ HashtagLike: body.HashtagLike }).lean();
    
    
            if (!info) {
                userInfo = await userActivity.updateMany(
                    {
                        userId: userId,
                    },
                    {
                        $push: {
                            HashtagLike:
                                body.HashtagLike
                        }
                    })
    
                    HashtagInfo=    await Hashtag.findOneAndUpdate({ _id: body.HashtagLike },
                    { $inc: { HashtagLikeCount: 1 } }, { new: true }).lean()
                    HashtagInfo=  await Hashtag.findOneAndUpdate({
                    _id: body.HashtagLike
                }, {
                    $push: {
                        likeHashtag:
                            userId
    
                    }
                })
                return userInfo;
            }
        }
        if (status == "removeHashtagLike") {
            userInfo = await userActivity.findOneAndUpdate(
                {
                    userId: userId,
                },
                {
                    $pull: {
                        HashtagLike
                            : body.HashtagLike
                    }
                })
    
                HashtagInfo=   await Hashtag.findOneAndUpdate({ _id: body.HashtagLike },
                { $inc: { HashtagLikeCount: -1 } }, { new: true })
                HashtagInfo=     await Hashtag.findOneAndUpdate({
                _id: body.HashtagLike
            }, {
                $pull: {
                    likeHashtag:
                        userId
                }
            })
            return userInfo;
        } if (status == "readHashtagLike") {
            userInfo = await userActivity.findOne({ userId: userId }).lean();
            userInfo = userInfo.HashtagLike;
    
    
            HashtagInfo = await Hashtag.find({ _id: { $in: userInfo } })
    
    
    
            return HashtagInfo;
        }
    
    
        if (status == "HashtagFavourite") {
            info = await userActivity.findOne({ HashtagFavourite: { $in: body.HashtagFavourite } }).lean();
    
    
            if (!info) {
                userInfo = await userActivity.findOneAndUpdate(
                    {
                        userId: userId,
                    },
                    {
                        $push: {
                            HashtagFavourite:
                                body.HashtagFavourite
                        }
                    })
                    HashtagInfo=   await Hashtag.findOneAndUpdate({ _id: body.HashtagFavourite },
                    { $inc: { HashtagFavouriteCount: 1 } }, { new: true })
                    HashtagInfo=    await Hashtag.findOneAndUpdate({
                    _id: body.HashtagFavourite
                }, {
                    $push: {
                        HashtagFavourite:
                            userId
    
                    }
                })
                return userInfo;
            }
        }
        if (status == "removeHashtagFavourite") {
            userInfo = await userActivity.findOneAndUpdate(
                {
                    userId: userId,
                },
                {
                    $pull: {
                        HashtagFavourite:
                            body.HashtagFavourite
                    }
                })
                HashtagInfo=      await Hashtag.findOneAndUpdate({ _id: body.HashtagFavourite },
                { $inc: { HashtagFavouriteCount: -1 } }, { new: true })
    
                HashtagInfo=   await Hashtag.findOneAndUpdate({
                _id: body.HashtagFavourite
            }, {
                $pull: {
                    HashtagFavourite:
                        userId
                }
            })
            return userInfo;
        } if (status == "readHashtagFavourite") {
            userInfo = await userActivity.findOne({ userId: userId }).lean();
            userInfo = userInfo.HashtagFavourite;
    
    
            HashtagInfo= await Hashtag.find({ _id: { $in: userInfo } })
    
    
    
            return HashtagInfo;
        }
    
        if (status == "Hashtagcomment") {
    
    
            let currentTime: any = new Date();
            for (let i = 0; i < body.Hashtagcomment.length; i++) {
                userInfo = await userActivity.findOneAndUpdate(
                    {
                        userId: userId,
                    },
                    {
                        $push: {
                            Hashtagcomment: {
                                HashtagId: body.Hashtagcomment[i].HashtagId,
                                comment: body.Hashtagcomment[i].comment,
                                dateTime: currentTime
                            }
                        }
                    })
                    HashtagInfo=      await Hashtag.findOneAndUpdate(
                    {
                        _id: body.Hashtagcomment[i].HashtagId,
                    },
                    {
                        $push: {
                            Hashtagcomment: {
                                userId: userId,
                                comment: body.Hashtagcomment[i].comment,
                                dateTime: currentTime
                            }
                        }
                    })
                    HashtagInfo=    await Hashtag.findOneAndUpdate({ _id: body.Hashtagcomment[i].HashtagId },
                    { $inc: { hashtagcommentCount: 1 } }, { new: true })
    
    
    
                return userInfo;
            }
        }
        if (status == "removeHashtagcomment") {
            for (let i = 0; i < body.Hashtagcomment.length; i++) {
                userInfo = await userActivity.findOneAndUpdate(
                    {
                        userId: userId,
                    },
                    {
                        $pull: {
                            Hashtagcomment: {
                                HashtagId: body.Hashtagcomment[i].HashtagId,
                                comment: body.Hashtagcomment[i].comment,
    
                            }
                        }
                    })
                await Hashtag.findOneAndUpdate(
                    {
                        _id: body.Hashtagcomment[i].HashtagId,
                    },
                    {
                        $pull: {
                            Hashtagcomment: {
                                userId: userId,
                                comment: body.Hashtagcomment[i].comment,
    
                            }
                        }
                    })
    
                await Hashtag.findOneAndUpdate({ _id: body.Hashtagcomment[i].HashtagId },
                    { $inc: { hashtagcommentCount: -1 } }, { new: true })
    
                return userInfo;
            }
    
        } if (status == "readHashtagcomment") {
            userInfo = await userActivity.findOne({ userId: userId }).lean();
            userInfo = userInfo.Hashtagcomment;
    
    
            for (let i = 0; i < userInfo.length; i++) {
                HashtagInfo = await Hashtag.findOne({ _id: userInfo[i].HashtagId })
    
                let comment: any = userInfo[i].comment
                let DateTime: any = userInfo[i].dateTime
    
                data.push({ HashtagInfo, comment, DateTime })
            }
            return data;
        }
    }
    
    public async readHashtagActivity(HashtagId: any, status: any) {
        let HashtagInfo: any
        if (status == "readHashtaglike") {
            HashtagInfo = await Hashtag.findOne({ _id: HashtagId }).lean();
            HashtagInfo = HashtagInfo.likeHashtag;
            let userInfo: any = await userDetails.find({ _id: { $in: HashtagInfo } })
            return userInfo
        }
        if (status == "readHashtagcomment") {
            let a = []
            HashtagInfo = await Hashtag.findOne({ _id: HashtagId }).lean();
            HashtagInfo = HashtagInfo.Hashtagcomment;
            for (let i = 0; i < HashtagInfo.length; i++) {
                let userInfo: any = await userDetails.findOne({ _id: HashtagInfo[i].userId }, { fullname: true })
                let comment = HashtagInfo[i].comment
                let DateTime: any = HashtagInfo[i].dateTime
    
                a.push({ userInfo, comment, DateTime })
            }
            return a
    
    
    
        } if (status == "readHashtagfav") {
            HashtagInfo = await Hashtag.findOne({ _id: HashtagId }).lean();
            HashtagInfo = HashtagInfo.likeHashtag;
            let userInfo: any = await userDetails.find({ _id: { $in: HashtagInfo } })
            return userInfo
        }
    }
}
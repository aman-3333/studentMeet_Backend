import Hashtag, { IHashtag } from "../models/Hashtag";
import event from "../models/event";
import UserActivity from "../models/userActivity"
import FuzzySearch from "fuzzy-search";
import userDetails from "../models/userDetails";
export default class HashtagController {

    public async createHashtag(body: any) {
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


public async HashtagActivity(userId: any, HashtagId: any, status: any, commentHashtag: any, commentHashtagId: any, body: any) {
        let userInfo: any;
        let data: any = []
        let a: any = []
        let info: any;

        userInfo = await UserActivity.findOne({ userId: userId }).lean();


        if (!userInfo) {
            userInfo = await UserActivity.create({userId: userId})
            console.log("userInfo61", userInfo);
        }
        console.log("userInfo", userInfo);

        if (status == "likeHashtag") {
            info = await UserActivity.findOne({ likeHashtag:{$in:body.likeHashtag} }).lean();
            console.log("info", info);

            if (!info) {
                userInfo = await UserActivity.findOneAndUpdate(
                    {
                        userId: userId,
                    },
                    {
                        $push: {
                            likeHashtag:
                                body.likeHashtag
                        }
                    })
                let HashtagInfo: any = await Hashtag.findOne({ _id: body.likeHashtag })
                console.log("HashtagInfo", HashtagInfo);
                HashtagInfo = HashtagInfo.likeCount
                HashtagInfo = HashtagInfo + 1
                await Hashtag.findOneAndUpdate({ _id: body.likeHashtag}, { $set: { likeCount: HashtagInfo } },{new:true})
                await Hashtag.findOneAndUpdate({
                    _id: body.likeHashtag
                }, {
                    $push: {
                        likeHashtag:
                            userId

                    }
                })
                return userInfo;
            }
        }
        if (status == "removelikeHashtag") {
            userInfo = await UserActivity.findOneAndUpdate(
                {
                    userId: userId,
                },
                {
                    $pull: {
                        likeHashtag
                       :body.likeHashtag
                    }
                })
               
            let HashtagInfo: any = await Hashtag.findOne({ _id: body.likeHashtag})
            console.log("HashtagInfo",HashtagInfo);


            HashtagInfo = HashtagInfo.likeCount
            HashtagInfo = HashtagInfo - 1
            await Hashtag.findOneAndUpdate({ _id: body.likeHashtag}, { $set: { likeCount: HashtagInfo } })
            await Hashtag.findOneAndUpdate({
                _id: body.likeHashtag
            }, {
                $pull: {
                    likeHashtag:
                    userId
                }
            })
            return userInfo;
        } if (status == "readlikeHashtag") {
            userInfo = await UserActivity.findOne({ userId: userId }).lean();
            userInfo = userInfo.likeHashtag;
         console.log("userInfo",userInfo);
         
                let HashtagInfo: any = await Hashtag.find({ _id:{$in:userInfo}})

           
            
            return HashtagInfo;
        }
      

        if (status == "favouriteHashtag") {
            info = await UserActivity.findOne({ favouriteHashtag:{$in:body.favouriteHashtag }}).lean();
            console.log("info", info);

            if (!info) {
                userInfo = await UserActivity.findOneAndUpdate(
                    {
                        userId: userId,
                    },
                    {
                        $push: {
                            favouriteHashtag:
                                body.favouriteHashtag
                        }
                    })
                let HashtagInfo: any = await Hashtag.findOne({ _id: body.favouriteHashtag })
                console.log("HashtagInfo", HashtagInfo);
                HashtagInfo = HashtagInfo.favoriteCount
                HashtagInfo = HashtagInfo + 1
                await Hashtag.findOneAndUpdate({ _id: body.favouriteHashtag}, { $set: { favoriteCount: HashtagInfo } },{new:true})
                await Hashtag.findOneAndUpdate({
                    _id: body.favouriteHashtag
                }, {
                    $push: {
                        favouriteHashtag:
                            userId

                    }
                })
                return userInfo;
            }
        }
        if (status == "removefavouriteHashtag") {
            userInfo = await UserActivity.findOneAndUpdate(
                {
                    userId: userId,
                },
                {
                    $pull: {
                        favouriteHashtag:
                        body.favouriteHashtag
                    }
                })
               
            let HashtagInfo: any = await Hashtag.findOne({ _id: body.favouriteHashtag})
            console.log("HashtagInfo",HashtagInfo);


            HashtagInfo = HashtagInfo.favoriteCount
            HashtagInfo = HashtagInfo - 1
            await Hashtag.findOneAndUpdate({ _id: {$in:body.favouriteHashtag} }, { $set: { favoriteCount: HashtagInfo } })
            await Hashtag.findOneAndUpdate({
                _id: body.favouriteHashtag
            }, {
                $pull: {
                    favouriteHashtag:
                   userId
                }
            })
            return userInfo;
        } if (status == "readfavouriteHashtag") {
            userInfo = await UserActivity.findOne({ userId: userId }).lean();
            userInfo = userInfo.favouriteHashtag;
         console.log("userInfo",userInfo);
         
                let HashtagInfo: any = await Hashtag.find({ _id:{$in:userInfo}})

           
            
            return HashtagInfo;
        }

        if (status == "commentHashtag") {
            let currentTime: any = new Date();;
     
                userInfo = await UserActivity.findOneAndUpdate(
                    {
                        userId: userId,
                    },
                    {
                        $push: {
                            commentHashtag: {
                                HashtagId: body.commentHashtag.HashtagId,
                                comment: body.commentHashtag.comment,
                                time: currentTime
                            }
                        }
                    })

                    await Hashtag.findOneAndUpdate(
                        {
                            _id: body.commentHashtag.HashtagId,
                        },
                        {
                            $push: {
                                commentHashtag: {
                                    userId: body.userId,
                                    comment: body.commentHashtag.comment,
                                    time: currentTime
                                }
                            }
                        })
                return userInfo;
            
        }
        if (status == "removecommentHashtag") {
            userInfo = await UserActivity.findOneAndUpdate(
                { _id: userId },
                { $pull: { commentHashtag: { HashtagId: HashtagId } } }
            );

            return userInfo;
        } if (status == "readcommentHashtag") {
            userInfo = await UserActivity.findOne({ userId: userId }).lean();
            userInfo = userInfo.commentHashtag;

            console.log("comment", userInfo);
            for (let i = 0; i < userInfo.length; i++) {
                let HashtagInfo: any = await Hashtag.findOne({ _id: userInfo[i].HashtagId })

                let comment: any = userInfo[i].comment
                let commentTime: any = userInfo[i].time

                data.push({ HashtagInfo, comment, commentTime })
            }
            return data;
        }
    }
    public async deleteHashtag(HashtagId: String, userId: any) {
        const HashtagInfo: IHashtag = await Hashtag.findOneAndUpdate({ _id: HashtagId, isDeleted: false }, { $set: { isDeleted: true, deletedPersonId: userId } }, { new: true }).lean();
        return HashtagInfo;
    }

    public async readHashtagActivity(hashtagId:any,status:any){
        let HashtagInfo:any
        if(status=="readHashtaglike"){
            HashtagInfo = await Hashtag.findOne({ _id: hashtagId }).lean();
            HashtagInfo = HashtagInfo.likeHashtag;
     
         
                let userInfo: any = await userDetails.find({ _id:{$in:HashtagInfo}})
          return userInfo
        }
        if(status=="readHashtagcomment"){
            HashtagInfo = await Hashtag.findOne({ _id: hashtagId }).lean();
            HashtagInfo = HashtagInfo.likeHashtag;
                let userInfo: any = await userDetails.find({ _id:{$in:HashtagInfo}})
          return userInfo
        }if(status=="readHashtagfav"){
            HashtagInfo = await Hashtag.findOne({ _id: hashtagId }).lean();
            HashtagInfo = HashtagInfo.likeHashtag;
                let userInfo: any = await userDetails.find({ _id:{$in:HashtagInfo}})
          return userInfo
        }
    }

}
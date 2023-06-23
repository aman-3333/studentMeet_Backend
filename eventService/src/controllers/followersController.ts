
import userActivity from "../models/userActivity"
import mongoose from 'mongoose';

var currentdate = new Date(); 
export default class followersController {
public async unfollowing(userId: any, followingId: any,roleId:any) {
    let userInfo: any;
    switch (roleId) {
        case 1:
            userInfo = await userActivity.findOne({ userFollowing: { $in: followingId } }).lean()
            if (userInfo) {
                userInfo = await userActivity.findOneAndUpdate({
                    userId: userId,
                }, {
                    $pull: {
                        userFollowing: followingId
                    }
                }).lean()
                await userActivity.findOneAndUpdate({
                    userId: followingId,
                }, {
                    $pull: {
                        userFollowers: userId
                    }
                }).lean()
        
                await userActivity.findOneAndUpdate({
                    userId: userId,
                },
                    { $inc: { followingCount: -1 } }).lean()
                await userActivity.findOneAndUpdate({
                    userId: followingId,
                },
                    { $inc: { followersCount: -1 } }).lean()
        
            }
          break;    
      }
    return userInfo
}
public async following(userId: any, followingId: any,roleId:any) {
    let userInfo: any;
    switch (roleId) {
        case 1:
            userInfo = await userActivity.findOne({ userFollowing: { $in: followingId } }).lean()
            if (!userInfo) {
                userInfo = await userActivity.findOneAndUpdate({
                    userId: userId,
                }, {
                    $push: {
                        userFollowing: followingId
                    }
                },{new:true}).lean()
                await userActivity.findOneAndUpdate({
                    userId: followingId,
                }, {
                    $push: {
                        userFollowers: userId
                    }
                },{new:true}).lean()
                await userActivity.findOneAndUpdate({
                    userId: userId,
                },
                    { $inc: { followingCount: 1 } }).lean()
                await userActivity.findOneAndUpdate({
                    userId: followingId,
                },
                    { $inc: { followersCount: 1 } }).lean()
            }
          break;
        
            userInfo = await userActivity.findOne({ following: { $in: followingId } }).lean()
            if (!userInfo) {
                userInfo = await userActivity.findOneAndUpdate({
                    userId: userId,
                }, {
                    $push: {
                        following: followingId
                    }
                }).lean()
                await userActivity.findOneAndUpdate({
                    userId: followingId,
                }, {
                    $push: {
                        followers: userId
                    }
                }).lean()
        
                await userActivity.findOneAndUpdate({
                    userId: userId,
                },
                    { $inc: { followingCount: 1 } }).lean()
                await userActivity.findOneAndUpdate({
                    userId: followingId,
                },
                    { $inc: { followersCount: 1 } }).lean()
        
            }
      }
    return userInfo
}

public async  getFollowers(userId:any){
   // let userInfo=await userActivity.findOne({ userId:userId }).populate("userFollowing").populate("brandFollowing")
    let userInfo=await userActivity.aggregate([{
         $match: {  userId: mongoose.Types.ObjectId(userId) } ,
   }])
    return userInfo
}


}
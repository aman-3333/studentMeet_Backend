
import userActivity from "../models/userActivity"
import mongoose from 'mongoose';
import userDetails from "../models/userDetails";

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

public async following(userId: any, followingId: any) {
    let userInfo: any;
    userInfo = await userDetails.findOne({_id:followingId,isDeleted:false }).lean()
    if(userInfo.isProfilePublic == true){
        userInfo = await userActivity.findOneAndUpdate({
            userId: userId,
        }, {
            $push: {
                userFollowing: followingId
            }
        }).lean()
        await userActivity.findOneAndUpdate({
            userId: followingId,
        }, {
            $push: {
                userFollowers: userId
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
    
else{

    userInfo = await userActivity.findOneAndUpdate({
        userId: userId,
    }, {
        $push: {
            sendFollowingRequest: followingId
        }
    }).lean()
    await userActivity.findOneAndUpdate({
        userId: followingId,
    }, {
        $push: {
            sendFollowingRequestBYOther: userId
        }
    }).lean()


}

    
            
          
      
        
            
            
      
    return userInfo


}


        
                
public async getFollowingRequest(userId:any){
    console.log(userId,"userId");
  let   userInfo = await userActivity.aggregate([{
   
    "$lookup": {
        "from": "userDetails",
        "localField": "sendFollowingRequestBYOther",
        "foreignField": "_id",
        "as": "userDetails"
      }
  }
   
])
  
  
  let followingInfo= await userDetails.findOne({_id:userId,isDeleted:false }).populate("userFollowers")

  //logic for 
//   const commonValues = [...set1].filter(value => set2.has(value));


return userInfo
}




public async  getFollowers(userId:any){
   // let userInfo=await userActivity.findOne({ userId:userId }).populate("userFollowing").populate("brandFollowing")
    let userInfo=await userActivity.aggregate([{
         $match: {  userId: mongoose.Types.ObjectId(userId) } ,
   }])
    return userInfo
}


public async  getFollowing(userId:any){
    // let userInfo=await userActivity.findOne({ userId:userId }).populate("userFollowing").populate("brandFollowing")
     let userInfo=await userActivity.aggregate([{
          $match: {  userId: mongoose.Types.ObjectId(userId) } ,
    }])
     return userInfo
 }






 


}

import userActivity from "../models/userActivity"
import userDetails from "../models/userDetails";
import academyModel from "../models/academy";
import sponsorshipDetails from "../models/sponsorshipDetails";
import school from "../models/school";
import { sendNotification } from "../services/notification";
const mongoose = require("mongoose");
var currentdate = new Date(); 
export default class followersController {



public async following(userId: any, followingId: any,userType:any) {
    let plusOne=1;
    let userInfo: any;
    userInfo = await userDetails.aggregate([{
        $match:{
            _id:new mongoose.Types.ObjectId(followingId), isDeleted: false,
        },
     
    },
    {
        $lookup: {
          localField: "_id",
          from: "userdevices",
          foreignField: "userId",
          as: "userDevicesObj",
        },
      },
      { $unwind: { path: '$userDevicesObj', preserveNullAndEmptyArrays: true } },

])

let  userData = await userDetails.findOne({_id:userId,isDeleted:false})

    if(userType=="user"  ){

    if(userInfo[0].isProfilePublic == true){

       await userActivity.updateOne({ userId: userId},
            {
              $push: { userFollowing: followingId,allOverFollowing:followingId }, 
              $inc: { followingCount: 1 } 
            }),
          
           await userActivity.updateOne({ userId: followingId},
                {
                  $push: { userFollowers: userId }, 
                  $inc: { followersCount: 1 } 
                })
const body = `${userData.fullName} is starting following you`
                sendNotification(userInfo[0].userDevicesObj.fcmtoken,body,"abc","school_home","followersData[i]","65280dd8b19d1481f3324956",userData._id);
    }
if(userInfo[0].isProfilePublic == false){

    userInfo = await userActivity.findOneAndUpdate({
        userId: userId,
    }, {
        $push: {
            sendFollowingRequest: followingId
        }
    },{new:true}).lean()
    await userActivity.findOneAndUpdate({
        userId: followingId,
    }, {
        $push: {
            sendFollowingRequestBYOther: userId
        }
    },{new:true}).lean()


}
    }
    if(userType=="academy"){

     userInfo = await userActivity.updateOne({ userId: userId},
            
        {
          $push: { academyFollowing: followingId,allOverFollowing:followingId }, 
          $inc: { academyFollowingCount: 1 } 
        }),
           
  

            await academyModel.findOneAndUpdate({
                _id: followingId,
            }, {
                $push: {
                    followers: userId
                }
            },{new:true}).lean()

  return userInfo
    }
        if(userType=="sponsor"){
            userInfo = await userActivity.updateOne({ userId: userId},
                {
                  $push: { sponsorshipFollowing: followingId,allOverFollowing:followingId }, 
                  $inc: { sponsorshipFollowingCount: 1 } 
                }),
                   
          
        
                    await sponsorshipDetails.findOneAndUpdate({
                        _id: followingId,
                    }, {
                        $push: {
                            followers: userId
                        }
                    },{new:true}).lean()
            
       
            } 
            if(userType=="school"){
                userInfo = await userActivity.updateOne({ userId: userId},
                    {
                      $push: { schoolFollowing: followingId,allOverFollowing:followingId }, 
                      $inc: { schoolFollowingCount: 1 } 
                    }),
                       
              
            
                        await school.findOneAndUpdate({
                            _id: followingId,
                        }, {
                            $push: {
                                followers: userId
                            }
                        },{new:true}).lean()
                
           
                }   
    return userInfo

        }


public async removefollowing(userId: any, followingId: any,userType:any) {
    let userInfo: any;
   let minus =-1

    if(userType=="user" ){
 
        userInfo = await userActivity.updateOne({ userId: userId},
            
            {
              $pull: { userFollowing: followingId }, 
              $inc: { followingCount: -1 } 
            }),
       
            userInfo = await userActivity.updateOne({ userId: followingId},
            
                {
                  $pull: { userFollowers: userId }, 
                  $inc: { followersCount: -1 } 
                })
            

 

    
    

    }
    if(userType=="academy")
    {

        userInfo = await userActivity.updateOne({ userId: userId},
            
            {
              $pull: { academyFollowing: followingId }, 
              $inc: { academyFollowingCount: -1 } 
            })

            await academyModel.findOneAndUpdate({ _id: followingId},
            
                {
                  $pull: { followers: userId }, 
                 
                })

              

                
                

        }
       
        if(userType=="school"){
            userInfo = await userActivity.updateOne({ userId: userId},
            
                {
                  $pull: { schoolFollowing: followingId }, 
                  $inc: { schoolFollowingCount: -1 } 
                })
            }   
    
    
            await school.updateOne({ _id: followingId},
            
                {
                  $pull: { followers: userId }, 
                  $inc: { followersCount: -1 } 
                })
    
         
    
        
        
   
        
        if(userType=="sponsorship"){
            userInfo = await userActivity.updateOne({ userId: userId},
            
                {
                  $pull: { sponsorshipFollowing: followingId }, 
                  $inc: { sponsorshipFollowingCount: -1 } 
                })


                await sponsorshipDetails.updateOne({ _id: followingId},
            
                    {
                      $pull: { followers: userId }, 
                      $inc: { followersCount: -1 } 
                    })

            }       
    return userInfo
}


public async removefollowers(userId: any, followingId: any,userType:any) {
    let userInfo: any;
   let minus =-1

    if(userType=="user" ){
 
        userInfo = await userActivity.updateOne({ userId: userId},
            
            {
              $pull: { userFollowers: followingId }, 
              $inc: { followersCount: -1 } 
            })
    }
    if(userType=="academy")
    {

        userInfo = await userActivity.updateOne({ userId: userId},
            
            {
              $pull: { academyFollowers: followingId }, 
              $inc: { academyFollowersCount: -1 } 
            })

            await academyModel.findOneAndUpdate({ _id: followingId},
            
                {
                  $pull: { following: userId }, 
                 
                })

              

                
                

        }
       
        if(userType=="school"){
            userInfo = await userActivity.updateOne({ userId: userId},
            
                {
                  $pull: { schoolFollowers: followingId }, 
                  $inc: { schoolFollowersCount: -1 } 
                })
            }   
    
    
            await school.updateOne({ _id: followingId},
            
                {
                  $pull: { following: userId }, 
                  $inc: { followingCount: -1 } 
                })
    
         
    
        
        
   
        
        if(userType=="sponsorship"){
            userInfo = await userActivity.updateOne({ userId: userId},
            
                {
                  $pull: { sponsorshipFollowers: followingId }, 
                  $inc: { sponsorshipFollowersCount: -1 } 
                })


                await sponsorshipDetails.updateOne({ _id: followingId},
            
                    {
                      $pull: { following: userId }, 
                      $inc: { followingCount: -1 } 
                    })

            }       
    return userInfo
}



public async getFollowingRequestByOther(userId:any){
    let data:any=[]
  let  userActivityInfo:any = await userActivity.findOne({userId:userId,isDeleted:false }).lean()

  
for (let i = 0; i < userActivityInfo.sendFollowingRequestBYOther.length; i++) {
    let  userInfo = await userDetails.findOne({_id:userActivityInfo.sendFollowingRequestBYOther[i],isDeleted:false }).lean()
    data.push(userInfo)
    
}

 

return data
 }
        
   
 public async acceptOrRejectFollowingRequest(userId:any,followingId:any,status:any){
    let data:any=[]
let userInfo:any;
    if(status=="acceptRequest"){
        userInfo = await userActivity.findOneAndUpdate({
            userId: userId,
        }, {
            $push: {
                userFollowers: followingId
                
            }
        }).lean()
        await userActivity.findOneAndUpdate({
            userId: followingId,
        }, {
            $push: {
                userFollowing: userId
            }
        }).lean()
        await userActivity.findOneAndUpdate({
            userId: followingId,
        },
            { $inc: { followingCount: 1 } }).lean()


              
            await userActivity.findOneAndUpdate({
                userId: userId,
            },
                { $inc: { followersCount: 1 } }).lean()
 
    }
    
    await userActivity.findOneAndUpdate({
        userId: userId,
    }, {
        $pull: {
            sendFollowingRequestBYOther: followingId
        }
    }).lean()
  

return data
 }







public async  getFollowers(userId:any,userType:any){
    let data:any =[]
    let userInfo:any=await userActivity.findOne({ userId:userId }).lean()

    if(userType=="academy"){
        console.log("hello")
        for (let i = 0; i < userInfo.academyFollowers.length; i++) {
            console.log(userInfo.academyFollowers)
            let academyFollowers=await academyModel.findOne({_id:userInfo.academyFollowers[i]}).lean()
            data.push(academyFollowers)
            
           }
    
    }
    if(userType=="sponsorship"){
        for (let i = 0; i < userInfo.sponsorshipFollowers.length; i++) {
            let sponsorshipFollowers=await sponsorshipDetails.findOne({_id:userInfo.sponsorshipFollowers[i],isDeleted:false}).lean()
            data.push(sponsorshipFollowers)
            
           }

    
    }

    if(userType=="school"){
        for (let i = 0; i < userInfo.schoolFollowers.length; i++) {
            let schoolFollowers=await school.findOne({_id:userInfo.schoolFollowers[i],isDeleted:false}).lean()
            data.push(schoolFollowers)
            
           }

    
    }
    if(userType=="user"){
        for (let i = 0; i < userInfo.userFollowers.length; i++) {
            let userFollowers=await userDetails.findOne({_id:userInfo.userFollowers[i],isDeleted:false})
            data.push(userFollowers)
           }
    }
   
   
    return data
}


public async  getFollowing(userId:any,userType:any){
    let data:any =[]
    let userInfo:any=await userActivity.findOne({ userId:userId })
 

  
    if(userType=="academy"){
        for (let i = 0; i < userInfo.academyFollowing.length; i++) {
            let academyFollowing=await academyModel.findOne({_id:userInfo.academyFollowing[i]}).lean()
            data.push(academyFollowing)
            
           }
      
    }
    if(userType=="sponsorship"){
        for (let i = 0; i < userInfo.sponsorshipFollowing.length; i++) {
            let sponsorshipFollowing=await sponsorshipDetails.findOne({_id:userInfo.sponsorshipFollowing[i],isDeleted:false}).lean()
            data.push(sponsorshipFollowing)
            
           }
    
    }

    if(userType=="school"){
        for (let i = 0; i < userInfo.schoolFollowing.length; i++) {
            let schoolFollowers=await school.findOne({_id:userInfo.schoolFollowing[i],isDeleted:false}).lean()
            data.push(schoolFollowers)
            
           }

    
    }
    if(userType=="user"){
      
           for (let i = 0; i < userInfo.userFollowing.length; i++) {
            let userFollowing=await userDetails.findOne({_id:userInfo.userFollowing[i],isDeleted:false})
            data.push(userFollowing)
           }

    
    }
  

    return data
}


}
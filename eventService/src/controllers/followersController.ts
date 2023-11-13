
import userActivity from "../models/userActivity"
import mongoose from 'mongoose';
import userDetails from "../models/userDetails";
import academyModel from "../models/academy";
import sponsorshipDetails from "../models/sponsorshipDetails";
import school from "../models/school";

var currentdate = new Date(); 
export default class followersController {



public async following(userId: any, followingId: any,userType:any) {
    let plusOne=1;
    let userInfo: any;
    userInfo = await userDetails.findOne({_id:followingId,isDeleted:false }).lean()
console.log(userInfo);


    if(userType=="user"  ){
    if(userInfo.isProfilePublic == true){

        userInfo = await userActivity.updateOne({ userId: userId},
            {
              $push: { userFollowing: followingId,allOverFollowing:followingId }, 
              $inc: { followingCount: 1 } 
            }),
            console.log(userInfo,"userInfo");
            userInfo = await userActivity.updateOne({ userId: followingId},
                {
                  $push: { userFollowers: userId }, 
                  $inc: { followersCount: 1 } 
                })
    }
if(userInfo.isProfilePublic == false){

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


public async unfollowing(userId: any, followingId: any,userType:any) {
    let userInfo: any;
    userInfo = await userDetails.findOne({_id:followingId,isDeleted:false }).lean()

    if(userType=="normal" ||  userType=="coach" ){
 
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
    if(userType=="academy"){
     console.log("hello")
            userInfo = await userActivity.findOneAndUpdate({
                userId: userId,
            }, {
                $pull: {
                    academyFollowing: followingId
                }
            },{new:true}).lean()
            await userActivity.findOneAndUpdate({
                userId: followingId,
            }, {
                $pull: {
                    userFollowers: userId
                }
            },{new:true}).lean()
            await userActivity.findOneAndUpdate({
                userId: userId,
            },
                { $inc: { followingCount: -1 } },{new:true}).lean()
    
    
                  
                await userActivity.findOneAndUpdate({
                    userId: followingId,
                },
                    { $inc: { followersCount: -1 } },{new:true}).lean()
    
        
        
   
        }
        if(userType=="sponsorship"){
            if(userInfo.isProfilePublic == true){
                userInfo = await userActivity.findOneAndUpdate({
                    userId: userId,
                }, {
                    $pull: {
                        userFollowing: followingId
                    }
                },{new:true}).lean()
                await userActivity.findOneAndUpdate({
                    userId: followingId,
                }, {
                    $pull: {
                        userFollowers: userId
                    }
                },{new:true}).lean()
                await userActivity.findOneAndUpdate({
                    userId: userId,
                },
                    { $inc: { followingCount: -1 } },{new:true}).lean()
        
        
                      
                    await userActivity.findOneAndUpdate({
                        userId: followingId,
                    },
                        { $inc: { followersCount: -1 } },{new:true}).lean()
        
            }
            
       
            }

    
            
          
      
        
            
            
      
    return userInfo


}

public async getFollowingRequestByOther(userId:any){
    let data:any=[]
  let  userActivityInfo:any = await userActivity.findOne({userId:userId,isDeleted:false }).lean()
  console.log(userActivityInfo.sendFollowingRequestBYOther);
  
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
       
        for (let i = 0; i < userInfo.academyFollowers.length; i++) {
            let academyFollowers=await academyModel.findOne({_id:userInfo.academyFollowers[i]}).lean()
            data.push(academyFollowers)
            
           }
    
    }
    if(userType=="sponsorship"){
        for (let i = 0; i < userInfo.brandFollowers.length; i++) {
            let brandFollowers=await sponsorshipDetails.findOne({_id:userInfo.brandFollowers[i],isDeleted:false}).lean()
            data.push(brandFollowers)
            
           }

    
    }
    else{
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
        for (let i = 0; i < userInfo.brandFollowing.length; i++) {
            let brandFollowing=await sponsorshipDetails.findOne({_id:userInfo.brandFollowing[i],isDeleted:false}).lean()
            data.push(brandFollowing)
            
           }
    
    }
    else{
        for (let i = 0; i < userInfo.academyFollowing.length; i++) {
            let academyFollowing=await academyModel.findOne({_id:userInfo.academyFollowing[i]}).lean()
            data.push(academyFollowing)
            
           }
      
    }
   
    return data
}


















 


}
import Post, { IPost } from "../models/post";
import userActivity from "../models/userActivity";
import userDetails from "../models/userDetails";
import FuzzySearch from "fuzzy-search";
import event from "../models/sponsorshipDetails";
import academy from "../models/academy";
import sponsorPartner from "../models/sponsorPartner";
import { sendNotification } from "../services/notification";
import userDevice from "../models/userDevice";
const mongoose = require("mongoose");
const currentTime: any = new Date();
export default class PostController {
  public async createPost(body: any) {
    let PostInfo: any;

if(body.academyId){
  body.postUserType ="academy"
}
if(body.sponsorId){
  body.postUserType ="sponsor"
}
if(body.schoolId){
  body.postUserType ="school"
}
if(body.userId){
  body.postUserType ="user"
}


    PostInfo = await Post.create(body);
    // let userInfo:any=await userDetails.findOne({_id:body.userId,isDeleted:false}).lean()
    // await Post.findOneAndUpdate({_id:PostInfo._id},{$set:{userName:userInfo.fullname}})

    return PostInfo;
  }

  public async editPost(body: any) {
    const PostInfo: any = await Post.findOneAndUpdate(
      { _id: body._id, isDeleted: false },
      body,
      { new: true }
    ).lean();
    return PostInfo;
  }

  public async getPostList(user: any,index:any) {
const indexData = parseInt(index) -1;
    let PostLike = await Post.aggregate([
   
      {
        $sort: {
          createdAt: -1
        }
      },
      { $skip:  50 * indexData },
      { $limit: 50},
      { $match: { isDeleted: false  } },
      {
        $lookup: {
          localField: "userId",
          from: "userdetails",
          foreignField: "_id",
          as: "user",
        },
      },
      { $unwind: { path: "$user", preserveNullAndEmptyArrays: true } },
      {
        $lookup: {
          localField: "academyId",
          from: "academies",
          foreignField: "_id",
          as: "academyObj",
        },
      },
      { $unwind: { path: "$academyObj", preserveNullAndEmptyArrays: true } },
      {
        $lookup: {
          localField: "sponsorId",
          from: "sponsor_partners",
          foreignField: "_id",
          as: "sponsorshipObj",
        },
      },
      {
        $unwind: { path: "$sponsorshipObj", preserveNullAndEmptyArrays: true },
      },
      {
        $lookup: {
          localField: "state",
          from: "states",
          foreignField: "_id",
          as: "state",
        },
      },
      { $unwind: { path: "$state", preserveNullAndEmptyArrays: true } },
      {
        $lookup: {
          localField: "city",
          from: "cities",
          foreignField: "_id",
          as: "city",
        },
      },
      { $unwind: { path: "$city", preserveNullAndEmptyArrays: true } },
      {
        $lookup: {
          localField: "country",
          from: "countries",
          foreignField: "_id",
          as: "country",
        },
      },
      { $unwind: { path: "$country", preserveNullAndEmptyArrays: true } },
      {
        $lookup: {
          localField: "instituteId",
          from: "institutes",
          foreignField: "_id",
          as: "institutes",
        },
      },
      { $unwind: { path: "$institutes", preserveNullAndEmptyArrays: true } },
      {
        $lookup: {
          localField: "schoolId",
          from: "schools",
          foreignField: "_id",
          as: "school",
        },
      },
      { $unwind: { path: "$school", preserveNullAndEmptyArrays: true } },
     

      {
        $addFields: {
          formattedCreatedAt: {
            $let: {
              vars: {
                timeDifferenceMillis: {
                  $subtract: [new Date(), "$createdAt"]
                }
              },
              in: {
                $cond: {
                  if: {
                    $lt: ["$$timeDifferenceMillis", 60000] // Less than 1 minute
                  },
                  then: { $concat: [{ $toString: { $trunc: { $divide: ["$$timeDifferenceMillis", 1000] } } }, "s "] },
                  else: {
                    $cond: {
                      if: { $lt: ["$$timeDifferenceMillis", 3600000] }, // Less than 1 hour
                      then: { $concat: [{ $toString: { $trunc: { $divide: ["$$timeDifferenceMillis", 60000] } } }, "m "] },
                      else: {
                        $cond: {
                          if: { $lt: ["$$timeDifferenceMillis", 86400000] }, // Less than 1 day
                          then: { $concat: [{ $toString: { $trunc: { $divide: ["$$timeDifferenceMillis", 3600000] } } }, "h "] },
                          else: {
                            $cond: {
                              if: { $lt: ["$$timeDifferenceMillis", 2592000000] }, // Less than 30 days (approximating to 30 days as 1 month)
                              then: { $concat: [{ $toString: { $trunc: { $divide: ["$$timeDifferenceMillis", 86400000] } } }, "d "] },
                              else: {
                                $cond: {
                                  if: { $lt: ["$$timeDifferenceMillis", 31536000000] }, // Less than 365 days (approximating to 365 days as 1 year)
                                  then: { $concat: [{ $toString: { $trunc: { $divide: ["$$timeDifferenceMillis", 2592000000] } } }, "mo "] },
                                  else: { $concat: [{ $toString: { $trunc: { $divide: ["$$timeDifferenceMillis", 31536000000] } } }, "y "] }
                                }
                              }
                            }
                          }
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    ]);

  
let userData:any = await userActivity.findOne({userId:user._id})
    PostLike.forEach((val: any) => {
      val.isLikes = false;
      val.isFollow = false;
      if (val.postUserType=="user") {
        val.ownerId = val.userId;
        val.ownerPic=val.user&&val.user.profile_picture?val.user.profile_picture:"";
        val.ownerName=val.user&&val.user.fullName?val.user.fullName:"";
      }
      if (val.postUserType=="school") {
        val.ownerId = val.schoolId;
        val.ownerPic=val.school&&val.school.profilePicture?val.school.profilePicture:"";
        val.ownerName=val.school&&val.school.schoolName?val.school.schoolName:"";
      }
      if (val.postUserType=="sponsor") {
        val.ownerId = val.sponsorId;
        val.ownerPic=val.sponsorshipObj&&val.sponsorshipObj.companyLogo?val.sponsorshipObj.companyLogo:"";
        val.ownerName=val.sponsorshipObj&&val.sponsorshipObj.companyName?val.sponsorshipObj.companyName:"";
      }
      if (val.postUserType=="academy") {
        val.ownerId = val.academyId;
        val.ownerPic=val.academyObj&&val.academyObj.profile_picture?val.academyObj.profile_picture:"";
        val.ownerName=val.academyObj&&val.academyObj.academyName?val.academyObj.academyName:"";
      }
  if (val.postLike.length >0 && val.postLike.toString().includes(user._id.toString())) {
    val.isLikes = true;
  } 
  if (userData.allOverFollowing.length >0 && userData.allOverFollowing.toString().includes(val.ownerId)) {
    val.isFollow= true;
  }

    });

    return PostLike;
  }





  public async getPostListSchool(schoolId: any,index:any) {
    const indexData = parseInt(index) -1;
    let PostLike = await Post.aggregate([
      { $match: { isDeleted: false, schoolId:new mongoose.Types.ObjectId(schoolId)  } },
      {
        $sort: {
          createdAt: -1
        }
      },
      { $skip:  50 * indexData },
      { $limit: 50},
      {
        $lookup: {
          localField: "state",
          from: "states",
          foreignField: "_id",
          as: "state",
        },
      },
      { $unwind: { path: "$state", preserveNullAndEmptyArrays: true } },
      {
        $lookup: {
          localField: "city",
          from: "cities",
          foreignField: "_id",
          as: "city",
        },
      },
      { $unwind: { path: "$city", preserveNullAndEmptyArrays: true } },
      {
        $lookup: {
          localField: "country",
          from: "countries",
          foreignField: "_id",
          as: "country",
        },
      },
      { $unwind: { path: "$country", preserveNullAndEmptyArrays: true } },
      {
        $addFields: {
          formattedCreatedAt: {
            $let: {
              vars: {
                timeDifferenceMillis: {
                  $subtract: [new Date(), "$createdAt"]
                }
              },
              in: {
                $cond: {
                  if: {
                    $lt: ["$$timeDifferenceMillis", 60000] // Less than 1 minute
                  },
                  then: { $concat: [{ $toString: { $trunc: { $divide: ["$$timeDifferenceMillis", 1000] } } }, "s "] },
                  else: {
                    $cond: {
                      if: { $lt: ["$$timeDifferenceMillis", 3600000] }, // Less than 1 hour
                      then: { $concat: [{ $toString: { $trunc: { $divide: ["$$timeDifferenceMillis", 60000] } } }, "m "] },
                      else: {
                        $cond: {
                          if: { $lt: ["$$timeDifferenceMillis", 86400000] }, // Less than 1 day
                          then: { $concat: [{ $toString: { $trunc: { $divide: ["$$timeDifferenceMillis", 3600000] } } }, "h "] },
                          else: {
                            $cond: {
                              if: { $lt: ["$$timeDifferenceMillis", 2592000000] }, // Less than 30 days (approximating to 30 days as 1 month)
                              then: { $concat: [{ $toString: { $trunc: { $divide: ["$$timeDifferenceMillis", 86400000] } } }, "d "] },
                              else: {
                                $cond: {
                                  if: { $lt: ["$$timeDifferenceMillis", 31536000000] }, // Less than 365 days (approximating to 365 days as 1 year)
                                  then: { $concat: [{ $toString: { $trunc: { $divide: ["$$timeDifferenceMillis", 2592000000] } } }, "mo "] },
                                  else: { $concat: [{ $toString: { $trunc: { $divide: ["$$timeDifferenceMillis", 31536000000] } } }, "y "] }
                                }
                              }
                            }
                          }
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
     
    ]);
 

   

    return PostLike;
  }



  public async getPostListAcademy(academyId: any,index:any) {
    const indexData = parseInt(index) -1;
    let PostLike = await Post.aggregate([
      { $match: { isDeleted: false, academyId: academyId } },
      {
        $sort: {
          createdAt: -1
        }
      },
      { $skip:  50 * indexData },
      { $limit: 50},
      {
        $lookup: {
          localField: "userId",
          from: "userdetails",
          foreignField: "_id",
          as: "user",
        },
      },
      { $unwind: { path: "$user", preserveNullAndEmptyArrays: true } },
      {
        $lookup: {
          localField: "academyId",
          from: "academies",
          foreignField: "_id",
          as: "academyObj",
        },
      },
      { $unwind: { path: "$academyObj", preserveNullAndEmptyArrays: true } },
      {
        $lookup: {
          localField: "sponsorId",
          from: "sponsorshipdetails",
          foreignField: "_id",
          as: "sponsorshipObj",
        },
      },
      {
        $unwind: { path: "$sponsorshipObj", preserveNullAndEmptyArrays: true },
      },
      {
        $lookup: {
          localField: "state",
          from: "states",
          foreignField: "_id",
          as: "state",
        },
      },
      { $unwind: { path: "$state", preserveNullAndEmptyArrays: true } },
      {
        $lookup: {
          localField: "city",
          from: "cities",
          foreignField: "_id",
          as: "city",
        },
      },
      { $unwind: { path: "$city", preserveNullAndEmptyArrays: true } },
      {
        $lookup: {
          localField: "country",
          from: "countries",
          foreignField: "_id",
          as: "country",
        },
      },
      { $unwind: { path: "$country", preserveNullAndEmptyArrays: true } },
      {
        $lookup: {
          localField: "instituteId",
          from: "institutes",
          foreignField: "_id",
          as: "institutes",
        },
      },
      { $unwind: { path: "$institutes", preserveNullAndEmptyArrays: true } },
      {
        $lookup: {
          localField: "schoolId",
          from: "schools",
          foreignField: "_id",
          as: "school",
        },
      },
      { $unwind: { path: "$school", preserveNullAndEmptyArrays: true } },
      {
        $lookup: {
          localField: "_id",
          from: "states",
          foreignField: "state",
          as: "state",
        },
      },
      { $unwind: { path: "$state", preserveNullAndEmptyArrays: true } },
      {
        $addFields: {
          formattedCreatedAt: {
            $let: {
              vars: {
                timeDifferenceMillis: {
                  $subtract: [new Date(), "$createdAt"]
                }
              },
              in: {
                $cond: {
                  if: {
                    $lt: ["$$timeDifferenceMillis", 60000] // Less than 1 minute
                  },
                  then: { $concat: [{ $toString: { $trunc: { $divide: ["$$timeDifferenceMillis", 1000] } } }, "s "] },
                  else: {
                    $cond: {
                      if: { $lt: ["$$timeDifferenceMillis", 3600000] }, // Less than 1 hour
                      then: { $concat: [{ $toString: { $trunc: { $divide: ["$$timeDifferenceMillis", 60000] } } }, "m "] },
                      else: {
                        $cond: {
                          if: { $lt: ["$$timeDifferenceMillis", 86400000] }, // Less than 1 day
                          then: { $concat: [{ $toString: { $trunc: { $divide: ["$$timeDifferenceMillis", 3600000] } } }, "h "] },
                          else: {
                            $cond: {
                              if: { $lt: ["$$timeDifferenceMillis", 2592000000] }, // Less than 30 days (approximating to 30 days as 1 month)
                              then: { $concat: [{ $toString: { $trunc: { $divide: ["$$timeDifferenceMillis", 86400000] } } }, "d "] },
                              else: {
                                $cond: {
                                  if: { $lt: ["$$timeDifferenceMillis", 31536000000] }, // Less than 365 days (approximating to 365 days as 1 year)
                                  then: { $concat: [{ $toString: { $trunc: { $divide: ["$$timeDifferenceMillis", 2592000000] } } }, "mo "] },
                                  else: { $concat: [{ $toString: { $trunc: { $divide: ["$$timeDifferenceMillis", 31536000000] } } }, "y "] }
                                }
                              }
                            }
                          }
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    ]);
 

   

    return PostLike;
  }
  

  
  public async getPostListSponsor(sponsorId: any,index:any) {
    const indexData = parseInt(index) -1;
    let PostLike = await Post.aggregate([
      { $match: { isDeleted: false, sponsorId: sponsorId } },
      {
        $sort: {
          createdAt: -1
        }
      },
      { $skip:  50 * indexData },
      { $limit: 50},
      {
        $lookup: {
          localField: "userId",
          from: "userdetails",
          foreignField: "_id",
          as: "user",
        },
      },
      { $unwind: { path: "$user", preserveNullAndEmptyArrays: true } },
      {
        $lookup: {
          localField: "academyId",
          from: "academies",
          foreignField: "_id",
          as: "academyObj",
        },
      },
      { $unwind: { path: "$academyObj", preserveNullAndEmptyArrays: true } },
      {
        $lookup: {
          localField: "sponsorId",
          from: "sponsorshipdetails",
          foreignField: "_id",
          as: "sponsorshipObj",
        },
      },
      {
        $unwind: { path: "$sponsorshipObj", preserveNullAndEmptyArrays: true },
      },
      {
        $lookup: {
          localField: "state",
          from: "states",
          foreignField: "_id",
          as: "state",
        },
      },
      { $unwind: { path: "$state", preserveNullAndEmptyArrays: true } },
      {
        $lookup: {
          localField: "city",
          from: "cities",
          foreignField: "_id",
          as: "city",
        },
      },
      { $unwind: { path: "$city", preserveNullAndEmptyArrays: true } },
      {
        $lookup: {
          localField: "country",
          from: "countries",
          foreignField: "_id",
          as: "country",
        },
      },
      { $unwind: { path: "$country", preserveNullAndEmptyArrays: true } },
      {
        $lookup: {
          localField: "instituteId",
          from: "institutes",
          foreignField: "_id",
          as: "institutes",
        },
      },
      { $unwind: { path: "$institutes", preserveNullAndEmptyArrays: true } },
      {
        $lookup: {
          localField: "schoolId",
          from: "schools",
          foreignField: "_id",
          as: "school",
        },
      },
      { $unwind: { path: "$school", preserveNullAndEmptyArrays: true } },
      {
        $lookup: {
          localField: "_id",
          from: "states",
          foreignField: "state",
          as: "state",
        },
      },
      { $unwind: { path: "$state", preserveNullAndEmptyArrays: true } },
      {
        $addFields: {
          formattedCreatedAt: {
            $let: {
              vars: {
                timeDifferenceMillis: {
                  $subtract: [new Date(), "$createdAt"]
                }
              },
              in: {
                $cond: {
                  if: {
                    $lt: ["$$timeDifferenceMillis", 60000] // Less than 1 minute
                  },
                  then: { $concat: [{ $toString: { $trunc: { $divide: ["$$timeDifferenceMillis", 1000] } } }, "s "] },
                  else: {
                    $cond: {
                      if: { $lt: ["$$timeDifferenceMillis", 3600000] }, // Less than 1 hour
                      then: { $concat: [{ $toString: { $trunc: { $divide: ["$$timeDifferenceMillis", 60000] } } }, "m "] },
                      else: {
                        $cond: {
                          if: { $lt: ["$$timeDifferenceMillis", 86400000] }, // Less than 1 day
                          then: { $concat: [{ $toString: { $trunc: { $divide: ["$$timeDifferenceMillis", 3600000] } } }, "h "] },
                          else: {
                            $cond: {
                              if: { $lt: ["$$timeDifferenceMillis", 2592000000] }, // Less than 30 days (approximating to 30 days as 1 month)
                              then: { $concat: [{ $toString: { $trunc: { $divide: ["$$timeDifferenceMillis", 86400000] } } }, "d "] },
                              else: {
                                $cond: {
                                  if: { $lt: ["$$timeDifferenceMillis", 31536000000] }, // Less than 365 days (approximating to 365 days as 1 year)
                                  then: { $concat: [{ $toString: { $trunc: { $divide: ["$$timeDifferenceMillis", 2592000000] } } }, "mo "] },
                                  else: { $concat: [{ $toString: { $trunc: { $divide: ["$$timeDifferenceMillis", 31536000000] } } }, "y "] }
                                }
                              }
                            }
                          }
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    ]);
    return PostLike;
  }




  public async getPostInfoById(postId:any) {
      const PostList: IPost[] = await Post.findOne({_id:postId, isDeleted: false }).lean();
      return PostList;
  }



  public async getPostListBYUserId(userId: any,currentUser:any,index:any) {
    const indexData = parseInt(index) -1;
    console.log(currentUser,"currentUser")
    if(userId==currentUser._id){
      let PostInfo: any = await Post.aggregate([
        {
          $match: {
            userId: new mongoose.Types.ObjectId(userId),
          },
        },
        {
          $sort: {
            createdAt: -1
          }
        },
        { $skip:  50 * indexData },
        { $limit: 50},
        {
          $lookup: {
            localField: "city",
            from: "cities",
            foreignField: "_id",
            as: "city",
          },
        },
      
        { $unwind: { path: '$city', preserveNullAndEmptyArrays: true } },
        {
          $lookup: {
            localField: "state",
            from: "states",
            foreignField: "_id",
            as: "state",
          },
        },
        { $unwind: { path: '$state', preserveNullAndEmptyArrays: true } },
        {
          $lookup: {
            localField: "country",
            from: "countries",
            foreignField: "_id",
            as: "country",
          },

        },
        { $unwind: { path: '$country', preserveNullAndEmptyArrays: true } },
        {
          $lookup: {
            localField: "userId",
            from: "userdetails",
            foreignField: "_id",
            as: "user",
          },
        },
        { $unwind: { path: '$user', preserveNullAndEmptyArrays: true } },
        {
          $addFields: {
            isEditable: true
          }
        },
        {
          $addFields: {
            formattedCreatedAt: {
              $let: {
                vars: {
                  timeDifferenceMillis: {
                    $subtract: [new Date(), "$createdAt"]
                  }
                },
                in: {
                  $cond: {
                    if: {
                      $lt: ["$$timeDifferenceMillis", 60000] // Less than 1 minute
                    },
                    then: { $concat: [{ $toString: { $trunc: { $divide: ["$$timeDifferenceMillis", 1000] } } }, "s "] },
                    else: {
                      $cond: {
                        if: { $lt: ["$$timeDifferenceMillis", 3600000] }, // Less than 1 hour
                        then: { $concat: [{ $toString: { $trunc: { $divide: ["$$timeDifferenceMillis", 60000] } } }, "m "] },
                        else: {
                          $cond: {
                            if: { $lt: ["$$timeDifferenceMillis", 86400000] }, // Less than 1 day
                            then: { $concat: [{ $toString: { $trunc: { $divide: ["$$timeDifferenceMillis", 3600000] } } }, "h "] },
                            else: {
                              $cond: {
                                if: { $lt: ["$$timeDifferenceMillis", 2592000000] }, // Less than 30 days (approximating to 30 days as 1 month)
                                then: { $concat: [{ $toString: { $trunc: { $divide: ["$$timeDifferenceMillis", 86400000] } } }, "d "] },
                                else: {
                                  $cond: {
                                    if: { $lt: ["$$timeDifferenceMillis", 31536000000] }, // Less than 365 days (approximating to 365 days as 1 year)
                                    then: { $concat: [{ $toString: { $trunc: { $divide: ["$$timeDifferenceMillis", 2592000000] } } }, "mo "] },
                                    else: { $concat: [{ $toString: { $trunc: { $divide: ["$$timeDifferenceMillis", 31536000000] } } }, "y "] }
                                  }
                                }
                              }
                            }
                          }
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        }
       
      ]);
      PostInfo.forEach((val: any) => {
        if (val.postLike.toString().includes(currentUser._id)) {
          val.isLikes = true;
        } else {
          val.isLikes = false;
        }
      });
      return PostInfo;
    }
    else{
      let PostInfo: any = await Post.aggregate([
        {
          $match: {
            userId: new mongoose.Types.ObjectId(userId),
          },
        },
        {
          $sort: {
            createdAt: -1
          }
        },
        { $skip:  50 * indexData },
        { $limit: 50},
        {
          $lookup: {
            localField: "city",
            from: "cities",
            foreignField: "_id",
            as: "city",
          },
        },
      
        { $unwind: { path: '$city', preserveNullAndEmptyArrays: true } },
        {
          $lookup: {
            localField: "state",
            from: "states",
            foreignField: "_id",
            as: "state",
          },
        },
        { $unwind: { path: '$state', preserveNullAndEmptyArrays: true } },
        {
          $lookup: {
            localField: "country",
            from: "countries",
            foreignField: "_id",
            as: "country",
          },

        },
        { $unwind: { path: '$country', preserveNullAndEmptyArrays: true } },
        {
          $lookup: {
            localField: "userId",
            from: "userdetails",
            foreignField: "_id",
            as: "user",
          },
        },
        { $unwind: { path: '$user', preserveNullAndEmptyArrays: true } },
        {
          $addFields: {
            isEditable: false
          }
        },

        {
          $addFields: {
            formattedCreatedAt: {
              $let: {
                vars: {
                  timeDifferenceMillis: {
                    $subtract: [new Date(), "$createdAt"]
                  }
                },
                in: {
                  $cond: {
                    if: {
                      $lt: ["$$timeDifferenceMillis", 60000] // Less than 1 minute
                    },
                    then: { $concat: [{ $toString: { $trunc: { $divide: ["$$timeDifferenceMillis", 1000] } } }, "s "] },
                    else: {
                      $cond: {
                        if: { $lt: ["$$timeDifferenceMillis", 3600000] }, // Less than 1 hour
                        then: { $concat: [{ $toString: { $trunc: { $divide: ["$$timeDifferenceMillis", 60000] } } }, "m "] },
                        else: {
                          $cond: {
                            if: { $lt: ["$$timeDifferenceMillis", 86400000] }, // Less than 1 day
                            then: { $concat: [{ $toString: { $trunc: { $divide: ["$$timeDifferenceMillis", 3600000] } } }, "h "] },
                            else: {
                              $cond: {
                                if: { $lt: ["$$timeDifferenceMillis", 2592000000] }, // Less than 30 days (approximating to 30 days as 1 month)
                                then: { $concat: [{ $toString: { $trunc: { $divide: ["$$timeDifferenceMillis", 86400000] } } }, "d "] },
                                else: {
                                  $cond: {
                                    if: { $lt: ["$$timeDifferenceMillis", 31536000000] }, // Less than 365 days (approximating to 365 days as 1 year)
                                    then: { $concat: [{ $toString: { $trunc: { $divide: ["$$timeDifferenceMillis", 2592000000] } } }, "mo "] },
                                    else: { $concat: [{ $toString: { $trunc: { $divide: ["$$timeDifferenceMillis", 31536000000] } } }, "y "] }
                                  }
                                }
                              }
                            }
                          }
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        }

      ]);
      PostInfo.forEach((val: any) => {
        if (val.postLike.toString().includes(currentUser._id)) {
          val.isLikes = true;
        } else {
          val.isLikes = false;
        }
      });
      return PostInfo;
    }
   
  }



  public async deletePost(postId: any) {


    const PostInfo: IPost = await Post.findOneAndUpdate(
      { _id: postId, isDeleted: false },
      { $set: { isDeleted: true } },
      { new: true }
    ).lean();
    return PostInfo;
  }



  public async PostActivity(
    userId: any,
    status: any,
    body: any
  ) {
    let userInfo: any;
    let data: any = [];
    const postId = body.postId;
    let PostInfo: any;
    if (status == "postLike") {

      PostInfo = await Post.updateOne(
        { _id: body.postId }, 
        { $push: { postLike: userId },
        $inc: { postLikeCount: 1 } }
     )


     PostInfo = await Post.findOne(
      {
        _id: body.postId,
      },
    
    );

    let userInfo = await userActivity.aggregate([
      {
        $match: {
          userId: new mongoose.Types.ObjectId(userId),
        
          isDeleted: false,
        },
      },
      {
        $lookup: {
          localField: "userId",
          from: "userdetails",
          foreignField: "_id",
          as: "userData",
        },
      },
      { $unwind: { path: "$userData", preserveNullAndEmptyArrays: true } },
    ]);


    let userName =  userInfo[0].userData.fullName;
    if(PostInfo.user_id) {
      const achivementUser= await  userDevice.findOne({ userId : PostInfo.user_id });

      
      const body =`${userName} like Your Post check and react `;
      sendNotification(achivementUser.fcmtoken,body,"abc","post_screen",PostInfo.user_id, postId,
      userInfo[0].userData._id);
    }
    userInfo = userInfo[0].userFollowers;

    if(userInfo.length>0){
      for (let i = 0; i < userInfo.length; i++) {

        let userFcmToken = await userDevice.findOne({ userId : userInfo[i] });
       
   if(userFcmToken){
   const body = `${userName} like Post check and react. `;
    sendNotification(userFcmToken.fcmtoken,body,"abc","user_achivement",userInfo[i], postId,userInfo[0].userData._id);
   }  
    }
 

 
    }
      return PostInfo;
    }
    if (status == "removePostLike") {
      
      PostInfo = await Post.updateOne(
        { _id: body.postId }, 
        { $pull: { postLike: userId },
        $inc: { postLikeCount: -1 } }
     )
      return PostInfo;
    }

    if (status == "postComment") {
     
      PostInfo = await Post.updateOne(
        { _id: body.postId }, 
        { $push: { postComment: { comment: body.comment,userId:userId,dateTime: currentTime } },
        $inc: { postCommentCount: 1 } }
     )

     PostInfo = await Post.findOne(
      { _id: body.postId }
   )

    let userInfo = await userActivity.aggregate([
      {
        $match: {
          userId: new mongoose.Types.ObjectId(userId),
        
          isDeleted: false,
        },
      },
      {
        $lookup: {
          localField: "userId",
          from: "userdetails",
          foreignField: "_id",
          as: "userData",
        },
      },
      { $unwind: { path: "$userData", preserveNullAndEmptyArrays: true } },
    ]);


    let userName =  userInfo[0].userData.fullName;
  
    if(PostInfo.userId) {
     
      const achivementUser= await  userDevice.findOne({ userId : PostInfo.userId });
      const body =`${userName} Comment Your Post check and react `;
      sendNotification(achivementUser.fcmtoken,body,"abc","post_screen",PostInfo.userId, postId,userInfo[0].userData._id);
    }
    userInfo = userInfo[0].userFollowers;

    if(userInfo.length>0){
      for (let i = 0; i < userInfo.length; i++) {

        let userFcmToken = await userDevice.findOne({ userId : userInfo[i] });
       
   if(userFcmToken){
   const body = `${userName} Comment Post check and react. `;
    sendNotification(userFcmToken.fcmtoken,body,"abc","user_achivement",userInfo[i], postId,userInfo[0].userData._id);
   }  
    } 
    return PostInfo
    }

    
    }
    if (status == "removePostComment") {

      PostInfo = await Post.updateOne(
        { _id: body.postId }, 
        { $pull: { postComment: { _id: body._id } },
        $inc: { postCommentCount: -1 } }
     ) 
return PostInfo;
    }
  
  }



  public async sharePost( body:any ) {
    const {userId,sharePostByOther} = body;
    let  PostInfo:any;
for (let i = 0; i < sharePostByOther.length; i++) {
    PostInfo = await userActivity.findOneAndUpdate(
    {
      userId:sharePostByOther[i].friendId,
      isDeleted:false
    },
    {
      $push: {
        sharePostByOther: {
          friendId: userId,
          post:sharePostByOther[i].postId,
          dateTime: currentTime,
        },
      },
    },{new:true}
  );
  

  let userData:any = await userDetails.findOne({_id:userId});
  let userToken:any = await userDevice.findOne({userId:sharePostByOther[i].friendId});
  const body =`${userData.fullName} share  post to  you please check and react`;
  sendNotification(userToken.fcmtoken,body,"abc","sponsorship_home",userToken.userId,sharePostByOther[i].postId,userData._id);

 
  return PostInfo;


}


  }
   

  

  public async readPostActivity(PostId: any, status: any, userId: any) {
    console.log(PostId, status);
    let isDeleteable: any;
    let PostInfo: any;
    if (status == "readPostLike") {
      PostInfo = await Post.find({ _id: PostId }).populate("postLike");
      PostInfo = PostInfo.postLike;
      return PostInfo;
    }
    if (status == "readPostComment") {
      let a = [];
      PostInfo = await Post.findOne({ _id: PostId }).lean();
      PostInfo = PostInfo.postComment;

      for (let i = 0; i < PostInfo.length; i++) {
        let userInfo: any = await userDetails.findOne(
          { _id: PostInfo[i].userId },
          { fullName: true, profile_picture: true }
        );
        let commentId = PostInfo[i]._id;
        let comment = PostInfo[i].comment;
        let DateTime: any = PostInfo[i].dateTime;

        if (userId == PostInfo[i].userId) {
          isDeleteable = true;
        } else {
          isDeleteable = false;
        }
        a.push({ userInfo, comment, DateTime,isDeleteable,commentId });
      }
      var y = [...a].reverse();
      return y;
    }
    if (status == "readPostFavourite") {
      PostInfo = await Post.findOne({ _id: PostId }).populate("PostFavourite");
      PostInfo = PostInfo.PostFavourite;
      return PostInfo;
    }
  }

  public async searchPost(search: any) {
    let PostInfo: any = await userActivity.aggregate([
      { $match: { isDeleted: false } },
      {
        $lookup: {
          localField: "userId",
          from: "userdetails",
          foreignField: "_id",
          as: "user",
        },
      },
    ]);

    PostInfo = new FuzzySearch(PostInfo, ["name"], {
      caseSensitive: false,
    });
    PostInfo = PostInfo.search(search);
    return PostInfo;
  }




}

import { Document, model, ObjectId, Schema } from "mongoose";

const schema = new Schema({
    userId: { type: Schema.Types.ObjectId, ref: "userDetails" },
    sponsorPartnerId: { type: Schema.Types.ObjectId, ref: "sponsorPartner" },
    name:{type:String,index:true},
    postCommentCount:{type:Number},
    postLikeCount:{type:Number},
    sharePost: [{
        post: { type: Schema.Types.ObjectId, ref: "posts" },
       
         friendId: { type: Schema.Types.ObjectId, ref: "userdetails" },
         dateTime: { type: Date },
     }],
    sponsorshipShare: [{
        sponsorshipId: { type: Schema.Types.ObjectId, ref: "sponsorships" },
        friendId: { type: Schema.Types.ObjectId, ref: "userDetails" },
        dateTime: { type: Date },
    }],
    sponsorshipSharedByOther: [{
        sponsorshipId: { type: Schema.Types.ObjectId, ref: "sponsorships" },
        friendId: { type: Schema.Types.ObjectId, ref: "userDetails" },
    }],
    userFollowers: [
        { type: Schema.Types.ObjectId, ref: "userDetails" },
    ],
    userFollowing: [{ type: Schema.Types.ObjectId, ref: "userdetails" }],
    brandFollowers: [
        { type: Schema.Types.ObjectId, ref: "sponsorshipdetail" },
    ],
    brandFollowing: [{ type: Schema.Types.ObjectId, ref: "sponsorshipdetail" }],
    schoolFollowers: [
        { type: Schema.Types.ObjectId, ref: "school" },
    ],
    schoolFollowing: [{ type: Schema.Types.ObjectId, ref: "school" }],
    academyFollowers: [
        { type: Schema.Types.ObjectId, ref: "academies" },
    ],
    academyFollowing: [{ type: Schema.Types.ObjectId, ref: "academies" }],
    retailerFollowers: [
        { type: Schema.Types.ObjectId, ref: "retailer" },
    ],
    retailerFollowing: [{ type: Schema.Types.ObjectId, ref: "retailer" }],
   instituteFollowers: [
        { type: Schema.Types.ObjectId, ref: "InstituteModel" },
    ],
    instituteFollowing: [{ type: Schema.Types.ObjectId, ref: "InstituteModel" }],
    

    sendFollowingRequest: [{ type: Schema.Types.ObjectId, ref: "userDetails" }],
    sendFollowingRequestBYOther: [{ type: Schema.Types.ObjectId, ref: "userDetails" }],
    cancelSendFollowerRequest: [{ type: Schema.Types.ObjectId, ref: "userDetails" }],
    rejectFollowerRequest: [{ type: Schema.Types.ObjectId, ref: "userDetails" }],
    followerRequestRejectbyOther: [{ type: Schema.Types.ObjectId, ref: "userDetails" }],
    blockList: [{ type: Schema.Types.ObjectId, ref: "userDetails" }],
    blockbyOther: [{ type: Schema.Types.ObjectId, ref: "userDetails" }],
    followersCount: { type: Number, default: 0 },
    followingCount: { type: Number, default: 0 },
    isActive: { type: Boolean, default: true },
    isDeleted: { type: Boolean, default: false }
}, {
    timestamps: true
});

export interface IUserActivity extends Document {
    userId: ObjectId,
    postCommentCount:Number,
    postLikeCount:Number,
    sharePost: [{
        post: ObjectId,
       
         friendId: ObjectId,
         dateTime: { type: Date },
     }],
    sponsorshipShare: [{
        sponsorshipId: ObjectId,
        friendId: ObjectId,
        dateTime: { type: Date },
    }],
    sponsorshipSharedByOther: [{
        sponsorshipId: ObjectId,
        friendId: ObjectId,
    }],
    userFollowers: [
        ObjectId,
    ],
    userFollowing: [ObjectId],
    brandFollowers: [
        ObjectId,
    ],
    brandFollowing: [ObjectId],
    schoolFollowers: [
        ObjectId,
    ],
    schoolFollowing: [ObjectId],
    academyFollowers: [
        ObjectId,
    ],
    academyFollowing: [ObjectId],
    retailerFollowers: [
        ObjectId,
    ],
    retailerFollowing: [ObjectId],
   instituteFollowers: [
    ObjectId,
    ],
    instituteFollowing: [ObjectId],
    sendFollowingRequest: [ObjectId],
    sendFollowingRequestBYOther: [ObjectId],
    cancelSendFollowerRequest: [ObjectId],
    rejectFollowerRequest: [ObjectId],
    followerRequestRejectbyOther: [ObjectId],
    blockList: [ObjectId],
    blockbyOther: [ObjectId],
    followersCount: Number,
    followingCount: Number,
    isActive: Boolean,
    isDeleted: Boolean
}
export default model<IUserActivity>("useractivity", schema);
import { Document, model, ObjectId, Schema } from "mongoose";

const schema = new Schema({
    userId: { type: Schema.Types.ObjectId, ref: "userDetails" },
    PostLike: [{
        type: Schema.Types.ObjectId, ref: "post"
    }],
    PostFavourite: [{
        type: Schema.Types.ObjectId, ref: "post"
    }],
    PostComment: [{
        PostId: { type: Schema.Types.ObjectId, ref: "post" },
        comment: { type: String },
        dateTime: { type: Date },
    }],

    HashtagLike: [
        { type: Schema.Types.ObjectId, ref: "hashtag" },
    ],
    Hashtagcomment: [{
        HashtagId: { type: Schema.Types.ObjectId, ref: "hashtag" },
        comment: { type: String },
        dateTime: { type: Date }
    }],
    HashtagFavourite: [
        { type: Schema.Types.ObjectId, ref: "hashtag" },
    ],
    shareHashtag: [{
        hashtagId: { type: Schema.Types.ObjectId, ref: "hashtag" },
        friendId: { type: Schema.Types.ObjectId, ref: "userDetails" },
    }],
    hashtagSharedByOther: [{
        hashtagId: { type: Schema.Types.ObjectId, ref: "hashtag" },
        friendId: { type: Schema.Types.ObjectId, ref: "userDetails" },
    }],
    sponsershipLike: [
        { type: Schema.Types.ObjectId, ref: "sponsership" },
    ],
    priceDownsponsership: [{
        sponsershipId: { type: Schema.Types.ObjectId, ref: "sponsership" },
        message: { type: String }
    }],
    SponsorshipComment: [{
        sponsershipId: { type: Schema.Types.ObjectId, ref: "sponsership" },
        comment: { type: String },
        dateTime: { type: Date }
    }], 
    sponsershipFavorite: [
        { type: Schema.Types.ObjectId, ref: "sponsership" },
    ],
    sponsershipShare: [{
        sponsershipId: { type: Schema.Types.ObjectId, ref: "sponsership" },
        friendId: { type: Schema.Types.ObjectId, ref: "userDetails" },
    }],
    sponsershipSharedByOther: [{
        sponsershipId: { type: Schema.Types.ObjectId, ref: "sponsership" },
        friendId: { type: Schema.Types.ObjectId, ref: "userDetails" },
    }],
    userFollowers: [
        { type: Schema.Types.ObjectId, ref: "userDetails" },
    ],
    userFollowing: [{ type: Schema.Types.ObjectId, ref: "userdetail" }],
    brandFollowers: [
        { type: Schema.Types.ObjectId, ref: "sponser" },
    ],
    brandFollowing: [{ type: Schema.Types.ObjectId, ref: "sponser" }],
    schoolFollowers: [
        { type: Schema.Types.ObjectId, ref: "school" },
    ],
    schoolFollowing: [{ type: Schema.Types.ObjectId, ref: "school" }],
    academyFollowers: [
        { type: Schema.Types.ObjectId, ref: "academy" },
    ],
    academyFollowing: [{ type: Schema.Types.ObjectId, ref: "academy" }],
    retailerFollowers: [
        { type: Schema.Types.ObjectId, ref: "retailer" },
    ],
    retailerFollowing: [{ type: Schema.Types.ObjectId, ref: "retailer" }],
   instituteFollowers: [
        { type: Schema.Types.ObjectId, ref: "InstituteModel" },
    ],
    instituteFollowing: [{ type: Schema.Types.ObjectId, ref: "InstituteModel" }],
    friendList: [{ type: Schema.Types.ObjectId, ref: "userDetails" }],
    sendFriendRequest: [{ type: Schema.Types.ObjectId, ref: "userDetails" }],
    sendFriendRequestBYOther: [{ type: Schema.Types.ObjectId, ref: "userDetails" }],
    cancelSendFriendRequest: [{ type: Schema.Types.ObjectId, ref: "userDetails" }],
    rejectFriendRequest: [{ type: Schema.Types.ObjectId, ref: "userDetails" }],
    friendRequestRejectbyOther: [{ type: Schema.Types.ObjectId, ref: "userDetails" }],
    blockList: [{ type: Schema.Types.ObjectId, ref: "userDetails" }],
    blockbyOther: [{ type: Schema.Types.ObjectId, ref: "userDetails" }],
    followersCount: { type: Number, default: 0 },
    followingCount: { type: Number, default: 0 },
    isActive: { type: Boolean, default: true },
    isDeleted: { type: Boolean, default: false }
}, {
    timestamps: true
});

export interface IuserDetailsActivity extends Document {
    userId: ObjectId,
    PostLike: [ObjectId],
    PostFavourite: [ObjectId],
    PostComment: [{
        PostId: ObjectId,
        comment: String,
        dateTime: Date,
    }],
    HashtagLike: [
        ObjectId,
    ],
    Hashtagcomment: [{
        HashtagId: ObjectId,
        comment: String,
        dateTime: Date
    }],
    HashtagFavourite: [
        ObjectId,
    ],
    shareHashtag: [{
        hashtagId: ObjectId,
        friendId: ObjectId,
    }],
    hashtagSharedByOther: [{
        hashtagId: ObjectId,
        friendId: ObjectId,
    }],
    sponsershipLike: [{
        sponsershipId: ObjectId,
    }],
    priceDownsponsership: [{
        sponsershipId: ObjectId,
        message: String
    }],
    SponsorshipComment: [{
        sponsershipId: ObjectId,
        comment: String,
        dateTime: Date
    }],
    sponsershipFavorite: [{
        sponsershipId: ObjectId,
    }],
    sponsershipShare: [{
        sponsershipId: ObjectId,
        friendId: ObjectId,
    }],
    sponsershipSharedByOther: [{
        sponsershipId: ObjectId,
        friendId: ObjectId,
    }],
    userFollowers: [
        ObjectId

    ],
    userFollowing: [
        ObjectId
    ],
 
    brandFollowers: [
       ObjectId
    ],
    brandFollowing: [ObjectId],
    schoolFollowers: [
       ObjectId
    ],
    schoolFollowing: [ObjectId],
    academyFollowers: [
       ObjectId
    ],
    academyFollowing: [ObjectId],
    retailerFollowers: [
       ObjectId
    ],
    retailerFollowing: [ObjectId],
   instituteFollowers: [
       ObjectId
    ],
    instituteFollowing: [ObjectId],


    sendFriendRequestBYOther:  [ObjectId],
    cancelSendFriendRequest:  [ObjectId],
    friendList: [ObjectId],
    friendRequestRejectbyOther: [ObjectId],
    sendFriendRequest: [ObjectId],
    rejectFriendRequest: [ObjectId],
    blockList: [ObjectId
    ],
    blockbyOther: [ObjectId
    ],
    followersCount: Number,
    followingCount: Number,
    isActive: Boolean,
    isDeleted: Boolean
}
export default model<IuserDetailsActivity>("useractivity", schema);
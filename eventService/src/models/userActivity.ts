import { Document, model, ObjectId, Schema } from "mongoose";

const schema = new Schema({
    userId: { type: Schema.Types.ObjectId, ref: "userdetail" },
    likePost: [{
        type: Schema.Types.ObjectId, ref: "post"
    }],
    favouritePost: [{
        type: Schema.Types.ObjectId, ref: "post"
    }],
    commentPost: [{
        postId: { type: Schema.Types.ObjectId, ref: "post" },
        postMessage: { type: String },
        dateTime: { type: Date },
    }],

    likeHashtag: [
        { type: Schema.Types.ObjectId  , ref:"hashtag"},
    ],
    commentHashtag: [{
        hashtagId: { type: Schema.Types.ObjectId , ref:"hashtag"},
        comment: { type: String },
        time: { type: Date }
    }],
    favouriteHashtag: [
        { type: Schema.Types.ObjectId  , ref:"hashtag"},
    ],
    shareHashtag: [{
        hashtagId: { type: Schema.Types.ObjectId , ref:"hashtag" },
        friendId: { type: Schema.Types.ObjectId, ref: "userdetail" },
    }],
    hashtagSharedByOther: [{
        hashtagId: { type: Schema.Types.ObjectId , ref:"hashtag" },
        friendId: { type: Schema.Types.ObjectId, ref: "userdetail" },
    }],
    eventLike: [
        { type: Schema.Types.ObjectId, ref: "event" },
    ],
    priceDownEvent: [{
        eventId: { type: Schema.Types.ObjectId, ref: "event" },
        message: { type: String }
    }],
    eventcomment: [{
        eventId: { type: Schema.Types.ObjectId, ref: "event" },
        comment: { type: String },
        time: { type: Date }
    }],
    eventFavorite: [
        { type: Schema.Types.ObjectId, ref: "event" },
    ],
    eventShare: [{
        eventId: { type: Schema.Types.ObjectId, ref: "event" },
        friendId: { type: Schema.Types.ObjectId, ref: "userdetail" },
    }],
    eventSharedByOther: [{
        eventId: { type: Schema.Types.ObjectId, ref: "event" },
        friendId: { type: Schema.Types.ObjectId, ref: "userdetail" },
    }],
    followers: [
        { type: Schema.Types.ObjectId, ref: "userdetail" },
    ],
    following: [{ type: Schema.Types.ObjectId, ref: "userdetail" },],



    friendList: [{ type: Schema.Types.ObjectId, ref: "userdetail" }],
    sendFriendRequest: [{ type: Schema.Types.ObjectId, ref: "userdetail" }],
    rejectFriendRequest: [{ type: Schema.Types.ObjectId, ref: "userdetail" }],
    friendRequestRejectbyOther: [{ type: Schema.Types.ObjectId, ref: "userdetail" }],
    blockList: [{ type: Schema.Types.ObjectId, ref: "userdetail" }],

    blockbyOther: [{ type: Schema.Types.ObjectId, ref: "userdetail" }],
    followersCount: { type: Number, default: 0 },
    followingCount: { type: Number, default: 0 },
    isActive: { type: Boolean, default: true },
    isDeleted: { type: Boolean, default: false }
}, {
    timestamps: true
});

export interface IuserdetailActivity extends Document {
    userId: ObjectId,
    likePost: [ObjectId],
    favouritePost: [ObjectId],
    commentPost: [{
        postId: ObjectId,
        postMessage: String,
        dateTime: Date,
    }],


    likeHashtag: [
        ObjectId,
    ],
    commentHashtag: [{
        hashtagId: ObjectId,
        comment: String,
        time: Date
    }],
    favouriteHashtag: [
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
    eventLike: [{
        eventId: ObjectId,
    }],
    priceDownEvent: [{
        eventId: ObjectId,
        message: String
    }],
    eventcomment: [{
        eventId: ObjectId,
        comment: String
    }],
    eventFavorite: [{
        eventId: ObjectId,
    }],
    eventShare: [{
        eventId: ObjectId,
        friendId: ObjectId,
    }],
    eventSharedByOther: [{
        eventId: ObjectId,
        friendId: ObjectId,
    }],
    followers: [
        ObjectId

    ],
    following: [
        ObjectId
    ],
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

export default model<IuserdetailActivity>("useractivity", schema);
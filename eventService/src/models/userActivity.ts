import { Document, model, ObjectId, Schema } from "mongoose";

const schema = new Schema({
    userId: { type: Schema.Types.ObjectId, ref: "userdetail" },
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
        friendId: { type: Schema.Types.ObjectId, ref: "userdetail" },
    }],
    hashtagSharedByOther: [{
        hashtagId: { type: Schema.Types.ObjectId, ref: "hashtag" },
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
        dateTime: { type: Date }
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
    eventLike: [{
        eventId: ObjectId,
    }],
    priceDownEvent: [{
        eventId: ObjectId,
        message: String
    }],
    eventcomment: [{
        eventId: ObjectId,
        comment: String,
        dateTime: Date
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
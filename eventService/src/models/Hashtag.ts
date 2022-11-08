import { Document, model, ObjectId, Schema } from "mongoose";

const schema = new Schema({
    Hashtag: { type: String, required: true },
    eventId: { type: Schema.Types.ObjectId, ref: "event" },
    description:{type: String},
    HashtagLikeCount: { type: Number,default:0 },
    HashtagFavouriteCount: { type: Number,default:0  },
    hashtagcommentCount:  { type: Number,default:0},
    shareCount: { type: Number,default:0  },
    totalClick: { type: Number,default:0  },
    bannerImage: [{ type: String }],

  

    HashtagLike: [
        { type: Schema.Types.ObjectId  , ref:"userdetail"},
    ],
    Hashtagcomment: [{
        userId: { type: Schema.Types.ObjectId , ref:"userdetail"},
        comment: { type: String },
        dateTime: { type: Date }
    }],
    HashtagFavourite: [
        { type: Schema.Types.ObjectId  , ref:"userdetail"},
    ],
    shareHashtag: [{
       Hashtag: { type: Schema.Types.ObjectId, ref: "event" },
       userId: { type: Schema.Types.ObjectId, ref: "userDetails" },
        friendId: { type: Schema.Types.ObjectId, ref: "userDetails" },
    }],
    deletedPersonId:{ type: Schema.Types.ObjectId, ref: "userDetails" },
    userId:{ type: Schema.Types.ObjectId, ref: "userDetails" },
    isEventHashtag:{type: Boolean, default: false},
    isActive: { type: Boolean, default: false },
    isDeleted: { type: Boolean, default: false }
}, {
    timestamps: true
});

export interface IHashtag extends Document {
    Hashtag: String,
    eventId: ObjectId,
    deletedPersonId: ObjectId,
    userId: ObjectId,
    HashtagLikeCount: Number,
    HashtagFavouriteCount: Number,
    hashtagcommentCount:  Number,
    totalClick: Number,
    shareCount: String,
    bannerImage: [String],
    HashtagLike: [
        ObjectId,
    ],
    Hashtagcomment: [{
        userId: ObjectId,
        comment: String,
        dateTime: Date
    }],
    HashtagFavourite: [
        ObjectId,
    ],
    shareHashtag: [{
       Hashtag: ObjectId,
       userId: ObjectId,
        friendId: ObjectId,
    }],
    isEventHashtag: Boolean,
    isActive: Boolean,
    isDeleted: Boolean
}

export default model<IHashtag>("hashtag", schema);
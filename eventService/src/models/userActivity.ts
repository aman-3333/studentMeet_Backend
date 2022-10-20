import { Document, model, ObjectId, Schema } from "mongoose";

const schema = new Schema({
    userDetailsId: { type: Schema.Types.ObjectId },
    hashtagLike: [
        { type: Schema.Types.ObjectId },
    ],
    hashtagcomment: [{
        hashtagId: { type: Schema.Types.ObjectId },
        comment: { type: String },
        time: { type: Date }
    }],
    hashtagFavorite: [
         { type: Schema.Types.ObjectId },
    ],
    hashtagShare: [{
        hashtagId: { type: Schema.Types.ObjectId },
        friendId: { type: Schema.Types.ObjectId },
    }],
    hashtagSharedByOther: [{
        hashtagId: { type: Schema.Types.ObjectId },
        friendId: { type: Schema.Types.ObjectId },
    }],
    eventLike: [
        { type: Schema.Types.ObjectId },
    ],
    priceDownEvent: [{
        eventId: { type: Schema.Types.ObjectId },
        message: { type: String }
    }],
    eventcomment: [{
        eventId: { type: Schema.Types.ObjectId },
        comment: { type: String },
        time: { type: Date }
    }],
    eventFavorite: [
       { type: Schema.Types.ObjectId },
    ],
    eventShare: [{
        eventId: { type: Schema.Types.ObjectId },
        friendId: { type: Schema.Types.ObjectId },
    }],
    eventSharedByOther: [{
        eventId: { type: Schema.Types.ObjectId },
        friendId: { type: Schema.Types.ObjectId },
    }],
    followers: [
        { type: Schema.Types.ObjectId },
    ],
    following: [
         {type: Schema.Types.ObjectId },
    ],
    friend:[
       { type: Schema.Types.ObjectId }
    
    ],
    blocked:[ { type: Schema.Types.ObjectId }
    ],
    followersCount: { type: Number, default: 0 },
    followingCount: { type: Number, default: 0 },
    isActive: { type: Boolean, default: true },
    isDeleted: { type: Boolean, default: false }
}, {
    timestamps: true
});

export interface IuserDetailsActivity extends Document {
    userDetailsId: ObjectId,
    hashtagLike: [{
        hashtagId: ObjectId,
    }],
    hashtagcomment: [{
        hashtagId: ObjectId,
        comment: String,
        time: Date
    }],
    hashtagFavorite: [{
        hashtagId: ObjectId,
    }],
    hashtagShare: [{
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
    followersCount: Number,
    followingCount: Number,
    isActive: Boolean,
    isDeleted: Boolean
}

export default model<IuserDetailsActivity>("userDetailsactivity", schema);
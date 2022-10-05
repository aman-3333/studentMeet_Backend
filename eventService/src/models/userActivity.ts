import { Document, model, ObjectId, Schema } from "mongoose";

const schema = new Schema({
    userId: { type: Schema.Types.ObjectId, ref: "Users" },
    hashtagLike: [{
        hashtagId: { type: Schema.Types.ObjectId, ref: "event" },
    }],
    hashtagcomment: [{
        hashtagId: { type: Schema.Types.ObjectId, ref: "event" },
        comment: { type: String },
        time:{type:Date}
    }],
    hashtagFavorite: [{
        hashtagId: { type: Schema.Types.ObjectId, ref: "event" },
    }],
    hashtagShare: [{
        hashtagId: { type: Schema.Types.ObjectId, ref: "event" },
        friendId: { type: Schema.Types.ObjectId, ref: "User" },
    }],
    hashtagSharedByOther: [{
        hashtagId: { type: Schema.Types.ObjectId, ref: "event" },
        friendId: { type: Schema.Types.ObjectId, ref: "Users" },
    }],
    eventLike: [{
        hashtagId: { type: Schema.Types.ObjectId, ref: "event" },
    }],
    priceDownEvent: [{
        hashtagId: { type: Schema.Types.ObjectId, ref: "event" },
        message: { type: String }
    }],
    eventcomment: [{
        hashtagId: { type: Schema.Types.ObjectId, ref: "event" },
        comment: { type: String }
    }],
    eventFavorite: [{
        hashtagId: { type: Schema.Types.ObjectId, ref: "event" },
    }],
    eventShare: [{
        hashtagId: { type: Schema.Types.ObjectId, ref: "event" },
        friendId: { type: Schema.Types.ObjectId, ref: "Users" },
    }],
    eventSharedByOther: [{
        hashtagId: { type: Schema.Types.ObjectId, ref: "event" },
        friendId: { type: Schema.Types.ObjectId, ref: "Users" },
    }],
    isActive: { type: Boolean, default: true },
    isDeleted: { type: Boolean, default: false }
}, {
    timestamps: true
});

export interface IUserActivity extends Document {
    userId: ObjectId,
    hashtagLike: [{
        hashtagId: ObjectId,
    }],
    hashtagcomment: [{
        hashtagId: ObjectId,
        comment: String,
        time:Date
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
        hashtagId: ObjectId,
    }],
    priceDownEvent: [{
        hashtagId: ObjectId,
        message: String
    }],
    eventcomment: [{
        hashtagId: ObjectId,
        comment: String
    }],
    eventFavorite: [{
        hashtagId: ObjectId,
    }],
    eventShare: [{
        hashtagId: ObjectId,
        friendId: ObjectId,
    }],
    eventSharedByOther: [{
        hashtagId: ObjectId,
        friendId: ObjectId,
    }],
    isActive: Boolean,
    isDeleted: Boolean
}

export default model<IUserActivity>("useractivity", schema);
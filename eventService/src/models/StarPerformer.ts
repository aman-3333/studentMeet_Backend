import { Document, model, ObjectId, Schema } from "mongoose";

const schema = new Schema({
    starPerformerId:  { type: Schema.Types.ObjectId, ref: "User" },
    ownerId: { type: Schema.Types.ObjectId, ref: "User" },
    like: { type: Number },
    eventCategory: [{ type: String }],
    totalEarning: { type: Number },
    noOfEventOriginze: { type: Number },
    picture: [{ type: String }],
    starPerformerThought: { type: String },
    isActive: { type: Boolean, default: true },
    isDeleted: { type: Boolean, default: false },
    isblueTick: { type: Boolean, default: false },
}, {
    timestamps: true
});

export interface IPerformer extends Document {
    starPerformerId: ObjectId,
    ownerId:ObjectId,
    like:Number,
    totalEarning: Number,
    noOfEventOriginze: Number,
    eventCategory: [String],
    picture: [String],
    starPerformerThought:String,
    isActive: Boolean,
    isblueTick: Boolean,
    isDeleted: Boolean
}

export default model<IPerformer>("starperformer", schema);
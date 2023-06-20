import { Document, model, ObjectId, Schema } from "mongoose";

const schema = new Schema({
    postType: { type: String, required: true },
    Description: { type: String },
    picture: { type: String },
    active: { type: Boolean, default: true },
    ownerId: { type: Schema.Types.ObjectId },
    isDeleted: { type: Boolean, default: false }
}, {
    timestamps: true
});

export interface IPostType extends Document {
    postType: String,
    Description: String,
    ownerId: ObjectId,
    picture: String,
    active: Boolean,
    isDeleted: Boolean
}

export default model<IPostType>("post", schema);
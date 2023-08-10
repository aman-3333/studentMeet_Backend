import { Document, model, ObjectId, Schema } from "mongoose";

const schema = new Schema({
    city: { type: String, required: true },
    userId: { type: Schema.Types.ObjectId,ref:"userDetails" },
    stateId: { type: Schema.Types.ObjectId,ref:"state" },

    Description: { type: String },
    picture: { type: String },
    isActive: { type: Boolean, default: false },
    isDeleted: { type: Boolean, default: false }
}, {
    timestamps: true
});

export interface ICity extends Document {
    city: String,
    stateId: ObjectId,
    zipcode: Number,
    userId: ObjectId,
    Description: String,
    picture: String,
    active: Boolean,
    isDeleted: Boolean
}

export default model<ICity>("city", schema);
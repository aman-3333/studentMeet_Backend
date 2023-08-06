import { Document, model, ObjectId, Schema } from "mongoose";

const schema = new Schema({
    city: { type: String, required: true },
    stateId: { type: Schema.Types.ObjectId, ref: "state" },
    userId: { type: Schema.Types.ObjectId },
    zipcode: { type: Number },
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

export default model<ICity>("City", schema);
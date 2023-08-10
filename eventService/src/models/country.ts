import { Document, model, ObjectId, Schema } from "mongoose";

const schema = new Schema({
    country: { type: String, required: true },
    userId: { type: Schema.Types.ObjectId },
    Description: { type: String },
    picture: { type: String },
    isActive: { type: Boolean, default: false },
    isDeleted: { type: Boolean, default: false }
}, {
    timestamps: true
});

export interface ICountry extends Document {
    country: String,
    stateId: ObjectId,
    zipcode: Number,
    userId: ObjectId,
    Description: String,
    picture: String,
    active: Boolean,
    isDeleted: Boolean
}

export default model<ICountry>("country", schema);
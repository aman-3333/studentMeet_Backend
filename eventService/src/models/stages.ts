import { Document, model, ObjectId, Schema } from "mongoose";

const schema = new Schema({
  
    academySUbTypeId: { type:Schema.Types.ObjectId, ref: "academySubType" },
    name: { type: String },
    Description: { type: String },
    isActive: { type: Boolean, default: false },
    isDeleted: { type: Boolean, default: false }
}, {
    timestamps: true
});

export interface IStage extends Document {
    academySUbTypeId: ObjectId,
    name: String,
    Description: String,
    picture: String,
    active: Boolean,
    isDeleted: Boolean
}

export default model<IStage>("stage", schema);
import { Document, model, ObjectId, Schema } from "mongoose";

const schema = new Schema({
  
    schoolId: { type:Schema.Types.ObjectId, ref: "school" },
    type: { type: String },
    description: { type: String },
    picture: [{ type: String }],
    facility:{ type: String },
    isDeleted: { type: Boolean, default: false }
}, {
    timestamps: true
});

export interface ISchoolInfrastructure extends Document {
    schoolId: ObjectId,
    type: String,
    description: String,
    picture: [String],
    facility:String,
    isDeleted: Boolean
}

export default model<ISchoolInfrastructure>("school_infrasturcture", schema);
import { Document, model, ObjectId, Schema } from "mongoose";

const schema = new Schema({
    name: { type: String, required: true },
    Description: { type: String },
    location: { type: String },
    picture: [{ type: String }],
    participantsId:[{ type:Schema.Types.ObjectId, ref: "userdetails" }],
    date:{type: Date},
    academyId:{ type:Schema.Types.ObjectId, ref: "academies" },
    academyTypeId:{ type:Schema.Types.ObjectId, ref: "academytypes" },
    academySubTypeId:{ type:Schema.Types.ObjectId, ref: "academytypes" },
    schoolId:{ type:Schema.Types.ObjectId, ref: "schools" },
    active: { type: Boolean, default: true },
    isDeleted: { type: Boolean, default: false },
}, {
    timestamps: true
});






export interface ITournament extends Document {
    name: String,
    Description: String,
    location: String,
    picture: [String],
    participantsId:[ObjectId],
    matchesId:[ObjectId],
    date:{type: Date},
    academyId:ObjectId,
    schoolId:ObjectId,
    active:Boolean,
    isDeleted: Boolean,
}

export default model<ITournament>("tournament", schema);
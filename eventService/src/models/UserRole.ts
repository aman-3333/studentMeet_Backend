import { Document, model, ObjectId, Schema } from "mongoose";

const schema = new Schema({
    userRole: { type: String, required: true },
    Description: { type: String },
    roleId:{ type: Number },
    picture: { type: String },
    active: { type: Boolean, default: true },
    ownerId: { type: Schema.Types.ObjectId },
    isDeleted: { type: Boolean, default: false }
}, {
    timestamps: true
});

export interface IUserrole extends Document {
    userRole: String,
    roleId:Number,
    Description: String,
    ownerId: ObjectId,
    picture: String,
    active: Boolean,
    isDeleted: Boolean
}

export default model<IUserrole>("userrole", schema);
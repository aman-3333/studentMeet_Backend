import { Document, model, ObjectId, Schema } from "mongoose";

const schema = new Schema({
    role: { type: String, required: true },
    Description: { type: String },
    roleId:{ type: Number,unique:true },
    picture: { type: String },
    active: { type: Boolean, default: true },
    ownerId: { type: Schema.Types.ObjectId },
    isDeleted: { type: Boolean, default: false }
}, {
    timestamps: true
});

export interface IRole extends Document {
    role: String,
    roleId:Number,
    Description: String,
    ownerId: ObjectId,
    picture: String,
    active: Boolean,
    isDeleted: Boolean
}

export default model<IRole>("role", schema);